let nextQuestion = document.getElementById("next_question");
let questions = document.querySelectorAll(".question");
let answers = document.querySelectorAll(".answer");
let currentQuestion = 0;
let currentAnswer = 0;
let res = [];

questions[currentQuestion].style.display = "block";
answers[currentAnswer].style.display = "block";
for (let i = 1; i < questions.length; i++) {
  questions[i].style.display = "none";
  answers[i].style.display = "none";
}
nextQuestion.addEventListener("click", save);

function save() {
  questions[currentQuestion].style.display = "none";
  answers[currentAnswer].style.display = "none";
  currentQuestion++;
  currentAnswer++;

  var rad = document.getElementsByName("0");
  for (let i = 0; i < rad.length; i++) {
    if (rad[i].checked) {
      res.push(rad[i].value);
      break;
    }
  }
  if (currentQuestion == questions.length) {
    document.querySelector(".answer").style.display = "none";
    document.querySelector(".exit").style.display = "block";
    nextQuestion.style.display = "none";
    var advic = gyk(
      Number(res[0]) +
        Number(res[1]) +
        Number(res[2]) +
        Number(res[3]) +
        Number(res[4])
    );
    document.querySelector(".result").insertAdjacentHTML(
      "beforeend",
      `
            <div class="test-title">Результат:</dic>
            <div class="answer">(1. <b>${res[0]}</b>/1)(2. <b>${res[1]
      }</b>/1)(3. <b>${res[2]}</b>/1) (4. <b>${res[3]}</b>/1)(5. <b>${res[4]
      }</b>/1)</div>
            <div class="answer">Набрано балів: ${
              Number(res[0]) +
              Number(res[1]) +
              Number(res[2]) +
              Number(res[3]) +
              Number(res[4])
            } / 5</div>
            <div class="answer">${advic}</div>
            `
    );
  } else {
    questions[currentQuestion].style.display = "block";
    answers[currentAnswer].style.display = "block";
    if (currentQuestion == questions.length - 1) {
      nextQuestion.innerText = "Зберегти";
    }
  }
}
function gyk(k) {
  if (k > 3) return k, "Ви пройшли тест, вітаю))";
  else return k, "Ви не пройшли тест, попробуйте пройти ще раз";
}
