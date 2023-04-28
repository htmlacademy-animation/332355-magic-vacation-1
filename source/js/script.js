// modules
import load from './modules/load.js';
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import game from './modules/game.js';
import pageSwitchHandler from './modules/page-switch-handler.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
load();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
game();
pageSwitchHandler();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

// let start = 11;
// let end = 3;

// const duration = 1000;
// let starttime = null;

// const el = document.querySelector(`.prizes__desc`);
// function animateNumber(timestamp) {
//   if (!starttime) {
//     starttime = timestamp;
//   }

//   const runtime = timestamp - starttime;
//   const relativeProgress = runtime / duration;

//   console.log(relativeProgress)

//   end += Math.floor(Math.random() * 50);
//   if (end >= 900) {
//     return;
//   }

//   el.innerHTML = `<b>${end}</b>`;

//   requestAnimationFrame(animateNumber);
// }

// animateNumber();

// общие переменные для реализации точного fps
let fpsInterval = 1000 / 12;
let now;
let then = Date.now();
let elapsed;
let count = 0;
let countBig = 11;
const nodes = Array.from(document.querySelectorAll(`.prizes__count`));

function draw() {
  nodes.forEach((node, i) => {
    if (i === 1 && count < 7) {
      count++;
      node.textContent = count;
    }

    if (i === 2) {
      setTimeout(() => {
        node.textContent = countBig;
        countBig += Math.floor(Math.random() * 120);
        if (countBig > 900) {
          countBig = 900;
        }
      }, 1000);
    }
  });
}

function startCounter() {
  // отправляем на отрисовку следующий кадр
  requestAnimationFrame(startCounter);

  // проверяем, сколько времени прошло с предыдущего запуска
  now = Date.now();
  elapsed = now - then;

  // проверяем, достаточно ли прошло времени с предыдущей отрисовки кадра
  if (elapsed > fpsInterval) {
    // сохранение времени текущей отрисовки кадра
    then = now - (elapsed % fpsInterval);

    // запуск функции отрисовки
    draw();
  }
}

requestAnimationFrame(startCounter);
