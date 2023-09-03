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
import {startCounter} from './modules/counter.js';
import pageSwitchHandler from './modules/page-switch-handler.js';
import FullPageScroll from './modules/full-page-scroll';
import ResultScene from './animation/result-scene.js';

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

const resultScene = new ResultScene({
  canvas: `#sea-calf`,
});

// requestAnimationFrame(startCounter);

function initEventListeners() {
  window.addEventListener(`resize`, () => {
    resultScene.updateSceneSizing();
    resultScene.drawScene();
  });
}

initEventListeners()
resultScene.startAnimation()

// resultScene.drawScene();
