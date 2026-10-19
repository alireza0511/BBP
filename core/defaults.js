/* ==========================================================================
   Becoming Better: shared text for every quality page.
   The questionnaire starts from these words and then applies the page's own
   CONTENT on top, so a page only writes what is unique to it (title,
   purpose, healthy limits, areas, stages, questions). Any key here can still
   be overridden by a page by giving the same key in its CONTENT.
   Load it before questionnaire.js:
     <script src="../core/defaults.js"></script>
   ========================================================================== */
window.BBP_DEFAULTS = {
  en: {
    text: {
      stagesT: "The ten stages",
      privT: "Privacy and free will",
      priv: "Your answers never leave this browser. Your progress and past results are saved only on this device, and you can clear them at any time. This is only for you, never for scoring anyone else, and you choose your own next step.",
      start: "Begin",
      back: "Back",
      next: "Next",
      finish: "See results",
      none: "None of these fits me",
      qOf: "Question {n} of {t}",
      resumeT: "Welcome back",
      resumeTxt: "You stopped at question {n} of {t}. Your answers so far are saved on this device.",
      resume: "Continue",
      startOver: "Start again",
      resT: "Your results",
      overall: "Overall",
      stage: "Stage",
      nextT: "Your next step",
      nextTxt: "Your lowest area is {area}, at stage {s} ({name}). The next stage up is {s2}, {name2}: {mark2}",
      nextTop: "Your lowest area is {area}, already at stage 9. Keep facing the direction; there is no badge to hold.",
      notScored: "Not scored",
      historyT: "Your results over time",
      historyHint: "Each time you finish, your overall score is saved here, on this device only.",
      historyOne: "This is your first saved result. Come back in a few weeks to see how it changes.",
      historyDate: "Date",
      historyScore: "Overall",
      clearHistory: "Clear saved results",
      clearConfirm: "Tap again to clear",
      llmT: "Text for an AI coach",
      llmHint: "Copy this into an AI assistant to get practices for your next step.",
      copy: "Copy",
      copied: "Copied",
      download: "Download",
      print: "Print",
      restart: "Start over",
      lang: "فارسی",
      home: "← All paths",
      theme: "Theme"
    },
    coach: {
      date: "Date: ",
      rulesT: "Standing rules (please follow them throughout your reply):",
      rules: [
        "Universalizability: only suggest things that would make the world a better place if everyone in the world did them.",
        "Free will: never pressure or command. This assessment is private and only for me, never for scoring others. I choose my own next step."
      ],
      stagesT: "The ten stages:",
      scoresT: "My scores:",
      qaT: "My questions and answers:",
      notAnswered: "Not answered",
      requestT: "My request:",
      request: [
        "1. Suggest 2-3 small, concrete practices to move up one stage in my weakest area ({area}, currently stage {s}).",
        "2. One inner shift that would help most.",
        "3. One practice for my overall stage (stage {os}, {oname}).",
        "Follow the standing rules above: suggest, never command.",
        "Please reply in English."
      ]
    }
  },

  fa: {
    text: {
      stagesT: "ده مرحله",
      privT: "حریم خصوصی و اختیار",
      priv: "پاسخ‌های شما هرگز از این مرورگر بیرون نمی‌رود. پیشرفت و نتیجه‌های قبلی شما فقط روی همین دستگاه ذخیره می‌شود و هر وقت بخواهید می‌توانید پاکشان کنید. این فقط برای خود شماست، هرگز برای سنجیدن دیگران، و قدم بعدی را خودتان انتخاب می‌کنید.",
      start: "شروع",
      back: "قبلی",
      next: "بعدی",
      finish: "دیدن نتیجه",
      none: "هیچ‌کدام به من نمی‌خورد",
      qOf: "پرسش {n} از {t}",
      resumeT: "خوش برگشتید",
      resumeTxt: "در پرسش {n} از {t} متوقف شدید. پاسخ‌هایتان تا اینجا روی همین دستگاه ذخیره شده است.",
      resume: "ادامه",
      startOver: "شروع از اول",
      resT: "نتیجهٔ شما",
      overall: "کلی",
      stage: "مرحله",
      nextT: "قدم بعدی شما",
      nextTxt: "پایین‌ترین حوزهٔ شما {area} است، در مرحلهٔ {s} ({name}). مرحلهٔ بالاتر {s2}، {name2}: {mark2}",
      nextTop: "پایین‌ترین حوزهٔ شما {area} است که در مرحلهٔ ۹ قرار دارد. رو به همین جهت بمانید؛ نشانی برای نگه داشتن نیست.",
      notScored: "امتیاز ندارد",
      historyT: "نتیجه‌های شما در گذر زمان",
      historyHint: "هر بار که تمام می‌کنید، امتیاز کلی شما اینجا ذخیره می‌شود؛ فقط روی همین دستگاه.",
      historyOne: "این نخستین نتیجهٔ ذخیره‌شدهٔ شماست. چند هفته بعد برگردید تا تغییرش را ببینید.",
      historyDate: "تاریخ",
      historyScore: "کلی",
      clearHistory: "پاک کردن نتیجه‌های ذخیره‌شده",
      clearConfirm: "برای پاک کردن دوباره بزنید",
      llmT: "متن برای مربی هوش مصنوعی",
      llmHint: "این متن را در یک دستیار هوش مصنوعی بچسبانید تا برای قدم بعدی تمرین بگیرید.",
      copy: "کپی",
      copied: "کپی شد",
      download: "دریافت فایل",
      print: "چاپ",
      restart: "شروع دوباره",
      lang: "English",
      home: "→ همهٔ مسیرها",
      theme: "پوسته"
    },
    coach: {
      date: "تاریخ: ",
      rulesT: "قواعد ثابت (لطفاً در همهٔ پاسخ رعایت کن):",
      rules: [
        "جهان‌شمول بودن: هر پیشنهادی بده که اگر همهٔ مردم دنیا انجامش دهند، دنیا جای بهتری شود.",
        "اختیار: هرگز فشار نیاور و دستور نده. این خودسنجی خصوصی و فقط برای خود من است، نه برای سنجیدن دیگران. قدم بعدی را خودم انتخاب می‌کنم."
      ],
      stagesT: "ده مرحله:",
      scoresT: "امتیازهای من:",
      qaT: "پرسش‌ها و پاسخ‌های من:",
      notAnswered: "بی‌پاسخ",
      requestT: "درخواست من:",
      request: [
        "1. دو یا سه تمرین کوچک و مشخص پیشنهاد بده که در ضعیف‌ترین حوزه‌ام («{area}»، اکنون مرحلهٔ {s}) یک مرحله بالاتر بروم.",
        "2. یک تغییر درونی که بیشترین کمک را می‌کند.",
        "3. یک تمرین برای مرحلهٔ کلی‌ام (مرحلهٔ {os}، {oname}).",
        "قواعد ثابت بالا را رعایت کن: پیشنهاد بده، دستور نده.",
        "لطفاً به فارسی پاسخ بده."
      ]
    }
  }
};
