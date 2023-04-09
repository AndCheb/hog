'use strict';

const img = document.querySelector('.main__img');
const currentScore1 = document.querySelector('.main__current-score-1');
const currentScore2 = document.querySelector('.main__current-score-2');
const totalScore1 = document.querySelector('.main__total-score-1');
const totalScore2 = document.querySelector('.main__total-score-2');
const firstPlayer = document.querySelector('.main__player-1');
const secondPlayer = document.querySelector('.main__player-2');

const btnNewGame = document.querySelector('.header__button');
const btnNextMove = document.querySelector('.main__button-dice');
const btnFixsing = document.querySelector('.main__button-pass');

let firstPlayerMove = true;
let dice = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;
let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;

const opacity = () => {
  firstPlayer.classList.toggle('opacity');
  secondPlayer.classList.toggle('opacity');
}

btnNextMove.addEventListener('click', () => {
  dice = dice ? Math.trunc(Math.random() * 6 + 1) : Math.trunc(Math.random() * 5 + 2);

  img.src = `./src/img/dice/dice-${dice}.svg`;

  if (dice == 1) {
    firstPlayerMove = !firstPlayerMove;
    dice = 0;
    currentScore2.textContent = 0;
    currentScore1.textContent = 0;
    firstPlayerCurrentScore = 0;
    secondPlayerCurrentScore = 0;
    opacity();
  }

  if(firstPlayerMove) {
    firstPlayerCurrentScore += dice;
    currentScore1.textContent = firstPlayerCurrentScore;
  } else {
    secondPlayerCurrentScore += dice;
    currentScore2.textContent = secondPlayerCurrentScore;
  }
});

btnFixsing.addEventListener('click', () => {
  dice = 0;
  opacity();
  if (firstPlayerMove) {
    firstPlayerTotalScore += firstPlayerCurrentScore;
    totalScore1.textContent = firstPlayerTotalScore;
    currentScore1.textContent = 0;
    firstPlayerCurrentScore = 0;
    if (firstPlayerTotalScore >= 100) {
      endGame();
      firstPlayer.classList.add('winner');
    }
  } else {
    secondPlayerTotalScore += secondPlayerCurrentScore;
    totalScore2.textContent = secondPlayerTotalScore;
    currentScore2.textContent = 0;
    secondPlayerCurrentScore = 0;
    if (secondPlayerTotalScore >= 100) {
      endGame();
      secondPlayer.classList.add('winner');
    }
  }
  firstPlayerMove = !firstPlayerMove;
});

const endGame = () => {
  opacity();
  btnNextMove.disabled = true;
  btnFixsing.disabled = true;
  img.src = `./src/img/star/star.svg`;
}

btnNewGame.addEventListener('click', () => {
  dice = 0;
  firstPlayerMove = true;
  firstPlayerTotalScore = 0;
  secondPlayerTotalScore = 0;
  firstPlayerCurrentScore = 0;
  secondPlayerCurrentScore = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  totalScore1.textContent = 0;
  totalScore2.textContent = 0;
  firstPlayer.classList.remove('opacity');
  secondPlayer.classList.add('opacity');
  img.src = `./src/img/dice/dices.svg`;
  firstPlayer.classList.remove('winner');
  secondPlayer.classList.remove('winner');
  btnNextMove.disabled = false;
  btnFixsing.disabled = false;
});
