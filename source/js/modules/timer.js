import {formatNumber} from "../utils";
export default () => {
  const COUNT = 5;
  // eslint-disable-next-line no-unused-vars
  let done = false;
  let start = new Date();
  const STOP = start.setMinutes(start.getMinutes() + COUNT);
  const counterNode = document.querySelector(`.game__counter`);

  function checkDate() {
    const NOW = new Date().getTime();
    let remain = STOP - NOW;

    if (remain < 0) {
      done = true;
      window.cancelAnimationFrame(checkDate);
      return;
    }

    let min = Math.floor(remain / 1000 / 60) % 60;
    let sec = Math.floor(remain / 1000) % 60;
    counterNode.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;

    window.requestAnimationFrame(checkDate);

  }

  requestAnimationFrame(checkDate);
};
