export default () => {
  const body = document.querySelector(`body`);

  function handleDocumentLoad() {
    body.classList.add(`loaded`);

  }

  window.addEventListener(`load`, handleDocumentLoad);
};
