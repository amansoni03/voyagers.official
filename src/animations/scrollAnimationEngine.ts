/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollAnimationConfig {
  mode?: 'cinematic-flip' | 'royal-roll' | 'subtle';
}

export function initScrollTransitions(config: ScrollAnimationConfig = { mode: 'cinematic-flip' }) {
  // Check prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  // Kill previous triggers cleanly
  ScrollTrigger.getAll().forEach((st) => st.kill());

  const intensityMultiplier = config.mode === 'subtle' ? 0.6 : 1.0;

  // 1. Hardware-Accelerated 3D Section Roll / Flip Entrance
  const sections = document.querySelectorAll<HTMLElement>('.scroll-3d-section');
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        rotateX: 12 * intensityMultiplier,
        transformPerspective: 1200,
        transformOrigin: 'center top',
        scale: 0.97,
        opacity: 0.4,
        y: 40,
        force3D: true,
      },
      {
        rotateX: 0,
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
      }
    );
  });

  // 2. 3D Card Flip Stagger (Achievements, Events, Team, Gallery)
  const staggerContainers = document.querySelectorAll<HTMLElement>('.scroll-stagger-flip');
  staggerContainers.forEach((container) => {
    const cards = container.children;
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        rotateX: 22 * intensityMultiplier,
        rotateY: -8 * intensityMultiplier,
        transformPerspective: 1000,
        transformOrigin: 'top center',
        y: 50,
        opacity: 0,
        scale: 0.94,
        force3D: true,
      },
      {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
      }
    );
  });

  // 3. 3D Roll-in for Royal Headings and Badges
  const rollHeadings = document.querySelectorAll<HTMLElement>('.scroll-roll-heading');
  rollHeadings.forEach((heading) => {
    gsap.fromTo(
      heading,
      {
        rotateX: -25 * intensityMultiplier,
        transformPerspective: 1000,
        transformOrigin: 'top center',
        y: -24,
        opacity: 0,
        force3D: true,
      },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: heading,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
      }
    );
  });

  // 4. 3D Flip Reveal for Showcase Images
  const flipImages = document.querySelectorAll<HTMLElement>('.scroll-flip-image');
  flipImages.forEach((imgWrap) => {
    gsap.fromTo(
      imgWrap,
      {
        rotateY: 16 * intensityMultiplier,
        transformPerspective: 1200,
        transformOrigin: 'left center',
        scale: 0.94,
        opacity: 0.3,
        force3D: true,
      },
      {
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: imgWrap,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
      }
    );
  });

  // Refresh triggers on layout changes
  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
