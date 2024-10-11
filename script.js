'use strict';

const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currnt0El = document.querySelector('#current--0');
const currnt1El = document.querySelector('#current--1');

// btn
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let crntScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0];
  crntScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currnt0El.textContent = 0;
  currnt1El.textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      crntScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        crntScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += crntScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

const switchPlayer = function () {
  crntScore = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle('player--active');
  player1E1.classList.toggle('player--active');
};
