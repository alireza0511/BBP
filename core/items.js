/* ==========================================================================
   Becoming Better: the list of qualities.
   The home page builds one card per entry, in this order. To add a quality:
   copy the _template folder, rename it (the folder name is the id), fill in
   its en.html and fa.html, then add one entry here. Run `node tools/check.js`
   to make sure the numbers below match the pages.
   ========================================================================== */
window.BBP_ITEMS = [
  {
    id: "generosity",  // folder name
    en: { name: "Generosity", from: "The Grasper", to: "The Bountiful" },
    fa: { name: "سخاوت", from: "شحیح", to: "کریم" },
    areas: 6, questions: 18
  },
  {
    id: "patience",  // folder name
    en: { name: "Patience", from: "The Wrathful", to: "The Patient" },
    fa: { name: "صبر", from: "تندخو", to: "صبور" },
    areas: 7, questions: 21
  },
  {
    id: "thankfulness",  // folder name
    en: { name: "Thankfulness", from: "The Ingrate", to: "The Ever-Grateful" },
    fa: { name: "شکر", from: "نمک‌نشناس", to: "شکور" },
    areas: 6, questions: 18
  },
  {
    id: "trust",  // folder name
    en: { name: "Trust in a Higher Power", from: "The Despairing", to: "The Content" },
    fa: { name: "توکل", from: "قانِط", to: "راضی" },
    areas: 6, questions: 18
  },
  {
    id: "bravery",  // folder name
    en: { name: "Bravery", from: "Cowardice", to: "The Strong" },
    fa: { name: "شجاعت", from: "جُبن", to: "قوی" },
    areas: 7, questions: 21
  },
  {
    id: "watchfulness",  // folder name
    en: { name: "Mastery of Thoughts", from: "The Captive", to: "The Present" },
    fa: { name: "انتخاب آگاهانه افکار", from: "اسیر", to: "حاضردل" },
    areas: 6, questions: 18
  }
];
