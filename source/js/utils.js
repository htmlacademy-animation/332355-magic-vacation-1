export function cleanElementClass(el, className) {
  const elClassName = el.className;
  const classes = elClassName.split(` `).filter((item) => item.includes(`${className}`));
  if (classes.length) {
    el.classList.remove(classes);
  }
}

export function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

function easeLinear(x) {
  return x;
}


function easeInCubic(x) {
  return x * x * x;
}


function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}


function easeInExpo(x) {
  if (x === 0) {
    return 0;
  } else {
    return Math.pow(2, 10 * x - 10);
  }
}


function easeOutExpo(x) {
  if (x === 1) {
    return 1;
  } else {
    return 1 - Math.pow(2, -10 * x);
  }
}


function easeInElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
}


function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}


const _ = Object.freeze({
  easeLinear,
  easeInCubic,
  easeOutCubic,
  easeInExpo,
  easeOutExpo,
  easeInElastic,
  easeOutElastic
});


export default _;