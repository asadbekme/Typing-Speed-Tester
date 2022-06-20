let timerText = document.querySelector(".init_time");
let accuracyText = document.querySelector(".init_accuracy");
let errorText = document.querySelector(".init_errors");
let wordsText = document.querySelector(".init_wpm");
let contentText = document.querySelector(".content");
let inputBox = document.querySelector(".input_box");
let startBtn = document.querySelector(".start");
let restartBtn = document.querySelector(".restart");
let wpmGroup = document.querySelector(".wpm");
let errorGroup = document.querySelector(".errors");
let accuracyGroup = document.querySelector(".accuracy");


let timeLeft = 60;
let timePassed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let typed = 0;
let currentContent = "";
let c = 0;
let timer = null;


function ChangeContent() {
  contentText.textContent = null;
  currentContent = "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century."
  
  currentContent.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    contentText.appendChild(charSpan);
  })

}

function textInput() {
  input = inputBox.value;
  input_array = input.split('');
  typed++;
  errors = 0;
  quoteSpanArray = contentText.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
  let typed = input_array[index]
  if (typed == null) {
      char.classList.remove('correct');
  } 
  else if (typed === char.innerText) {
      char.classList.add('correct');
  } 
  else {
    errors++;
  }
});

  errorText.textContent = totalErrors + errors;
  let correctCharacters = (typed - (totalErrors + errors));
  let accuracyData = ((correctCharacters / typed) * 100);
  accuracyText.textContent = Math.round(accuracyData);

  if (input.length == currentContent.length) {
    ChangeContent();
    totalErrors += errors;
    inputBox.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timePassed++;
    timerText.textContent = timeLeft ;
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer)
  inputBox.disabled = true;
  contentText.style.display="none";
  wpm = Math.round((((typed / 5) / timePassed) * 60));
  wordsText.textContent = wpm;
  wpmGroup.style.display = "block";
}

function startGame() {
  contentText.style.display="block";
  resetGame();
  ChangeContent();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetGame() {
  timeLeft = 60;
  timePassed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  typed = 0;
  c = 0;
  inputBox.disabled = false;
  inputBox.value = "";
  contentText.textContent = "";
  accuracyText.textContent = 100;
  timerText.textContent = timeLeft;
  errorText.textContent = 0;
  restartBtn.style.display = "none";
  wpmGroup.style.display = "none";
}
