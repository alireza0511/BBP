#!/usr/bin/env node
/* ==========================================================================
   Becoming Better: content checker.
   Run from the repository root before publishing:
     node tools/check.js            check every quality listed in core/items.js
     node tools/check.js honesty    check one folder (e.g. a new one)
   It reads each <folder>/en.html and fa.html and reports anything that would
   break the page or confuse a reader. Exit code 1 if there are problems.
   ========================================================================== */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");

function loadWindowFile(file, name) {
  const w = {}; vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), { window: w });
  return w[name];
}
function loadContent(file) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/const CONTENT = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error("no `const CONTENT = {...};` block found");
  const id = (html.match(/Questionnaire\.mount\(\{[\s\S]*?id:\s*"([^"]+)"/) || [])[1];
  return { C: vm.runInNewContext("(" + m[1] + ")"), id, html };
}

const ITEMS = loadWindowFile("core/items.js", "BBP_ITEMS") || [];
const only = process.argv[2];
const folders = only ? [only] : ITEMS.map(i => i.id);
let problems = 0;

for (const folder of folders) {
  const errs = [], E = m => errs.push(m), pages = {};
  for (const L of ["en", "fa"]) {
    const file = path.join(ROOT, folder, L + ".html");
    if (!fs.existsSync(file)) { E(`${L}.html is missing`); continue; }
    let p; try { p = loadContent(file); } catch (e) { E(`${L}.html: ${e.message}`); continue; }
    pages[L] = p.C;
    const C = p.C;
    if (p.id !== folder) E(`${L}.html: Questionnaire.mount id is "${p.id}", should be the folder name "${folder}"`);
    if (!p.html.includes(`lang="${L}"`)) E(`${L}.html: <html lang="${L}"> is missing`);
    // the page must use only its own language
    const other = L === "en" ? /[؀-ۿ]/ : /[A-Za-z]{2,}/;
    (function walk(v, where) {
      if (typeof v === "string") { if (other.test(v.replace(/\{[a-z0-9]+\}/gi, ""))) E(`${L} ${where}: text in the other language: "${v.slice(0, 50)}"`); }
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
      else if (v && typeof v === "object") for (const k in v) walk(v[k], where ? `${where}.${k}` : k);
    })(C, "");
    for (const k of ["brand", "title", "purpose"]) if (!C.text || !C.text[k]) E(`${L} text.${k} is missing`);
    if (!C.coach || !C.coach.header) E(`${L} coach.header is missing`);
    if (!Array.isArray(C.areas) || !C.areas.length) E(`${L} areas: need at least one`);
    if (!Array.isArray(C.stages) || C.stages.length !== 10) E(`${L} stages: need exactly 10 (found ${C.stages && C.stages.length})`);
    else C.stages.forEach((s, i) => { if (!s.name || !s.desc) E(`${L} stage ${i}: needs name and desc`); });
    (C.questions || []).forEach((q, i) => {
      const n = `${L} question ${i + 1}`;
      if (!(Number.isInteger(q.area) && q.area >= 0 && q.area < C.areas.length)) E(`${n}: area ${q.area} does not exist (areas are 0-${C.areas.length - 1})`);
      if (!q.text) E(`${n}: text is empty`);
      if (!Array.isArray(q.options) || q.options.length < 2) E(`${n}: needs at least 2 answers`);
      const seen = new Set();
      (q.options || []).forEach((o, j) => {
        if (!Array.isArray(o) || !Number.isInteger(o[0]) || o[0] < 0 || o[0] > 9) E(`${n}, answer ${j + 1}: stage must be a whole number 0-9`);
        else if (seen.has(o[0])) E(`${n}: two answers share stage ${o[0]}`); else seen.add(o[0]);
        if (!o[1]) E(`${n}, answer ${j + 1}: text is empty`);
      });
    });
    if (!(C.questions || []).length) E(`${L}: no questions`);
    C.areas && C.areas.forEach((a, ai) => { if (!(C.questions || []).some(q => q.area === ai)) E(`${L} area "${a}" has no questions`); });
  }
  // English and Farsi must match
  const { en, fa } = pages;
  if (en && fa) {
    if (en.areas.length !== fa.areas.length) E(`en has ${en.areas.length} areas, fa has ${fa.areas.length}`);
    if (en.questions.length !== fa.questions.length) E(`en has ${en.questions.length} questions, fa has ${fa.questions.length}`);
    en.questions.forEach((q, i) => {
      const f = fa.questions[i]; if (!f) return;
      if (q.area !== f.area) E(`question ${i + 1}: area differs (en ${q.area}, fa ${f.area})`);
      const a = q.options.map(o => o[0]).join(","), b = f.options.map(o => o[0]).join(",");
      if (a !== b) E(`question ${i + 1}: answer stages differ (en ${a} / fa ${b})`);
    });
  }
  // core/items.js entry
  const it = ITEMS.find(i => i.id === folder);
  if (!it) E(`not listed in core/items.js (add an entry so it appears on the home page)`);
  else if (en && fa) {
    if (it.areas !== en.areas.length) E(`core/items.js says ${it.areas} areas, page has ${en.areas.length}`);
    if (it.questions !== en.questions.length) E(`core/items.js says ${it.questions} questions, page has ${en.questions.length}`);
    for (const [L, C] of [["en", en], ["fa", fa]]) {
      if (it[L].from !== C.stages[0].name) E(`core/items.js ${L}.from should be "${C.stages[0].name}"`);
      if (it[L].to !== C.stages[9].name) E(`core/items.js ${L}.to should be "${C.stages[9].name}"`);
    }
  }
  if (errs.length) { problems += errs.length; console.log(`✗ ${folder}`); errs.forEach(e => console.log("   - " + e)); }
  else console.log(`✓ ${folder}: ${en.questions.length} questions, ${en.areas.length} areas, en and fa match`);
}
console.log(problems ? `\n${problems} problem(s) found.` : "\nAll good.");
process.exit(problems ? 1 : 0);
