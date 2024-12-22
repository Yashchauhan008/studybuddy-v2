// src/components/Reveal.js

import gsap from 'gsap';
import SplitType from "split-type";

const revealAnimation = () => {
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((element) => {
    element.style.display = "block";
  });

  const letters = new SplitType(revealElements).chars;

  gsap.from(letters, {
    y: 100,
    rotation: 10,
    duration: 1.5,
    stagger: 0.05,
    ease: "power3.inOut",
  });
};

// Correctly export the function as a named export
export default revealAnimation;
