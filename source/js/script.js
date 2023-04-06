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
pageSwitchHandler();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const count = 5;
let start = new Date();
  // получаем время окончания таймера
const stop = start.setMinutes(start.getMinutes() + count); 
let previousTimeStamp;
let done = false;
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');


function checkDate(timestamp) {
  
  if (start === undefined) {
    start = timestamp;
  }
  // const elapsed = timestamp - start;
  if (previousTimeStamp !== timestamp) {
    const now = new Date().getTime();
    let remain = stop - now;
  
    if (remain < 0) {
      done = true 
    }

    if (done) {
      window.cancelAnimationFrame(checkDate)
    }


    if (!done) {
      second.textContent = Math.floor(remain / 1000) % 60
      minute.textContent = Math.floor(remain / 1000 / 60) % 60 

      window.requestAnimationFrame(checkDate);
    }

    // if (elapsed < 2000) {
    //   // Stop the animation after 2 seconds
    //   previousTimeStamp = timestamp;
    //   if (!done) {
    //     window.requestAnimationFrame(checkDate);
    //   }
    // }
  }
}

requestAnimationFrame(checkDate)