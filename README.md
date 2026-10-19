# Becoming Better · بهتر شدن

Five private, self-scored assessments for growing in a quality across ten stages. Each one has its own folder with a separate English and Farsi page:

| Path | From → To | English | Farsi |
|---|---|---|---|
| Generosity · سخاوت | شحیح → کریم | `generosity/en.html` | `generosity/fa.html` |
| Patience · صبر | تندخو → صبور | `patience/en.html` | `patience/fa.html` |
| Thankfulness · شکر | نمک‌نشناس → شکور | `thankfulness/en.html` | `thankfulness/fa.html` |
| Trust · توکل | قانِط → راضی | `trust/en.html` | `trust/fa.html` |
| Bravery · شجاعت | جُبن → قوی | `bravery/en.html` | `bravery/fa.html` |

`index.html` is the home page (English/Farsi toggle) and links to the page in the chosen language. Each page is a single self-contained HTML file. Answers never leave the browser.

Some folders also have a `questions.md` listing every question with the stage behind each answer, for review.

## Shared code (`core/`)

Every page is built from the same three files:

- `core/core.css`: colors, light/dark theme and the styles for every widget.
- `core/widgets.js`: the UI widgets (top bar, card, note, stage table, progress bar, answer options, score bars, big score, copy box) plus helpers for Persian digits, dates and the theme toggle.
- `core/assessment.js`: the shared screens (intro, questions, results) and scoring.

Each `en.html` / `fa.html` holds only its own language: the screen text, areas, stages, questions and the text for an AI coach, in one `CONTENT` block you can edit directly. A page's own colors sit in a small `<style>` block in its `<head>`.
