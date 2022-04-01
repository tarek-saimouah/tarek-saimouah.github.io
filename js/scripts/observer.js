export const setAnimationObserver = (target) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      const name = element.id.substr(
        element.id.lastIndexOf('-') + 1,
        element.id.length
      );

      const animationClass = `progress-animation-${name}`;

      if (entry.isIntersecting) {
        element.classList.add(animationClass);
        return; // if we added the class, exit the function
      }
      // We're not intersecting, so remove the class!
      element.classList.remove(animationClass);
    });
  });

  document.querySelectorAll(target).forEach((i) => {
    if (i) {
      observer.observe(i);
    }
  });
};
