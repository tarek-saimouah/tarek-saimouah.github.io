const texts = ['Full Stack JS Developer.', 'Software Engineer.'];

export const setMorphAnimation = (
  element,
  texts,
  morphTime = 1,
  cooldownTime = 0.25
) => {
  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    element.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    element.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    element.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    element.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    element.innerText = texts[textIndex % texts.length];
    element.innerText = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    element.style.filter = '';
    element.style.opacity = '100%';

    element.style.filter = '';
    element.style.opacity = '0%';
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }
};
