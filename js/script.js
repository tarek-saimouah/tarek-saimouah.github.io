import {
  animateLineUp,
  animateSectionContentUp,
} from './scripts/animation.lineUp.js';
import { setAnimationObserver } from './scripts/observer.js';

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
