export const animateLineUp = (element, texts, interval = 4000) => {
  let textIndex = 1;
  const descriptionText =
    document.getElementsByClassName('description-text')[0];

  setInterval(() => {
    // set description-text inner text to 'I am an' when description is equal 'Android Developer'
    if (textIndex === 1) {
      descriptionText.innerText = 'I am an';
    } else {
      descriptionText.innerText = 'I am a';
    }

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
        observer.disconnect();
        return;
      }
    });
  });
  observer.observe(section);

  function animate(sectionContent) {
    sectionContent.classList.add('section-content-up');
    setTimeout(() => {
      sectionContent.classList.remove('section-content-up');
    }, 2000);
  }
};
