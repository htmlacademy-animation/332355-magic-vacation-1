export default () => {
  const lazyImages = document.querySelectorAll(`.lazy-image`);
  if (!lazyImages.length) {
    return;
  }

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  };

  const options = {
  // root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: `0px 0px 75px 0px`,
    threshold: 0,
  };

  const observer = new IntersectionObserver(callback, options);

  lazyImages.forEach((image) => observer.observe(image));
};
