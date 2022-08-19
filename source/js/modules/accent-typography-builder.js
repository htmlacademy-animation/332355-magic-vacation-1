export default class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
  ) {

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;

    this._element = typeof this._elementSelector === `string` ? document.querySelector(this._elementSelector) : this._elementSelector;

    this._timeOffset = 120;

    this.prepareText();
  }


  createElement(letter, letterIndex, wordIndex) {
    const span = document.createElement(`span`);

    span.textContent = letter;
    span.style.transition = this.getTransition();

    if (letterIndex % 3 === 0) {
      this._timeOffset = 90;
    }

    if (letterIndex % 3 === 1) {
      this._timeOffset = 20;
    }

    if (letterIndex % 3 === 2) {
      this._timeOffset = 60;
    }

    console.log(wordIndex)
    if (wordIndex > 0) {
      this._timeOffset = this._timeOffset + 200;
      
    }

    
    return span;
  }


  getTransition() {
    return `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
  }

  prepareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(/[\s]+/);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, letter, letterIndex) => {
        fragment.appendChild(this.createElement(letter, letterIndex, wordIndex));
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
