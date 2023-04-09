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
let machineMove;

const opacity = () => {
  firstPlayer.classList.toggle('opacity');
  secondPlayer.classList.toggle('opacity');
}

const btnToggle = bool => {
  if (bool) {
    btnNextMove.classList.add('hidden');
    btnFixsing.classList.add('hidden');
  } else {
    btnNextMove.classList.remove('hidden');
    btnFixsing.classList.remove('hidden');
  }
}

const numberOne = () => {
  firstPlayerMove = !firstPlayerMove;
  dice = 0;
  currentScore2.textContent = 0;
  secondPlayerCurrentScore = 0;
  currentScore1.textContent = 0;
  firstPlayerCurrentScore = 0;
  opacity();
}

const machineFixed = () => {
  secondPlayerTotalScore += secondPlayerCurrentScore;
  totalScore2.textContent = secondPlayerTotalScore;
  currentScore2.textContent = 0;
  secondPlayerCurrentScore = 0;
  btnToggle(false);
  firstPlayerMove = !firstPlayerMove;
  dice = 0;
  opacity();
}

const machineGame = () => {
  dice = dice ? Math.trunc(Math.random() * 6 + 1) : Math.trunc(Math.random() * 5 + 2);
  img.src = `./src/img/dice/dice-${dice}.svg`;

  secondPlayerCurrentScore += dice;
  currentScore2.textContent = secondPlayerCurrentScore;

  if (dice == 1) {
    numberOne();
    clearInterval(machineMove);
    btnToggle(false);
  }

  if ((secondPlayerCurrentScore + secondPlayerTotalScore) > 99) {
    clearInterval(machineMove);
    endGame();
    secondPlayer.classList.add('winner');
    opacity();
    secondPlayerTotalScore += secondPlayerCurrentScore;
    totalScore2.textContent = secondPlayerTotalScore;
    currentScore2.textContent = 0;
  }

  if (secondPlayerCurrentScore >= 25 && secondPlayerTotalScore < 50 && firstPlayerTotalScore < 85) {
    clearInterval(machineMove);
    setTimeout(function () {
      machineFixed();
    }, 1200);
  }

  if (secondPlayerCurrentScore >= 15 && secondPlayerTotalScore >= 50 && firstPlayerTotalScore < 85
    && (secondPlayerCurrentScore + secondPlayerTotalScore < 90)) {
    clearInterval(machineMove);
    setTimeout(function () {
      machineFixed();
    }, 1200);
  }
}

btnNextMove.addEventListener('click', () => {
  dice = dice ? Math.trunc(Math.random() * 6 + 1) : Math.trunc(Math.random() * 5 + 2);
  img.src = `./src/img/dice/dice-${dice}.svg`;
  if (dice == 1) numberOne();

  if (firstPlayerMove) {
    firstPlayerCurrentScore += dice;
    currentScore1.textContent = firstPlayerCurrentScore;
    if ((firstPlayerCurrentScore + firstPlayerTotalScore) > 99) {
      fixScore();
      endGame();
      firstPlayer.classList.add('winner');
    }
  } else {
    btnToggle(true);
    machineMove = setInterval(machineGame, 1000);
  }
});

const fixScore = () => {
  btnToggle(true);
  firstPlayerMove = !firstPlayerMove;
  dice = 0;
  firstPlayerTotalScore += firstPlayerCurrentScore;
  totalScore1.textContent = firstPlayerTotalScore;
  currentScore1.textContent = 0;
  firstPlayerCurrentScore = 0;
  opacity();

  if (firstPlayerTotalScore < 100) {
    machineMove = setInterval(machineGame, 1000);
  }
}

btnFixsing.addEventListener('click', fixScore);

const endGame = () => {
  opacity();
  btnToggle(true);
  img.src = `./src/img/star/star.svg`;
}

btnNewGame.addEventListener('click', () => {
  clearInterval(machineMove);
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
  btnToggle(false);
});
