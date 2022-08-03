import AccentTypographyBuild from './accent-typography-builder';

export default () => {
  document.querySelectorAll(`.title`).forEach((title) => {
    const text = new AccentTypographyBuild(title, 500, `active`, `transform`);

    document.body.addEventListener(`screenChanged`, () => {
      text.destroyAnimation();
      setTimeout(() => {
        text.runAnimation();
      }, 500);
    });
  });
};
