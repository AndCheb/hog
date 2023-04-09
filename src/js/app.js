'use strict';

const text = [
  'Цель игры — бросая кость, набрать 100 очков. Ход представляет собой серию бросков и заключается в следующем: игрок бросает кость неограниченное число раз и суммирует выпадающие значения. Однако если выпадает единица, вся сумма, набранная за ход, аннулируется и ход переходит к следующему игроку. Игрок может завершить свой ход в любой момент. Желаю удачи!'
];

const addText = function () {
  const pageText = document.querySelector('.main__text');

  let line = 0;
  let count = 0;
  let out = '';

  const addLine = function () {

    const mainPageContent = document.querySelector('.main__info');

    mainPageContent.addEventListener('click', () => {
      clearTimeout(interval);
      document.querySelector('.main__cursor').style.display = 'none';
      pageText.innerHTML = text;
    });

    let interval = setTimeout(function () {
      out += text[line][count];
      pageText.innerHTML = out;
      count++;

      if (count >= text[line].length) {
        count = 0;
        clearTimeout(interval);
        setTimeout(function () {
          document.querySelector('.main__cursor').style.display = 'none';
        }, 2000)
        return true;
      }
      addLine();
    }, getRandomNum(250))
  }

  addLine();
}

const getRandomNum = function (x) {
  return Math.trunc(Math.random() * x);
}

addText();
