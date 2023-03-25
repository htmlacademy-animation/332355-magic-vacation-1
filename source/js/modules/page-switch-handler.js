import AccentTypographyBuild from './accent-typography-builder';
import observer from './observer';

export default () => {
  document.querySelectorAll(`.title`).forEach((title) => {
    const text = new AccentTypographyBuild(title, 500, `active`, `transform`);

    document.body.addEventListener(`screenChanged`, (evt) => {
      text.destroyAnimation();
      setTimeout(() => {
        text.runAnimation();
      }, 500);
      if (evt.detail.screenName.includes(`prize`)) {
        observer();
      }
    });
  });
};
