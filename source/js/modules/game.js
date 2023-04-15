import {timer} from "./timer";

export default () => {
  const btn = document.querySelector(`.rules__link`);
  btn.addEventListener(`click`, timer);

  window.addEventListener(`load`, () => {
    timer();
  });
};
