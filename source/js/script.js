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
import Scene2DSeaCalf from './scene-2d-sea-calf.js';

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


const scene = new Scene2DSeaCalf();

