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
      llmT: "Your 40-day plan",
      llmHint: "Copy this text into an AI assistant. It will turn your results into a 40-day plan (a chilla): a weekly rhythm, an evening check and three phases.",
      tasksT: "Tasks you already chose (optional)",
      tasksHint: "One per line, with a day if you like. They are added to the plan request below.",
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
      stagesT: "The ten stages:",
      scoresT: "My scores:",
      qaT: "My questions and answers:",
      notAnswered: "Not answered",
      // The 40-day plan request ("request"). Placeholders come from the page's coach.plan
      // ({quality}, {patterns}, {vague}, {reach}, {recurring}, {limit}) and
      // from the results screen ({tasks}, {start}, {day40}).
      request: [
        "Based on my self-assessment results above, create a practical 40-day plan (a chilla) to help me grow in {quality}. Use exactly this structure:",
        "",
        "1. SHORT REFLECTION (3–5 sentences, no judgment)",
        "- Name my strongest area first, as a real strength.",
        "- Describe the areas that are uneven: where I do well when asked, but my default is weaker.",
        "- Name the 1–2 patterns behind my lowest answers (for example: {patterns}).",
        "- If two of my answers seem to contradict each other, point it out gently as something to look at.",
        "",
        "2. THE WEEKLY RHYTHM (a table: Day | Area | Task)",
        "- One concrete task for each day of the week, Monday to Sunday.",
        "- Every area from my assessment gets at least one day; my two weakest areas get two days each.",
        "- Each task must be practical, specific, and doable in under 30 minutes, with a clear action (who, what, how long). Avoid vague tasks like \"{vague}\".",
        "- {tasks}",
        "",
        "3. DAILY EVENING CHECK (1 minute)",
        "- Two short questions I ask myself each evening, aimed at my lowest patterns. Just noticing, no scoring.",
        "",
        "4. HOW IT DEEPENS (three phases)",
        "- Days 1–14 \"Begin\": do the rhythm as written, keep it small.",
        "- Days 15–28 \"Go further\": change 3 of the weekly tasks to a deeper version (more personal, more direct, or slightly costly).",
        "- Days 29–40 \"Let go\": add one one-time act of release, and make 2 tasks reach toward the highest stages ({reach}).",
        "- For any recurring task with its own progression ({recurring}), show how it deepens in each phase.",
        "",
        "5. NOTES (short bullets)",
        "- A healthy-limits note: {limit}.",
        "- What to do if I miss a day (offer the traditional \"start over\" rule or \"simply continue,\" and let me choose).",
        "- Permission to swap days, as long as each area still gets its turn.",
        "- I start on {start}, so day 40 is {day40}. Remind me to retake this self-assessment then and compare."
      ],
      tasksYes: "Include these tasks I already chose: {list}.",
      tasksNo: "I haven't chosen any tasks of my own yet; suggest all of them.",
      rulesT: "RULES",
      rules: [
        "Universalizability: every task must be something that would make the world better if everyone did it.",
        "Free will: offer, never command. I choose."
      ],
      // the page's own rules (healthy limits) go between these two lists
      rulesEnd: [
        "Keep it concise: tables and short bullets, no long explanations.",
        "Reply in English."
      ],
      // used when a page doesn't give its own coach.plan values
      planDefaults: {
        quality: "this quality",
        patterns: "fear, habit, needing to be seen",
        vague: "try harder",
        reach: "acting well when it costs me, toward someone who can't repay",
        recurring: "a task I repeat every week",
        limit: "growing in this never means staying in harm or hurting myself",
        example: "Monday: …\nWednesday: …"
      }
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
      llmT: "برنامهٔ چلهٔ شما",
      llmHint: "این متن را در یک دستیار هوش مصنوعی بچسبانید. نتیجهٔ شما را به یک برنامهٔ ۴۰ روزه (چله) تبدیل می‌کند: برنامهٔ هفتگی، مرور شبانه و سه مرحله.",
      tasksT: "کارهایی که خودتان انتخاب کرده‌اید (اختیاری)",
      tasksHint: "هر کار در یک خط، اگر خواستید با روزش. به درخواست برنامه در پایین اضافه می‌شوند.",
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
      stagesT: "ده مرحله:",
      scoresT: "امتیازهای من:",
      qaT: "پرسش‌ها و پاسخ‌های من:",
      notAnswered: "بی‌پاسخ",
      // درخواست برنامهٔ چله. جای‌خالی‌ها از coach.plan صفحه پر می‌شوند
      // و {tasks}، {start}، {day40} از صفحهٔ نتیجه.
      request: [
        "بر اساس نتیجهٔ خودسنجی بالا، یک برنامهٔ عملی ۴۰ روزه (یک چله) برای رشد من در {quality} بنویس. دقیقاً از این ساختار استفاده کن:",
        "",
        "۱. بازتاب کوتاه (۳ تا ۵ جمله، بدون قضاوت)",
        "- اول قوی‌ترین حوزه‌ام را به‌عنوان یک نقطهٔ قوت واقعی نام ببر.",
        "- حوزه‌های ناهموار را توصیف کن: جاهایی که وقتی از من خواسته می‌شود خوب عمل می‌کنم، ولی رفتار پیش‌فرضم ضعیف‌تر است.",
        "- یک یا دو الگوی پشت پایین‌ترین پاسخ‌هایم را نام ببر (مثلاً: {patterns}).",
        "- اگر دو پاسخ من با هم ناسازگار به نظر می‌رسند، با ملایمت به آن اشاره کن، به‌عنوان چیزی برای نگاه کردن.",
        "",
        "۲. برنامهٔ هفتگی (جدول: روز | حوزه | کار)",
        "- برای هر روز هفته، از شنبه تا جمعه، یک کار مشخص.",
        "- هر حوزهٔ خودسنجی دست‌کم یک روز داشته باشد؛ دو حوزهٔ ضعیف‌ترم هر کدام دو روز.",
        "- هر کار باید عملی، مشخص و کمتر از ۳۰ دقیقه باشد، با اقدامی روشن (با چه کسی، چه کاری، چقدر). از کارهای مبهم مثل «{vague}» پرهیز کن.",
        "- {tasks}",
        "",
        "۳. مرور شبانه (یک دقیقه)",
        "- دو پرسش کوتاه که هر شب از خودم بپرسم، رو به پایین‌ترین الگوهایم. فقط توجه کردن، بدون امتیاز دادن.",
        "",
        "۴. چگونه عمیق‌تر می‌شود (سه مرحله)",
        "- روز ۱ تا ۱۴ «آغاز»: برنامه را همان‌طور که نوشته شده انجام بده و کوچک نگهش دار.",
        "- روز ۱۵ تا ۲۸ «فراتر رفتن»: سه کار هفتگی را به شکلی عمیق‌تر تغییر بده (شخصی‌تر، مستقیم‌تر یا کمی پرهزینه‌تر).",
        "- روز ۲۹ تا ۴۰ «رها کردن»: یک کار یک‌باره برای رها کردن اضافه کن، و دو کار را رو به بالاترین مرحله‌ها ببر ({reach}).",
        "- برای هر کار تکراری که پیشرفت خودش را دارد ({recurring})، نشان بده در هر مرحله چگونه عمیق‌تر می‌شود.",
        "",
        "۵. یادداشت‌ها (نکته‌های کوتاه)",
        "- یادداشت مرزهای سالم: {limit}.",
        "- اگر روزی را جا انداختم چه کنم (قاعدهٔ سنتی «از نو شروع کن» یا «ساده ادامه بده» را پیشنهاد بده و انتخاب را به من بسپار).",
        "- اجازهٔ جابه‌جا کردن روزها، به شرطی که هر حوزه نوبتش را داشته باشد.",
        "- من از {start} شروع می‌کنم، پس روز چهلم {day40} است. یادم بینداز آن روز دوباره این خودسنجی را انجام دهم و مقایسه کنم."
      ],
      tasksYes: "این کارها را که خودم انتخاب کرده‌ام در برنامه بگنجان: {list}.",
      tasksNo: "هنوز کاری از خودم انتخاب نکرده‌ام؛ همه را خودت پیشنهاد بده.",
      rulesT: "قواعد",
      rules: [
        "جهان‌شمول بودن: هر کار باید چیزی باشد که اگر همه انجامش دهند، دنیا بهتر شود.",
        "اختیار: پیشنهاد بده، هرگز دستور نده. انتخاب با من است."
      ],
      // قواعد خود صفحه (مرزهای سالم) میان این دو فهرست می‌آید
      rulesEnd: [
        "کوتاه بنویس: جدول و نکته‌های کوتاه، بدون توضیح طولانی.",
        "به فارسی پاسخ بده."
      ],
      // اگر صفحه coach.plan خودش را نداشته باشد
      planDefaults: {
        quality: "این صفت",
        patterns: "ترس، عادت، نیاز به دیده شدن",
        vague: "بیشتر تلاش کن",
        reach: "درست رفتار کردن وقتی هزینه دارد، با کسی که نمی‌تواند جبران کند",
        recurring: "کاری که هر هفته تکرار می‌کنم",
        limit: "رشد در این صفت هرگز به معنای ماندن در آسیب یا آسیب زدن به خودم نیست",
        example: "شنبه: …\nدوشنبه: …"
      }
    }
  }
};
