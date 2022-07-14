export default () => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);
  const overlay = document.querySelector(`.overlay`);

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener(`click`, function (evt) {

      if (menuLinks[i].dataset.href.includes(`prize`) && window.location.href.includes(`story`)) {
        overlay.classList.add(`overlay--visible`);

        evt.preventDefault();

        setTimeout(() => {
          window.location.href = `#${menuLinks[i].dataset.href}`;
        }, 500);
      } else {
        overlay.classList.remove(`overlay--visible`);
      }

      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }
    });
  }
};
