
// calf canvas animation
import {bezierEasing} from '../helpers/cubic-bezier';
import {animateDuration, animateEasing} from '../helpers/animate';
import {runSerial, runSerialLoop} from '../helpers/promise';


let ww;
let wh;
let wFactor;
let hFactor;


export default class ResultScene {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.calfImg = new Image();
    // this.snowFlakeLeft = new Image();
    // this.snowFlakeRight = new Image();
    // this.plane = new Image();
    // this.treeLeft = new Image();
    // this.treeRight = new Image();
    // this.planeBack = new Image();

    this.isMobile = false;
    this.isAnimated = false;

    this.startAnimations = [];

    this.loadingCounter = 0;

    this.calfWidth;
    this.calfHeight;
    this.calfL; // Left
    this.calfT; // Top

    this.cloudsOpacity = 0;

    this.sceneX = 0;
    this.sceneY = 0;
    this.sceneAngle = 0;

    this.initEventListeners();
    this.updateSceneSizing();
    this.loadImages();
  }

  initEventListeners() {
    this.calfImg.onload = () => {
      this.increaseLoadingCounter();
    };
  }

  updateSceneSizing() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    wFactor = window.innerWidth / 1440;
    hFactor = window.innerHeight / 760;

    this.isMobile = ww <= 600;

    this.updateCalfSizing();
  }

  updateCalfSizing() {
    let factor = wFactor;

    if (this.isMobile) {
      factor *= 1.5;
    }

    this.calfWidth = Math.round(880 * factor);
    this.calfHeight = Math.round(this.calfWidth * 295 / 783);
    this.calfL = Math.round((ww - this.calfWidth) / 2);

    if (this.isMobile) {
      this.calfT = Math.round((wh - this.calfHeight) / 2 - 120 * factor);
    } else {
      this.calfT = Math.round((wh - this.calfHeight) / 2 + 17 * factor);
    }
  }

  loadImages() {

    // this.calfImg.addEventListener(`load`, () => {
    //   this.ctx.drawImage(this.calfImg, 220, 150, 300, 300);
    // }, false);
    this.calfImg.src = `/img/seacalf.png`;
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    // if (this.loadingCounter === 7) {
    //   this.drawScene();
    // }
    this.drawScene();
  }

  drawScene() {
    this.canvas.width = ww;
    this.canvas.height = wh;

    this.ctx.clearRect(0, 0, ww, wh);

    if (this.isAnimated) {

      this.ctx.globalAlpha = this.cloudsOpacity;
      this.drawCalf();
    }
  }

  drawCalf() {
    this.ctx.globalAlpha = 1;
    this.ctx.translate(this.sceneX * wFactor, this.sceneY * wFactor);
    this.rotateCtx(this.sceneAngle, ww / 2, wh / 2);
    this.ctx.drawImage(this.calfImg, this.calfL, this.calfT, this.calfWidth, this.calfHeight);
  }

  resetCalf() {
    // Чтобы избежать мелькания картинки в самом первом рендере,
    // сразу перемещает кита за край экрана
    this.sceneY = 1180;
  }

  animateCalfShow() {
    const calfXAnimationTick = (progress) => {
      const from = 1180;
      const to = 50;

      this.sceneX = from + progress * (to - from);
    };

    animateEasing(calfXAnimationTick, 3900, bezierEasing(0.11, 0.26, 0, 1));
  }

  animateCalfInfinite() {
    const calfYAnimationTick = (from, to) => (progress) => {
      this.sceneY = from + progress * (to - from);
    };

    const calfPeriod = 6000;
    const symmetricalEase = bezierEasing(0.33, 0, 0.67, 1);

    const calfYFrom = 80;
    const calfYTo = 0;
    const calfYAnimations = [
      () => animateEasing(calfYAnimationTick(calfYFrom, calfYTo), calfPeriod * 0.52, symmetricalEase),
      () => animateEasing(calfYAnimationTick(calfYTo, calfYFrom), calfPeriod * 0.48, symmetricalEase),
    ];

    runSerialLoop(calfYAnimations);

    const calfAngleAnimationTick = (from, to) => (progress) => {
      this.sceneAngle = from + progress * (to - from);
    };

    const calfAnglePhase = calfPeriod * 0.25;
    const calfAngleStart = 0;
    const calfAngleFrom = 5;
    const calfAngleTo = -3;
    const calfAngleAnimations = [
      () => animateEasing(calfAngleAnimationTick(calfAngleFrom, calfAngleTo), calfPeriod * 0.5, symmetricalEase),
      () => animateEasing(calfAngleAnimationTick(calfAngleTo, calfAngleFrom), calfPeriod * 0.5, symmetricalEase),
    ];

    // Создаёт разницу фаз между колебаниями вверх-вниз и колебаниями угла наклона корпуса кита
    animateEasing(calfAngleAnimationTick(calfAngleStart, calfAngleFrom), calfAnglePhase, symmetricalEase)
      .then(() => {
        runSerialLoop(calfAngleAnimations);
      });

    const calfFinAnimationTick = (from, to) => (progress) => {
      this.finAngle = from + progress * (to - from);
    };

    const calfFinAnimations = [
      () => animateEasing(calfFinAnimationTick(26, 3), calfPeriod * 0.39, bezierEasing(0.33, 0, 0.33, 1)),
      () => animateEasing(calfFinAnimationTick(3, 26), calfPeriod * 0.61, bezierEasing(0.46, 0, 0.67, 1)),
    ];

    runSerialLoop(calfFinAnimations);

    // Все движения второстепенных частей кроме плавника сдвигаем на одну небольшую величину.
    // Так словно эти части увлекаются движением корпуса и немного от него отстают.
    const calfSecondaryPartsPhase = calfPeriod * 0.06;

    const calfTailAnimationTick = (from, to) => (progress) => {
      this.tailAngle = from + progress * (to - from);
    };

    const calfTailAnimations = [
      () => animateEasing(calfTailAnimationTick(-20, 7), calfPeriod * 0.54, symmetricalEase),
      () => animateEasing(calfTailAnimationTick(7, -20), calfPeriod * 0.46, symmetricalEase),
    ];

    animateEasing(calfTailAnimationTick(-19, -20), calfSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(calfTailAnimations);
      });
  }

  reset() {
    this.resetCalf();
  }

  resetCalf() {
    // Чтобы избежать мелькания картинки в самом первом рендере,
    // сразу перемещает кита за край экрана
    this.sceneX = 1180;
  }

  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 6000)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }

  rotateCtx(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  }


  startAnimation(options) {
    this.reset();

    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = (globalProgress) => {
        const showCalfAnimationDelay = 0;

        if (globalProgress >= showCalfAnimationDelay && this.startAnimations.indexOf(showCalfAnimationDelay) < 0) {
          this.startAnimations.push(showCalfAnimationDelay);

          this.animateCalfShow();
          this.animateCalfInfinite();
          this.startAnimationInfinite();
        }
      };

      animateDuration(globalAnimationTick, 3900);
    }
  }
}


