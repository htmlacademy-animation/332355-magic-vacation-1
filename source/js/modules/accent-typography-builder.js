export default class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
      timeOffsetDelta = 20
  ) {

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;

    this._element = typeof this._elementSelector === `string` ? document.querySelector(this._elementSelector) : this._elementSelector;

    this._timeOffset = 0;
    this._timeOffsetDelta = timeOffsetDelta;

    this.prepareText(timeOffsetDelta);
  }


  createElement(letter, delta) {
    const span = document.createElement(`span`);

    span.textContent = letter;
    span.style.transition = this.getTransition();
    this._timeOffset += delta;

    return span;
  }


  getTransition() {
    return `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
  }

  prepareText(delta) {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(/[\s]+/);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createElement(letter, delta));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`title__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
