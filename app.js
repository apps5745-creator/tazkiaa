const quizzes = {

  math: {

    name: "الرياضيات",

    questions: [

      {

        question: "ما ناتج ٢٤ × ٣؟",

        answers: ["٦٢", "٧٢", "٨٢", "٦٤"],

        correct: 1,

        hint: "اجمع ٢٤ ثلاث مرات."

      },

      {

        question: "أي كسر يساوي نصفًا؟",

        answers: ["١⁄٣", "٢⁄٣", "٢⁄٤", "٣⁄٤"],

        correct: 2,

        hint: "النصف يمكن تمثيله بجزأين من أربعة أجزاء متساوية."

      },

      {

        question: "معك ١٠٠ جنيه، واشتريت كتابًا بـ٣٥ جنيهًا. كم يتبقى؟",

        answers: ["٦٥", "٧٥", "٥٥", "٦٠"],

        correct: 0,

        hint: "احسب ١٠٠ − ٣٥."

      }

    ]

  },

  arabic: {

    name: "اللغة العربية",

    questions: [

      {

        question: "في جملة «قرأ التلميذ القصة»، ما الفاعل؟",

        answers: ["قرأ", "التلميذ", "القصة", "الجملة"],

        correct: 1,

        hint: "الفاعل هو من قام بالفعل."

      },

      {

        question: "ما جمع كلمة «كتاب»؟",

        answers: ["كاتبان", "مكتبة", "كتب", "كاتب"],

        correct: 2,

        hint: "فكر في جمع التكسير لكلمة كتاب."

      },

      {

        question: "ما مضاد كلمة «نشيط»؟",

        answers: ["قوي", "كسول", "سريع", "ذكي"],

        correct: 1,

        hint: "المضاد هو الكلمة التي تحمل المعنى العكسي."

      }

    ]

  }

};

const quizDialog = document.getElementById("quizDialog");

const messageDialog = document.getElementById("messageDialog");

let currentQuiz;

let questionIndex = 0;

let score = 0;

let answered = false;

function showMessage(title, message) {

  document.getElementById("messageTitle").textContent = title;

  document.getElementById("messageText").textContent = message;

  messageDialog.showModal();

}

document.querySelectorAll(".start-quiz").forEach(button => {

  button.addEventListener("click", () => {

    startQuiz(button.dataset.subject);

  });

});

function startQuiz(subject) {

  currentQuiz = quizzes[subject];

  questionIndex = 0;

  score = 0;

  document.getElementById("quizSubject").textContent =

    currentQuiz.name;

  document.getElementById("quizTitle").textContent =

‎    "اختبر معلوماتك";

  renderQuestion();

  quizDialog.showModal();

}

function renderQuestion() {

  answered = false;

  const item = currentQuiz.questions[questionIndex];

  document.getElementById("question").textContent =

    item.question;

  document.getElementById("feedback").textContent = "";

  const nextButton = document.getElementById("nextBtn");

  nextButton.disabled = true;

  nextButton.textContent =

    questionIndex === currentQuiz.questions.length - 1

‎      ? "عرض النتيجة"

‎      : "السؤال التالي ←";

  const answersContainer = document.getElementById("answers");

  answersContainer.replaceChildren();

  item.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.className = "answer";

    button.textContent = answer;

    button.addEventListener("click", () => {

      selectAnswer(index, button);

    });

    answersContainer.appendChild(button);

  });

}

function selectAnswer(index, selectedButton) {

  if (answered) return;

  answered = true;

  const item = currentQuiz.questions[questionIndex];

  const buttons = document.querySelectorAll(".answer");

  const feedback = document.getElementById("feedback");

  buttons.forEach((button, i) => {

    button.disabled = true;

    if (i === item.correct) {

      button.classList.add("correct");

    }

  });

  if (index === item.correct) {

    score++;

    feedback.textContent = "أحسنت! إجابة صحيحة ⭐";

    feedback.style.color = "#176b63";

  } else {

    selectedButton.classList.add("wrong");

    feedback.textContent = "حاول تفهم التلميح: " + item.hint;

    feedback.style.color = "#a34e42";

  }

  document.getElementById("nextBtn").disabled = false;

}

document.getElementById("nextBtn").addEventListener("click", () => {

  if (questionIndex < currentQuiz.questions.length - 1) {

    questionIndex++;

    renderQuestion();

    return;

  }

  const total = currentQuiz.questions.length;

  quizDialog.close();

  showMessage(

‎    "خلصت التدريب! 🌟",

‎    `نتيجتك ${score} من ${total}. ${

      score === total

‎        ? "ممتاز! أجبت عن كل الأسئلة بشكل صحيح."

‎        : "راجع التلميحات وحاول مرة أخرى لتحسن نتيجتك."

    }`

  );

});

document.getElementById("closeQuiz").addEventListener("click", () => {

  quizDialog.close();

});

document.getElementById("closeMessage").addEventListener("click", () => {

  messageDialog.close();

});

document.getElementById("okBtn").addEventListener("click", () => {

  messageDialog.close();

});

document.getElementById("loginBtn").addEventListener("click", () => {

  showMessage(

‎    "دخول الطالب",

‎    "تسجيل الدخول الحقيقي سنضيفه في المرحلة التالية بعد تجهيز قاعدة البيانات."

  );

});

document.getElementById("subscribeBtn").addEventListener("click", () => {

  showMessage(

‎    "اشتراك تزكية",

‎    "الاشتراكات والمدفوعات غير مفعّلة بعد. سنضيفها بعد تجهيز الحسابات والدفع الآمن."

  );

});

document.getElementById("year").textContent = new Date().getFullYear();
