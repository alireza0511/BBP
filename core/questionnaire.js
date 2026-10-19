/* ==========================================================================
   Becoming Better: questionnaire widget.
   The whole self-assessment (intro, questions, scoring, results, text for an
   AI coach) as one widget that each quality page calls with its own content.

   Load after the core widgets, then call it:
     <script src="../core/widgets.js"></script>
     <script src="../core/defaults.js"></script>
     <script src="../core/questionnaire.js"></script>
     <script>
       Questionnaire.mount({
         id: "trust",             // folder name; keys saved progress and history
         content: CONTENT,        // this page's words and questions (below)
         el: "#app",              // where the screens go       (default "#app")
         header: "#top",          // where the top bar goes     (default "#top")
         otherPage: "fa.html",    // same page, other language  (optional)
         home: "../index.html"    // home link                  (default "../index.html")
       });
     </script>

   CONTENT = {
     text: { brand, title, sub?, purpose, limT?, lim? },   // plus any key from
                                            // core/defaults.js to override it

     areas: ["Area name", ...],
     stages: [{ name, desc }, ...],         // 10 stages, lowest first
     questions: [{ area, text, options: [[stage, "answer"], ...] }, ...],
     coach: { header, rules: [...], request?: [...] }
       // text for an AI coach: header line, this quality's own rules (added
       // after the shared standing rules), optional custom request lines
   }
   Saved on this device only (localStorage):
     bbp-progress-<id>  unfinished answers, so the viewer can continue later
     bbp-history-<id>   date and scores of each finished assessment
   Scoring: each area = average stage of its answers x 10 + 5 (0-100);
   overall = average of the scored areas.
   ========================================================================== */
