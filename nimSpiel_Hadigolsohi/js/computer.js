const totalMtachsticks = 16;

const matchContainer = document.querySelector(".match-container");
const startButton = document.querySelector("#start-btn");
const resetButton = document.querySelector("#reset-btn");

let firstPlayerInput = document.querySelector("#first-input");
let secondPlayerInput = document.querySelector("#second-input");

const allCanvas = document.querySelectorAll("canvas");
const firstCanvas = document.querySelector("#first-canvas");
const secondCanvas = document.querySelector("#second-canvas");

const message = document.querySelector(".message");
message.textContent = "";

document.querySelector("#second-label").textContent = "Computer";

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
    const gameStarter = Math.floor(Math.random() * 2) + 1;

    if (gameStarter === 1) {
        message.textContent = "Spieler 1 beginnt!";
        firstPlayerInput.classList.add("active-input");
        firstPlayerInput.disabled = false;
        secondPlayerInput.disabled = true;
    } else {
        message.textContent = "Computer beginnt!"
        firstPlayerInput.classList.remove("active-input");
        firstPlayerInput.disabled = true;
        secondPlayerInput.disabled = true;
        setTimeout(() => { computerPlays() }, 2000);
    }
    if (matchsticks < 16) {
        message.textContent = "";
    }
}
startButton.addEventListener("click", randomStart);

// Restart Game ---------------------------------------------------------------------------
resetButton.addEventListener("click", function () {
    location.reload();
});

// Deactive Start -------------------------------------------------------------------------
function deactivateStart() {
    startButton.disabled = true;
    startButton.style.backgroundColor = "#ddd"
}

// Remove matchsticks ---------------------------------------------------------------------
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
    if (matchsticks.length - inputValue === 0) {
        message.textContent = "Computer gewonnen!";
        firstPlayerInput.classList.remove("active-input");
        firstPlayerInput.disabled = true;
        secondPlayerInput.disabled = true;
        showFeelings("bad");
    }
    else {
        secondPlayerInput.value = "";
        firstPlayerInput.classList.toggle("active-input");
        message.textContent = "Computer denkt.."
        firstPlayerInput.disabled = true;
        secondPlayerInput.disabled = true;
        setTimeout(() => { computerPlays() }, 2000);
    }
});

function computerPlays() {
    const matchsticks = document.querySelectorAll(".match");
    deactivateStart();
    // (Difficulty : Easy)
    if (matchsticks.length === 3) {
        inputValue = 2;
    }
    else if (matchsticks.length === 2 || matchsticks.length === 1) {
        inputValue = 1;
    }
    else if (matchsticks.length === 4) {
        inputValue = 3;
    }
    else if (matchsticks.length === 6) {
        inputValue = 1;
    }
    /*  (Difficulty : Medium)
   else if (matchsticks.length === 7) {
       inputValue = 2;
   } 
       else if (matchsticks.length === 8) {
       inputValue = 3;
   } 
   */

    else {
        inputValue = Math.ceil(Math.random() * 3) //1,2,3
    };

    secondPlayerInput.value = inputValue;
    
    for (i = 0; i < inputValue; i++) {
        matchContainer.removeChild(matchsticks[i]);
    }
    if (matchsticks.length - inputValue === 0) {
        message.textContent = "Spieler 1 gewonnen!";
        secondPlayerInput.disabled = true;
        showFeelings("good");
    }
    else {
        message.textContent = "Spieler 1";
        firstPlayerInput.classList.toggle("active-input");
        firstPlayerInput.disabled = false;
        secondPlayerInput.disabled = true;
        firstPlayerInput.value = ""
    }

}

// Emoji ---------------------------------------------------------------------------------
function showFeelings(response) {
    allCanvas.forEach((canvas) => {
      const happyctx = (response === "good") ? firstCanvas.getContext("2d") : secondCanvas.getContext("2d"); // response : good => first canvas smiles and vice versa
      const sadctx = (response === "bad") ? firstCanvas.getContext("2d") : secondCanvas.getContext("2d"); // response : bad => first canvas grimaces and vice versa 
  
      const ctx = canvas.getContext("2d"); // getContext returns an object for drawing:
      ctx.beginPath();
      ctx.arc(30, 30, 30, 0, 2 * Math.PI); // circle (x,y,Radius,radian,radian,direction)
      ctx.fillStyle = "#fbdc34";
      ctx.fill();
      ctx.closePath();
  
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
  
      // mouth happy
      happyctx.beginPath();
      happyctx.arc(30, 30, 18, Math.PI / 6, 5 * Math.PI / 6, false); // about 30 to 150 degree // happy
      happyctx.lineWidth = 3;
      happyctx.strokeStyle = '#000';
      happyctx.stroke();
      happyctx.closePath();
  
      // mouth sad
      sadctx.beginPath();
      sadctx.arc(30, 54, 18, Math.PI + Math.PI / 6, 11 * Math.PI / 6, false); // sad
      sadctx.lineWidth = 3;
      sadctx.strokeStyle = '#000';
      sadctx.stroke();
      sadctx.closePath();
    });
  }
