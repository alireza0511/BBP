# Becoming Better · بهتر شدن

Private, self-scored assessments for growing in a quality across ten stages, in English and Farsi.

| Path | From → To | English | Farsi |
|---|---|---|---|
| Generosity · سخاوت | شحیح → کریم | `generosity/en.html` | `generosity/fa.html` |
| Patience · صبر | تندخو → صبور | `patience/en.html` | `patience/fa.html` |
| Thankfulness · شکر | نمک‌نشناس → شکور | `thankfulness/en.html` | `thankfulness/fa.html` |
| Trust · توکل | قانِط → راضی | `trust/en.html` | `trust/fa.html` |
| Bravery · شجاعت | جُبن → قوی | `bravery/en.html` | `bravery/fa.html` |

`index.html` is the home page. It builds one card per quality from `core/items.js` and opens each in the viewer's language. Answers never leave the browser; unfinished answers and past results are saved only on the viewer's device.

## Folders

- `core/` shared code, used by every page:
  - `core.css`: the design (from the trust page), light/dark theme, print styles.
  - `widgets.js`: UI widgets (top bar, card, note, stage table, question card, answer options, score bars, big score, copy box, home-page card, history chart and table) plus helpers (Persian digits, dates, theme, saving on the device, download).
  - `defaults.js`: the shared English and Farsi wording (buttons, privacy note, standing rules for the AI coach). Pages only write what is unique to them.
  - `questionnaire.js`: the questionnaire widget, i.e. the whole assessment: intro, questions, scoring, results, saved progress, results history, download and print.
  - `items.js`: the list of qualities shown on the home page.
- `<quality>/en.html`, `fa.html`: one `CONTENT` block per language (title, purpose, healthy limits, areas, ten stages, questions, AI-coach header and rules), then `Questionnaire.mount(...)`.
- `<quality>/questions.md`: every question and answer with its stage, for review. Generated; don't edit by hand.
- `_template/`: a ready-to-fill quality. (Folders starting with `_` are not published by GitHub Pages.)
- `tools/`: `check.js` (content checker) and `questions-md.js` (writes the questions.md files). Run them with Node.js from the repository root.

## Adding a new quality

1. Copy `_template/` and rename the copy, e.g. `honesty/`. The folder name is the quality's id.
2. In both `en.html` and `fa.html`: set `id: "honesty"` and the `<title>`, then replace the placeholders (words, areas, the ten stages, questions). Each answer is `[stage 0-9, "text"]`; a question's `area` is the area's number in the list, starting at 0.
3. Add one entry to `core/items.js` (names, first and last stage, number of areas and questions).
4. Run `node tools/check.js honesty` and fix anything it reports, then `node tools/questions-md.js honesty`.
5. Commit and push. The new card appears on the home page.

## What's saved on the device

Only in the viewer's browser (localStorage), never sent anywhere:
- `bbp-progress-<id>`: answers to an unfinished assessment, so it can be continued later.
- `bbp-history-<id>`: date and scores of each finished assessment, shown as a chart on the results screen and as "Last result" on the home page. The viewer can clear it from the results screen.
- `bbp-lang`, `bbp-theme`: last language and light/dark choice.
