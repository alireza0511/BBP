/* ==========================================================================
   Becoming Better: assessment engine (intro, questions, scoring, results).
   Shared by every quality page. A page defines window.CONTENT (its words,
   areas, stages and questions, in one language) and then loads:
     <script src="../core/widgets.js"></script>
     <script src="../core/assessment.js"></script>

   CONTENT = {
     otherPage: "fa.html",                  // the same page in the other language
     text: { brand, title, sub?, purpose, privT, priv, limT?, lim?, stagesT,
             start, back, next, finish, none, qOf, resT, overall, stage,
             nextT, nextTxt, nextTop, notScored, llmT, llmHint, copy, copied,
             restart, lang, home, theme },
     areas: ["Area name", ...],
     stages: [{ name, desc }, ...],         // 10 stages, lowest first
     questions: [{ area, text, options: [[stage, "answer"], ...] }, ...],
     coach: { header, date, rulesT, rules: [...], stagesT, scoresT, qaT,
              notAnswered, requestT, request: [...] }   // text for an AI coach
   }
   Scoring: each area = average stage of its answers x 10 + 5 (0-100);
   overall = average of the scored areas.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.CONTENT, T = C.text, AREAS = C.areas, STAGES = C.stages, QUESTIONS = C.questions;
  var app = document.getElementById("app");
  var idx = -1, answers = [], orders = [];

  function t(k, vars) { return UI.fill(T[k], vars); }
  function band(i) { return i === 9 ? UI.num("90–100") : UI.num(i * 10 + "–" + (i * 10 + 9)); }
  function goTo(i) { idx = i; render(); window.scrollTo(0, 0); }

  function reset() {
    answers = QUESTIONS.map(function () { return null; });
    orders = QUESTIONS.map(function (q) { return UI.shuffle(q.options.length); });
    idx = -1;
  }

  function render() {
    if (idx < 0) return renderIntro();
    if (idx >= QUESTIONS.length) return renderResults();
    renderQuestion();
  }

  /* ---------- Intro ---------- */
  function renderIntro() {
    var rows = STAGES.map(function (s, i) { return { band: band(i), name: s.name, desc: s.desc }; });
    app.innerHTML =
      UI.card(UI.title(t("title")) + (T.sub ? UI.muted(t("sub")) : "") + UI.para(t("purpose")) +
        UI.note(t("privT"), t("priv")) + (T.lim ? UI.note(T.limT || "", t("lim"), "limit") : "")) +
      UI.card(UI.heading(t("stagesT")) + UI.stageTable(rows)) +
      UI.navRow("", UI.button(t("start"), { id: "startBtn", primary: true }));
    UI.onClick("startBtn", function () { goTo(0); });
  }

  /* ---------- One question ---------- */
  function renderQuestion() {
    var q = QUESTIONS[idx], total = QUESTIONS.length, cur = answers[idx], last = idx === total - 1;
    var items = orders[idx].map(function (k) { return { key: k, text: q.options[k][1], selected: cur === k }; });
    items.push({ key: "none", text: t("none"), none: true, selected: cur === "none" });
    app.innerHTML = UI.card(
      UI.muted(t("qOf", { n: UI.num(idx + 1), t: UI.num(total) })) +
      UI.progress(Math.round(idx / total * 100)) +
      UI.tag(AREAS[q.area]) + UI.situation(q.text) + UI.options(items) +
      UI.navRow(UI.button(t("back"), { id: "backBtn" }),
        UI.button(last ? t("finish") : t("next"), { id: "nextBtn", primary: true, disabled: cur === null })));
    UI.onPick(app, function (k) { answers[idx] = k === "none" ? "none" : Number(k); renderQuestion(); });
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
    var P = C.coach, L = [];
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
    var bars = r.areas.map(function (a, i) {
      return { label: AREAS[i], value: a.score, low: !!(r.low && r.low.i === i),
        detail: a.score === null ? t("notScored") : UI.num(a.score) + (UI.lang() === "fa" ? "، " : " · ") + t("stage") + " " + UI.num(a.stage) + " " + STAGES[a.stage].name };
    });
    var overall = r.overall === null ? UI.muted(t("notScored"))
      : UI.bigScore(r.overall, 100, t("stage") + " " + UI.num(r.oStage) + ": " + STAGES[r.oStage].name, STAGES[r.oStage].desc);
    app.innerHTML =
      UI.card(UI.title(t("resT")) + UI.heading(t("overall"), "margin-top:14px") + overall) +
      UI.card(UI.scoreBars(bars)) +
      (r.low ? UI.card(UI.heading(t("nextT")) + UI.para(nextStepText(r)) + (T.lim ? UI.note("", t("lim"), "limit") : "")) : "") +
      UI.card(UI.copyBox({ id: "coach", title: t("llmT"), hint: t("llmHint"), copyLabel: t("copy"),
        extra: UI.button(t("back"), { id: "backBtn" }) + UI.button(t("restart"), { id: "restartBtn" }) }));
    UI.bindCopy("coach", coachText(r), t("copy"), t("copied"));
    UI.onClick("backBtn", function () { goTo(QUESTIONS.length - 1); });
    UI.onClick("restartBtn", function () { reset(); goTo(-1); });
  }

  /* ---------- Start ---------- */
  document.getElementById("top").innerHTML = UI.topBar({
    homeHref: "../index.html", homeLabel: t("home"), brand: t("brand"),
    langHref: C.otherPage, langLabel: t("lang"), themeLabel: t("theme")
  });
  UI.initTheme();
  UI.rememberLang();
  reset();
  render();
})();
