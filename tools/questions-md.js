#!/usr/bin/env node
/* ==========================================================================
   Becoming Better: write <folder>/questions.md for review.
   Lists every question in English and Farsi with the stage behind each answer,
   taken straight from the pages, so it never goes out of date.
     node tools/questions-md.js            all qualities in core/items.js
     node tools/questions-md.js honesty    one folder
   ========================================================================== */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const w = {}; vm.runInNewContext(fs.readFileSync(path.join(ROOT, "core/items.js"), "utf8"), { window: w });
const load = f => vm.runInNewContext("(" + fs.readFileSync(f, "utf8").match(/const CONTENT = (\{[\s\S]*?\n\});/)[1] + ")");
const FA = s => String(s).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

for (const id of process.argv[2] ? [process.argv[2]] : w.BBP_ITEMS.map(i => i.id)) {
  const en = load(path.join(ROOT, id, "en.html")), fa = load(path.join(ROOT, id, "fa.html"));
  const L = [`# ${en.text.title} · ${fa.text.title}`, "",
    "Generated from `en.html` and `fa.html` by `node tools/questions-md.js`. Edit the pages, not this file.", "",
    "## Stages · مراحل", "", "| # | English | فارسی |", "|---|---|---|"];
  en.stages.forEach((s, i) => L.push(`| ${i} | **${s.name}**: ${s.desc} | **${fa.stages[i].name}**: ${fa.stages[i].desc} |`));
  en.areas.forEach((area, ai) => {
    L.push("", `## ${ai + 1}. ${area} · ${fa.areas[ai]}`);
    en.questions.forEach((q, qi) => {
      if (q.area !== ai) return;
      const f = fa.questions[qi];
      L.push("", `### Question ${qi + 1}`, "", q.text, "", `> ${f.text}`, "", "| Stage | English | فارسی |", "|---|---|---|");
      q.options.slice().map((o, j) => [o, f.options[j]]).sort((a, b) => a[0][0] - b[0][0])
        .forEach(([o, g]) => L.push(`| ${o[0]} · ${en.stages[o[0]].name} | ${o[1]} | ${g[1]} |`));
    });
  });
  fs.writeFileSync(path.join(ROOT, id, "questions.md"), L.join("\n") + "\n");
  console.log("wrote " + id + "/questions.md");
}