(function (global) {
  "use strict";

  function find(x) { return typeof x === "string" ? document.querySelector(x) : x; }
  function merge(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }
  function folderId() { var p = location.pathname.split("/").filter(Boolean); return p.length > 1 ? p[p.length - 2] : "item"; }

  /** Start the questionnaire. See the header comment for the options. */
  function mount(opts) {
    var C = opts.content, lang = UI.lang();
    var D = (global.BBP_DEFAULTS || {})[lang] || { text: {}, coach: { rules: [] } };
    var T = merge(D.text, C.text);
    var COACH = merge(D.coach, C.coach || {});
    COACH.rules = (D.coach.rules || []).concat((C.coach && C.coach.rules) || []);
    var AREAS = C.areas, STAGES = C.stages, QUESTIONS = C.questions;
    var app = find(opts.el || "#app"), top = find(opts.header || "#top");
    var otherPage = opts.otherPage || C.otherPage, home = opts.home || "../index.html";
    var id = opts.id || folderId();
    var KEY_PROGRESS = "bbp-progress-" + id, KEY_HISTORY = "bbp-history-" + id;
    var idx = -1, answers = [], orders = [], historyEntry = -1;

    function t(k, vars) { return UI.fill(T[k] == null ? k : T[k], vars); }
    function band(i) { return i === 9 ? UI.num("90–100") : UI.num(i * 10 + "–" + (i * 10 + 9)); }
    function goTo(i) { idx = i; save(); render(); window.scrollTo(0, 0); }
    function shortDate(iso) {
      try { return new Date(iso).toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US", { year: "numeric", month: "short", day: "numeric" }); }
      catch (e) { return UI.num(String(iso).slice(0, 10)); }
    }

    /* ---------- Saved progress ---------- */
    function reset() {
      answers = QUESTIONS.map(function () { return null; });
      orders = QUESTIONS.map(function (q) { return UI.shuffle(q.options.length); });
      idx = -1; historyEntry = -1;
      UI.store.remove(KEY_PROGRESS);
    }
    function save() {
      if (idx >= 0 && idx < QUESTIONS.length) UI.store.set(KEY_PROGRESS, { n: QUESTIONS.length, idx: idx, answers: answers, orders: orders });
    }
    function loadSaved() {
      var p = UI.store.get(KEY_PROGRESS, null);
      if (!p || p.n !== QUESTIONS.length || !p.answers || !p.orders) return null;
      var ok = p.orders.every(function (o, i) { return o && o.length === QUESTIONS[i].options.length; });
      return ok && p.answers.some(function (a) { return a !== null; }) ? p : null;
    }

    /* ---------- Results history ---------- */
    function history() { return UI.store.get(KEY_HISTORY, []) || []; }
    function record(r) {
      if (r.overall === null) return;
      var h = history(), entry = { t: new Date().toISOString(), overall: r.overall, areas: r.areas.map(function (a) { return a.score; }) };
      if (historyEntry >= 0 && historyEntry < h.length) h[historyEntry] = entry;   // same run: update, don't duplicate
      else { h.push(entry); historyEntry = h.length - 1; }
      if (h.length > 100) { h = h.slice(h.length - 100); historyEntry = h.length - 1; }
      UI.store.set(KEY_HISTORY, h);
    }
    function historyCard() {
      var h = history();
      if (!h.length) return "";
      var stageName = function (v) { return STAGES[Math.min(9, Math.floor(v / 10))].name; };
      var rows = h.slice().reverse().slice(0, 10).map(function (e) {
        return { date: shortDate(e.t), score: UI.num(e.overall), stage: t("stage") + " " + UI.num(Math.min(9, Math.floor(e.overall / 10))) + " " + stageName(e.overall) };
      });
      var chart = h.length > 1 ? UI.historyChart(h.slice(-20).map(function (e) { return { label: shortDate(e.t), value: e.overall }; })) : UI.para(t("historyOne"));
      return UI.card(UI.heading(t("historyT")) + UI.muted(t("historyHint")) + chart +
        UI.historyTable(rows, [t("historyDate"), t("historyScore")]) +
        '<div class="actions no-print">' + UI.button(t("clearHistory"), { id: "clearHistBtn" }) + "</div>");
    }
    function bindHistory() {
      UI.onConfirm("clearHistBtn", t("clearConfirm"), function () { UI.store.remove(KEY_HISTORY); historyEntry = -1; render(); });
    }

    function render() {
      if (idx < 0) return renderIntro();
      if (idx >= QUESTIONS.length) return renderResults();
      renderQuestion();
    }

    /* ---------- Intro ---------- */
    function renderIntro() {
      var rows = STAGES.map(function (s, i) { return { band: band(i), name: s.name, desc: s.desc }; });
      var saved = loadSaved();
      var resume = saved ? UI.card(UI.heading(t("resumeT")) +
        UI.para(t("resumeTxt", { n: UI.num(saved.idx + 1), t: UI.num(QUESTIONS.length) })) +
        UI.navRow(UI.button(t("startOver"), { id: "freshBtn" }), UI.button(t("resume"), { id: "resumeBtn", primary: true }))) : "";
      app.innerHTML = resume +
        UI.card(UI.title(t("title")) + (T.sub ? UI.muted(t("sub")) : "") + UI.para(t("purpose")) +
          UI.note(t("privT"), t("priv")) + (T.lim ? UI.note(T.limT || "", t("lim"), "limit") : "")) +
        UI.card(UI.heading(t("stagesT")) + UI.stageTable(rows)) +
        historyCard() +
        (saved ? "" : UI.navRow("", UI.button(t("start"), { id: "startBtn", primary: true })));
      UI.onClick("startBtn", function () { goTo(0); });
      UI.onClick("resumeBtn", function () { answers = saved.answers; orders = saved.orders; goTo(saved.idx); });
      UI.onClick("freshBtn", function () { reset(); goTo(0); });
      bindHistory();
    }

    /* ---------- One question ---------- */
    function renderQuestion() {
      var q = QUESTIONS[idx], total = QUESTIONS.length, cur = answers[idx], last = idx === total - 1;
      var items = orders[idx].map(function (k) { return { key: k, text: q.options[k][1], selected: cur === k }; });
      items.push({ key: "none", text: t("none"), none: true, selected: cur === "none" });
      app.innerHTML = UI.questionCard({
        counter: t("qOf", { n: UI.num(idx + 1), t: UI.num(total) }),
        percent: Math.round(idx / total * 100),
        area: AREAS[q.area], text: q.text, items: items,
        backLabel: t("back"), nextLabel: last ? t("finish") : t("next"), nextDisabled: cur === null
      });
      UI.onPick(app, function (k) { answers[idx] = k === "none" ? "none" : Number(k); save(); renderQuestion(); });
      UI.onClick("backBtn", function () { goTo(idx - 1); });
      UI.onClick("nextBtn", function () { if (answers[idx] !== null) goTo(idx + 1); });
    }

    /* ---------- Scoring ---------- */
    function compute() {
      var areas = AREAS.map(function (_, ai) {
        var st = [];
        QUESTIONS.forEach(function (q, qi) {
          if (q.area === ai && answers[qi] !== null && answers[qi] !== "none") st.push(q.options[answers[qi]][0]);
        });
        if (!st.length) return { score: null, stage: null };
        var avg = st.reduce(function (a, b) { return a + b; }, 0) / st.length;
        var score = Math.min(100, Math.round(avg * 10 + 5));
        return { score: score, stage: Math.min(9, Math.floor(score / 10)) };
      });
      var scored = areas.map(function (a, i) { return { score: a.score, stage: a.stage, i: i }; })
        .filter(function (a) { return a.score !== null; });
      var r = { areas: areas, overall: null, oStage: null, low: null };
      if (scored.length) {
        r.overall = Math.round(scored.reduce(function (s, a) { return s + a.score; }, 0) / scored.length);
        r.oStage = Math.min(9, Math.floor(r.overall / 10));
        r.low = scored.reduce(function (m, a) { return a.score < m.score ? a : m; }, scored[0]);
      }
      return r;
    }

    function nextStepText(r) {
      if (!r.low) return "";
      var s = r.low.stage;
      if (s >= 9) return t("nextTop", { area: AREAS[r.low.i] });
      return t("nextTxt", { area: AREAS[r.low.i], s: UI.num(s), name: STAGES[s].name,
        s2: UI.num(s + 1), name2: STAGES[s + 1].name, mark2: STAGES[s + 1].desc });
    }

    /* ---------- Text for an AI coach ---------- */
    function coachText(r) {
      var P = COACH, L = [];
      L.push(P.header, P.date + UI.today(), "", P.rulesT);
      P.rules.forEach(function (x) { L.push("- " + x); });
      L.push("", P.stagesT);
      STAGES.forEach(function (s, i) { L.push(band(i) + " " + s.name + ": " + s.desc); });
      L.push("", P.scoresT);
      r.areas.forEach(function (a, i) {
        L.push("- " + AREAS[i] + ": " + (a.score === null ? t("notScored")
          : UI.num(a.score) + "/" + UI.num(100) + ", " + t("stage") + " " + UI.num(a.stage) + " (" + STAGES[a.stage].name + ")"));
      });
      if (r.overall !== null) L.push("- " + t("overall") + ": " + UI.num(r.overall) + "/" + UI.num(100) + ", " + t("stage") + " " + UI.num(r.oStage) + " (" + STAGES[r.oStage].name + ")");
      L.push("", P.qaT);
      QUESTIONS.forEach(function (q, qi) {
        L.push(UI.num(qi + 1) + ". [" + AREAS[q.area] + "] " + q.text);
        var a = answers[qi];
        if (a === null) L.push("   " + P.notAnswered);
        else if (a === "none") L.push("   → " + t("none"));
        else { var o = q.options[a]; L.push("   → " + o[1] + " (" + t("stage") + " " + UI.num(o[0]) + " – " + STAGES[o[0]].name + ")"); }
      });
      L.push("");
      if (r.low) {
        var vars = { area: AREAS[r.low.i], s: UI.num(r.low.stage), os: UI.num(r.oStage), oname: STAGES[r.oStage].name };
        L.push(P.requestT);
        P.request.forEach(function (x) { L.push(UI.fill(x, vars)); });
      }
      return L.join("\n");
    }

    /* ---------- Results ---------- */
    function renderResults() {
      var r = compute();
      UI.store.remove(KEY_PROGRESS);
      record(r);
      var bars = r.areas.map(function (a, i) {
        return { label: AREAS[i], value: a.score, low: !!(r.low && r.low.i === i),
          detail: a.score === null ? t("notScored") : UI.num(a.score) + (lang === "fa" ? "، " : " · ") + t("stage") + " " + UI.num(a.stage) + " " + STAGES[a.stage].name };
      });
      var overall = r.overall === null ? UI.muted(t("notScored"))
        : UI.bigScore(r.overall, 100, t("stage") + " " + UI.num(r.oStage) + ": " + STAGES[r.oStage].name, STAGES[r.oStage].desc);
      var text = coachText(r);
      app.innerHTML =
        UI.card(UI.title(t("resT")) + UI.muted(UI.today()) + UI.heading(t("overall"), "margin-top:14px") + overall) +
        UI.card(UI.scoreBars(bars)) +
        (r.low ? UI.card(UI.heading(t("nextT")) + UI.para(nextStepText(r)) + (T.lim ? UI.note("", t("lim"), "limit") : "")) : "") +
        historyCard() +
        UI.card(UI.copyBox({ id: "coach", title: t("llmT"), hint: t("llmHint"), copyLabel: t("copy"),
          extra: UI.button(t("download"), { id: "dlBtn" }) + UI.button(t("print"), { id: "printBtn" }) }), "no-print") +
        UI.navRow(UI.button(t("back"), { id: "backBtn" }), UI.button(t("restart"), { id: "restartBtn" }));
      UI.bindCopy("coach", text, t("copy"), t("copied"));
      UI.onClick("dlBtn", function () { UI.download(id + "-" + new Date().toISOString().slice(0, 10) + "-" + lang + ".txt", text); });
      UI.onClick("printBtn", function () { window.print(); });
      UI.onClick("backBtn", function () { goTo(QUESTIONS.length - 1); });
      UI.onClick("restartBtn", function () { reset(); goTo(-1); });
      bindHistory();
    }

    /* ---------- Start ---------- */
    if (top) top.innerHTML = UI.topBar({
      homeHref: home, homeLabel: t("home"), brand: t("brand"),
      langHref: otherPage, langLabel: t("lang"), themeLabel: t("theme")
    });
    UI.initTheme();
    UI.rememberLang();
    answers = QUESTIONS.map(function () { return null; });
    orders = QUESTIONS.map(function (q) { return UI.shuffle(q.options.length); });
    render();
    return { restart: function () { reset(); goTo(-1); } };
  }

  global.Questionnaire = { mount: mount };
})(window);
