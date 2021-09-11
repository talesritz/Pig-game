'use strict';

const newGameBtn = document.querySelector('.btn--new'),
  rollDiceBtn = document.querySelector('.btn--roll'),
  holdBtn = document.querySelector('.btn--hold'),
  dice = document.querySelector('.dice'),
  player1 = document.querySelector('.player--0'),
  player2 = document.querySelector('.player--1');
let scorePoints = 0;
let currentPlayer = 'player--0';

// console.log((player1.children[1].textContent = 100));

const resetPage = function () {
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  currentPlayer = 'player--0';
  dice.src = 'dice-1.png';
  scorePoints = 0;
};

//Show how many points you got stored in the current block for either player
const currentScore = function (player, diceNum) {
  scorePoints += diceNum;
  if (player === 'player--0') {
    document.querySelector('#current--0').textContent = scorePoints;
  } else {
    document.querySelector('#current--1').textContent = scorePoints;
  }
};

//Switches overlays from player 1 to player 2
const switchPlayer = function (player) {
  if (player === 'player--0') {
    document.querySelector('#current--0').textContent = 0;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    currentPlayer = 'player--1';
  } else {
    document.querySelector('#current--1').textContent = 0;
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    currentPlayer = 'player--0';
  }
  scorePoints = 0;
};

const hold = function () {
  let p1Score = Number(player1.children[1].textContent);
  let p2Score = Number(player2.children[1].textContent);

  if (currentPlayer === 'player--0') {
    p1Score += scorePoints;
    if (p1Score >= 100) {
      document.querySelector('#score--0').textContent = 100;
      document.querySelector('#name--0').textContent = 'YOU WON!';
    } else {
      document.querySelector('#score--0').textContent = p1Score;
      switchPlayer(currentPlayer);
    }
  } else {
    p2Score += scorePoints;
    if (p2Score >= 100) {
      document.querySelector('#score--1').textContent = 100;
      document.querySelector('#name--1').textContent = 'YOU WON!';
    } else {
      document.querySelector('#score--1').textContent = p2Score;
      switchPlayer(currentPlayer);
    }
  }
  console.log(p1Score, p2Score);
};

//function responsible for sorting numbers, showing the new dice on the page and calling other functions to manipulate current points and score points
const rollDice = function () {
  let randomNum = Math.trunc(Math.random() * 6) + 1;

  //   console.log(randomNum);

  switch (randomNum) {
    case 1:
      dice.src = 'dice-1.png';
      if (currentPlayer === 'player--0') {
        switchPlayer(currentPlayer);
        currentPlayer = 'player--1';
      } else {
        switchPlayer(currentPlayer);
        currentPlayer = 'player--0';
      }
      break;
    case 2:
      dice.src = 'dice-2.png';
      currentScore(currentPlayer, randomNum);
      break;
    case 3:
      dice.src = 'dice-3.png';
      currentScore(currentPlayer, randomNum);
      break;
    case 4:
      dice.src = 'dice-4.png';
      currentScore(currentPlayer, randomNum);
      break;
    case 5:
      dice.src = 'dice-5.png';
      currentScore(currentPlayer, randomNum);
      break;
    case 6:
      dice.src = 'dice-6.png';
      currentScore(currentPlayer, randomNum);
      break;
  }
};

newGameBtn.addEventListener('click', resetPage);
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
