import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a fade-in animation timeline
 * @param {HTMLElement|string} element - Element or selector
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline} GSAP timeline
 */
export const fadeIn = (element, options = {}) => {
  const {
    duration = 1,
    delay = 0,
    ease = 'power2.out',
    scrollTrigger = null,
    ...rest
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: scrollTrigger || undefined,
    ...rest,
  });

  tl.from(element, {
    opacity: 0,
    y: 50,
    duration,
    delay,
    ease,
  });

  return tl;
};

/**
 * Create a stagger animation for multiple elements
 * @param {string} selector - CSS selector for elements
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline} GSAP timeline
 */
export const staggerFadeIn = (selector, options = {}) => {
  const {
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
    ease = 'power2.out',
    scrollTrigger = null,
    ...rest
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: scrollTrigger || undefined,
    ...rest,
  });

  tl.from(selector, {
    opacity: 0,
    y: 30,
    duration,
    stagger,
    delay,
    ease,
  });

  return tl;
};

/**
 * Create a parallax scroll animation
 * @param {HTMLElement|string} element - Element or selector
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline} GSAP timeline
 */
export const parallaxScroll = (element, options = {}) => {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top', ...rest } = options;

  return gsap.to(element, {
    y: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
      ...rest,
    },
  });
};

/**
 * Create a section reveal animation with ScrollTrigger
 * @param {HTMLElement|string} element - Element or selector
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline} GSAP timeline
 */
export const sectionReveal = (element, options = {}) => {
  const {
    duration = 1,
    ease = 'power2.out',
    start = 'top 80%',
    toggleActions = 'play none none reverse',
    ...rest
  } = options;

  return gsap.from(element, {
    opacity: 0,
    y: 100,
    duration,
    ease,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions,
      ...rest,
    },
  });
};

/**
 * Initialize scroll animations for a page
 * @param {Object} config - Configuration object
 */
export const initScrollAnimations = (config = {}) => {
  const { onComplete = null } = config;

  // Refresh ScrollTrigger after page load
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
    if (onComplete) onComplete();
  }
};

/**
 * Cleanup scroll animations
 */
export const cleanupScrollAnimations = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

