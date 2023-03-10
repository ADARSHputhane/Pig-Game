"use strict";

//seclecting the elemets
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1"); // get element my id id more faster but can be done in multiple wasys
const diceEl = document.querySelector(".dice");
const btnNEw = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

var scores, currentScore, activePlayer, playing;
//Starting Condition

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display the random number dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; // we can directly add and chance the html src element.
    //3. Check for rolled 1 : if true, switch to nect player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swithc to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if the player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnNEw.addEventListener("click", init);
