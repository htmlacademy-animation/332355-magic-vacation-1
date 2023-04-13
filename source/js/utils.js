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
