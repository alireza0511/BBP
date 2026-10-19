/* ==========================================================================
   Becoming Better: core UI widgets
   Shared by every assessment page. Load it with:
     <script src="../core/widgets.js"></script>
   Every widget returns an HTML string, so pages build screens like:
     app.innerHTML = UI.card(UI.title("Hello") + UI.note("Tip", "Text"));
   Text passed in is escaped automatically. The page language comes from
   <html lang="..">: "fa" switches digits to Persian and the layout to RTL.
   ========================================================================== */
(function (global) {
  "use strict";

  /* ---------- Helpers ---------- */

  var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

  function lang() { return document.documentElement.lang === "fa" ? "fa" : "en"; }

  /** Escape text for safe use inside HTML. */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /** Show a number with Persian digits on Farsi pages. */
  function num(x) {
    var s = String(x);
    return lang() === "fa" ? s.replace(/[0-9]/g, function (d) { return FA_DIGITS[d]; }) : s;
  }

  /** Fill "{name}" placeholders: fill("Hi {n}", {n: 2}) -> "Hi 2". */
  function fill(s, vars) {
    s = String(s);
    if (vars) for (var k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }

  /** Random order of 0..n-1 (Fisher-Yates). */
  function shuffle(n) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /** Today's date: Persian calendar on Farsi pages, YYYY-MM-DD otherwise. */
  function today() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    var iso = d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
    if (lang() !== "fa") return iso;
    try { return d.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }) + " (" + num(iso) + ")"; }
    catch (e) { return num(iso); }
  }

  function attrs(o) {
    var out = "";
    for (var k in o) {
      if (o[k] === false || o[k] == null) continue;
      out += o[k] === true ? " " + k : " " + k + '="' + esc(o[k]) + '"';
    }
    return out;
  }

  /* ---------- Widgets ---------- */

  /** Top bar: home link, page name, link to the other language, theme toggle. */
  function topBar(o) {
    return (o.homeHref ? '<a class="ui-home" href="' + esc(o.homeHref) + '">' + esc(o.homeLabel) + "</a>" : "") +
      '<div class="ui-top"><div class="brand">' + esc(o.brand) + "</div>" +
      '<div class="tools">' +
      (o.langHref ? '<a class="btn" href="' + esc(o.langHref) + '">' + esc(o.langLabel) + "</a>" : "") +
      '<button type="button" data-ui="theme" aria-label="' + esc(o.themeLabel || "Theme") + '">◐</button>' +
      "</div></div>";
  }

  /** Card container. `inner` is HTML. */
  function card(inner, cls) { return '<div class="card' + (cls ? " " + cls : "") + '">' + inner + "</div>"; }

  /** Headings and paragraphs. */
  function title(text) { return "<h1>" + esc(text) + "</h1>"; }
  function heading(text, style) { return "<h2" + (style ? ' style="' + esc(style) + '"' : "") + ">" + esc(text) + "</h2>"; }
  function para(text) { return "<p>" + esc(text) + "</p>"; }
  function muted(text) { return '<div class="muted">' + esc(text) + "</div>"; }

  /** Callout with a bold title. variant: "limit" for a warning color. */
  function note(head, text, variant) {
    return '<div class="note' + (variant ? " " + variant : "") + '">' +
      (head ? "<b>" + esc(head) + ".</b> " : "") + esc(text) + "</div>";
  }

  /** Stage table. rows: [{band, name, desc}] */
  function stageTable(rows) {
    return '<table class="stages"><tbody>' + rows.map(function (r) {
      return '<tr><td class="b">' + esc(r.band) + '</td><td class="n">' + esc(r.name) + "</td><td>" + esc(r.desc) + "</td></tr>";
    }).join("") + "</tbody></table>";
  }

  /** Progress bar, 0-100. */
  function progress(pct) { return '<div class="progress"><span style="width:' + Math.max(0, Math.min(100, pct)) + '%"></span></div>'; }

  /** Small pill label (e.g. the question's area). */
  function tag(text) { return '<span class="area-tag">' + esc(text) + "</span>"; }

  /** The question text. */
  function situation(text) { return '<div class="situation">' + esc(text) + "</div>"; }

  /** Answer choices. items: [{key, text, selected, none}]. Read the choice with UI.onPick. */
  function options(items) {
    return items.map(function (it) {
      return '<button type="button" class="opt' + (it.none ? " none" : "") + (it.selected ? " sel" : "") +
        '" data-k="' + esc(it.key) + '">' + esc(it.text) + "</button>";
    }).join("");
  }

  /** A button. o: {id, primary, disabled} */
  function button(label, o) {
    o = o || {};
    return "<button" + attrs({ type: "button", id: o.id, "class": o.primary ? "primary" : null, disabled: !!o.disabled }) + ">" + esc(label) + "</button>";
  }

  /** Row with one item at each end (Back ... Next). Pass "" for an empty side. */
  function navRow(left, right) { return '<div class="nav">' + (left || "<span></span>") + (right || "<span></span>") + "</div>"; }

  /** Labeled score bars. rows: [{label, detail, value (0-100 or null), low}] */
  function scoreBars(rows) {
    return rows.map(function (r) {
      return '<div class="row' + (r.low ? " low" : "") + '"><div class="lbl"><b>' + esc(r.label) + '</b><span class="muted">' +
        esc(r.detail) + '</span></div><div class="bar"><span style="width:' + (r.value || 0) + '%"></span></div></div>';
    }).join("");
  }

  /** Large score: value / max, with an optional line and sub-line. */
  function bigScore(value, max, line, sub) {
    return '<div class="big">' + esc(num(value)) + "<small> / " + esc(num(max)) + "</small></div>" +
      (line ? "<div>" + esc(line) + "</div>" : "") + (sub ? muted(sub) : "");
  }

  /** One question screen: counter, progress bar, area tag, question, answers, Back/Next.
      o: {counter, percent, area, text, items (see options), backLabel, nextLabel, nextDisabled}
      Buttons get the ids "backBtn" and "nextBtn". */
  function questionCard(o) {
    return card(muted(o.counter) + progress(o.percent) + tag(o.area) + situation(o.text) + options(o.items) +
      navRow(button(o.backLabel, { id: "backBtn" }), button(o.nextLabel, { id: "nextBtn", primary: true, disabled: !!o.nextDisabled })));
  }

  /** Read-only text with a Copy button. Fill it with UI.bindCopy after rendering. */
  function copyBox(o) {
    return heading(o.title) + muted(o.hint) + '<textarea id="' + esc(o.id || "copyText") + '" readonly></textarea>' +
      '<div class="actions">' + button(o.copyLabel, { id: (o.id || "copyText") + "Btn", primary: true }) + (o.extra || "") + "</div>";
  }

  /* ---------- Behaviour ---------- */

  /** Put text in a copy box and wire its button. */
  function bindCopy(id, text, copyLabel, copiedLabel) {
    var ta = document.getElementById(id), btn = document.getElementById(id + "Btn");
    ta.value = text;
    btn.onclick = function () {
      var done = function () { btn.textContent = copiedLabel; setTimeout(function () { btn.textContent = copyLabel; }, 1600); };
      var fallback = function () { try { ta.select(); if (document.execCommand("copy")) done(); } catch (e) {} };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, fallback);
      else fallback();
    };
  }

  /** Call fn(key) when an answer choice inside root is clicked. */
  function onPick(root, fn) {
    root.querySelectorAll(".opt").forEach(function (b) { b.onclick = function () { fn(b.getAttribute("data-k")); }; });
  }

  /** Click handler by element id (ignored if the element is missing). */
  function onClick(id, fn) { var el = document.getElementById(id); if (el) el.onclick = fn; }

  /** Light/dark toggle, remembered across pages. Call once after rendering the top bar. */
  function initTheme(root) {
    var h = document.documentElement, saved = null;
    try { saved = localStorage.getItem("bbp-theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") h.setAttribute("data-theme", saved);
    (root || document).querySelectorAll('[data-ui="theme"]').forEach(function (b) {
      b.onclick = function () {
        var cur = h.getAttribute("data-theme");
        var dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        var next = dark ? "light" : "dark";
        h.setAttribute("data-theme", next);
        try { localStorage.setItem("bbp-theme", next); } catch (e) {}
      };
    });
  }

  /** Remember this page's language so the home page opens in it too. */
  function rememberLang() { try { localStorage.setItem("bbp-lang", lang()); } catch (e) {} }

  global.UI = {
    lang: lang, esc: esc, num: num, fill: fill, shuffle: shuffle, today: today,
    topBar: topBar, card: card, title: title, heading: heading, para: para, muted: muted, note: note,
    stageTable: stageTable, progress: progress, tag: tag, situation: situation, options: options, questionCard: questionCard,
    button: button, navRow: navRow, scoreBars: scoreBars, bigScore: bigScore, copyBox: copyBox,
    bindCopy: bindCopy, onPick: onPick, onClick: onClick, initTheme: initTheme, rememberLang: rememberLang
  };
})(window);
