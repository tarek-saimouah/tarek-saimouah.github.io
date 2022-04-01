export const animateLineUp = (element, texts, interval = 4000) => {
  let textIndex = 1;
  setInterval(() => {
    animate(element, texts[textIndex]);

    if (textIndex + 1 < texts.length) textIndex++;
    else textIndex = 0;
  }, 5000);

  function animate(element, text) {
    element.innerText = text;
    element.classList.add('line-up');
    setTimeout(() => {
      element.classList.remove('line-up');
    }, 2500);
  }
};

export const animateSectionContentUp = (section) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        animate(element);
        return;
      }
    });
  });
  observer.observe(section);

  function animate(sectionContent) {
    sectionContent.classList.add('line-up');
    setTimeout(() => {
      sectionContent.classList.remove('line-up');
    }, 2500);
  }
};
