const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const submitEl = document.getElementById("submit");
const taskEl = document.getElementById("task");
const resultEl = document.getElementById("result");
const nextBtnEl = document.getElementById("next-btn");
const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");
const answerEl = document.getElementById("answer");
const restartEl = document.getElementById("restart");
// const speed1El = document.getElementById("speed-1");
// const speed2El = document.getElementById("speed-2");
// const speed3El = document.getElementById("speed-3");
// const speed4El = document.getElementById("speed-4");
const wrongAnswerSound = document.createElement("audio");
wrongAnswerSound.src = "wrongSound.mp3";
const goodAnswerSound = document.createElement("audio");
goodAnswerSound.src = "goodSound.mp3";

const firstNum = Math.floor(Math.random() * 9) + 1;
const secondNum = Math.floor(Math.random() * 9) + 1;
taskEl.innerText = `${firstNum} x ${secondNum}`;
const answer = firstNum * secondNum;

//set scores as they are stored il localStorage
let scoreCorrect = JSON.parse(localStorage.getItem("correct"));
let scoreWrong = JSON.parse(localStorage.getItem("wrong"));
//if there are no scores in localStorege set it to 0
if (!scoreCorrect) scoreCorrect = 0;
if (!scoreWrong) scoreWrong = 0;

//update scores text
correctEl.innerText = `CORRECT: ${scoreCorrect}`;
wrongEl.innerText = `WRONG: ${scoreWrong}`;

formEl.addEventListener("submit", (event) => {
  const userAnswer = +inputEl.value;
  resultEl.style.display = "block";
  if (userAnswer === answer) {
    goodAnswerSound.play();
    scoreCorrect++;
    resultEl.innerText = "CORRECT";
    correctEl.innerText = `CORRECT: ${scoreCorrect}`;
    correctEl.style.transform = "scale(1.2)";
  } else {
    wrongAnswerSound.play();
    scoreWrong++;
    wrongEl.innerText = `WRONG: ${scoreWrong}`;
    answerEl.style.display = "block";
    resultEl.style.color = "red";
    resultEl.innerText = "WRONG";
    answerEl.innerText = `Correct answer: ${answer}`;
    wrongEl.style.transform = "scale(1.2)";
    setTimeout(() => {
      answerEl.style.transform = "scale(1.4)";
    }, 600);
  }
  event.preventDefault();
  setTimeout(() => {
    location.reload();
    inputEl.focus();
  }, 3500);
  updateLocalStorage();
});

function updateLocalStorage() {
  localStorage.setItem("correct", JSON.stringify(scoreCorrect));
  localStorage.setItem("wrong", JSON.stringify(scoreWrong));
}

restartEl.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
