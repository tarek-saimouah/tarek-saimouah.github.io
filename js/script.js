import {
  animateLineUp,
  animateSectionContentUp,
} from './scripts/animation.lineUp.js';
import { setAnimationObserver } from './scripts/observer.js';
import { submitForm } from './scripts/form.submit.js';

// description text animation in intro section
const description = document.getElementById('description');
const descriptionTexts = [
  'Full Stack JS Developer.',
  'Android Developer',
  'Software Engineer',
];

animateLineUp(description, descriptionTexts);

// section content animation in skills section
const skillsSectionContent =
  document.getElementsByClassName('skills-section')[0];
animateSectionContentUp(skillsSectionContent);

/*
// projects content animation in skills section
const projectsSectionContent =
  document.getElementsByClassName('projects-section')[0];
animateSectionContentUp(projectsSectionContent);
*/

// skills progress-bar animation in skills section
let target = '.progress-bar';
setAnimationObserver(target);

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navbar').style.top = '0';
  } else {
    document.getElementById('navbar').style.top = '-75px';
  }
  prevScrollpos = currentScrollPos;
};

// Footer copyright text
const copyright = document.getElementById('copyright');
copyright.innerHTML =
  `© ${new Date().getFullYear()} Copyright: ` + copyright.innerHTML;

// Contact Me Form submit
const contactMeForm = document.getElementById('contact-me-form');
contactMeForm.addEventListener('submit', submitForm);
