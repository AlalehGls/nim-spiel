const totalMtachsticks = 16;
// match container
const matchContainer = document.querySelector(".match-container"); 
// buttons
const startButton = document.querySelector("#start-btn");
const resetButton = document.querySelector("#reset-btn");
// inputs
const firstPlayerInput = document.querySelector("#first-input");
const secondPlayerInput = document.querySelector("#second-input");
// canvas
const allCanvas = document.querySelectorAll("canvas");
const firstCanvas = document.querySelector("#first-canvas");
const secondCanvas = document.querySelector("#second-canvas");
// msg
const message = document.querySelector(".message");
message.textContent = "";

// Create the matchsticks -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () { 
  for (let i = 0; i < totalMtachsticks; i++) {
    let matchStick = document.createElement("div");
    matchStick.className = "match";
    matchContainer.appendChild(matchStick);
  }
  firstPlayerInput.disabled = true;
  secondPlayerInput.disabled = true;
});

// Which player Starts the game ----------------------------------------------------------
function randomStart() {
  const gameStarter = Math.floor(Math.random() * 2) + 1; // output 0,1 + 1 
  message.textContent = ` Spieler ${gameStarter} beginnt! `

  if (gameStarter === 1) {
    firstPlayerInput.classList.add("active-input");
    firstPlayerInput.disabled = false;
    secondPlayerInput.disabled = true;
  } else {
    secondPlayerInput.classList.add("active-input");
    firstPlayerInput.disabled = true;
    secondPlayerInput.disabled = false;
  }
}
startButton.addEventListener("click", randomStart);

// Restart Game ---------------------------------------------------------------------------
resetButton.addEventListener("click", function () {
  location.reload();
});

// Deactive Start ----------------------------------------------------------------------------
function deactivateStart() {
  startButton.disabled = true;
  startButton.style.backgroundColor = "#ddd";
}

// Remove matchsticks first player ---------------------------------------------------------
firstPlayerInput.addEventListener("input", function () {
  const matchsticks = document.querySelectorAll(".match");
  deactivateStart();
  let inputValue = firstPlayerInput.value;

  if (isNaN(inputValue) || inputValue < 1 || inputValue > 3) {
    message.textContent = "Geben Sie bitte eine Nummer zwischen 1 und 3 ein";
    return;
  }
  else if (matchsticks.length - inputValue < 0) {
    message.textContent = "Diese Menge ist nicht Vorhanden!"
    return;
  }
  for (i = 0; i < inputValue; i++) {
    matchContainer.removeChild(matchsticks[i]);
  }

  if (matchsticks.length - inputValue === 0) { //who take the last action 
    message.textContent = "Spieler 2 gewonnen!";
    firstPlayerInput.classList.remove("active-input");
    firstPlayerInput.disabled = true;
    secondPlayerInput.disabled = true;
    showFeelings("bad");
  }
  else {
    secondPlayerInput.value = "";
    firstPlayerInput.classList.toggle("active-input");
    secondPlayerInput.classList.toggle("active-input");
    message.textContent = "Spieler 2";
    firstPlayerInput.disabled = true;
    secondPlayerInput.disabled = false;
  }
});

// Remove matchsticks Second player ---------------------------------------------------------
secondPlayerInput.addEventListener("input", function () {
  const matchsticks = document.querySelectorAll(".match");
  deactivateStart();
  let inputValue = secondPlayerInput.value;

  if (isNaN(inputValue) || inputValue < 1 || inputValue > 3) {
    message.textContent = "Geben Sie bitte eine Nummer zwischen 1 und 3 ein";
    return;
  }
  else if (matchsticks.length - inputValue < 0) {
    message.textContent = "Diese Menge ist nicht Vorhanden!"
    return;
  }
  for (i = 0; i < inputValue; i++) {
    matchContainer.removeChild(matchsticks[i]);
  }
  if (matchsticks.length - inputValue === 0) {  // wer sieger ist
    message.textContent = "Spieler 1 gewonnen!";
    secondPlayerInput.classList.remove("active-input");
    firstPlayerInput.disabled = true;
    secondPlayerInput.disabled = true;
    showFeelings("good");
  }
  else { // weiter spielen
    firstPlayerInput.value = "";
    firstPlayerInput.classList.toggle("active-input");
    secondPlayerInput.classList.toggle("active-input");
    message.textContent = " Spieler 1";
    firstPlayerInput.disabled = false;
    secondPlayerInput.disabled = true;
    firstPlayerInput.value = "";
  }
});

// Emoji ----------------------------------------------------------------------------------
function showFeelings(response) {
  allCanvas.forEach((canvas) => {
    const happyctx = (response === "good") ? firstCanvas.getContext("2d") : secondCanvas.getContext("2d"); // response : good => first canvas smiles and vice versa
    const sadctx = (response === "bad") ? firstCanvas.getContext("2d") : secondCanvas.getContext("2d"); // response : bad => first canvas grimaces and vice versa 

    // Gesicht
    const ctx = canvas.getContext("2d"); // getContext returns an object for drawing:
    ctx.beginPath();
    ctx.arc(30, 30, 30, 0, 2 * Math.PI); // circle (x,y,Radius,radian,radian,direction)
    ctx.fillStyle = "#fbdc34";
    ctx.fill();
    ctx.closePath();

    // Augen
    //  eyes
    ctx.beginPath();
    ctx.arc(18, 18, 3, 0, Math.PI * 2); // Left eye
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(42, 18, 3, 0, Math.PI * 2); // Right eye
    ctx.fill();
    ctx.closePath();

    // Mund
    // mouth happy   // glücklich
    happyctx.beginPath();
    happyctx.arc(30, 30, 18, Math.PI / 6, 5 * Math.PI / 6, false); // about 30 to 150 degree // happy
    happyctx.lineWidth = 3;
    happyctx.strokeStyle = '#000';
    happyctx.stroke();
    happyctx.closePath();

    // mouth sad     // traurig
    sadctx.beginPath();
    sadctx.arc(30, 54, 18, Math.PI + Math.PI / 6, 11 * Math.PI / 6, false); // sad
    sadctx.lineWidth = 3;
    sadctx.strokeStyle = '#000';
    sadctx.stroke();
    sadctx.closePath();
  });
}
