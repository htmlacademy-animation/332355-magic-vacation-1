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

export function startCounter() {
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