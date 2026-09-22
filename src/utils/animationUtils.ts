import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FadeUpOptions {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  scrub?: boolean | number;
}

export function animateFadeUp(
  target: string | HTMLElement,
  options: FadeUpOptions = {}
) {
  const { y = 50, duration = 1, delay = 0, start = 'top 85%', scrub = false } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target as any,
        start,
        scrub,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function animateStaggerList(
  targets: string | HTMLElement[] | NodeListOf<Element>,
  triggerContainer: string | HTMLElement,
  options: { stagger?: number; duration?: number; start?: string } = {}
) {
  const { stagger = 0.15, duration = 0.8, start = 'top 80%' } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerContainer as any,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function animateScaleIn(
  target: string | HTMLElement,
  options: { scaleStart?: number; duration?: number; start?: string } = {}
) {
  const { scaleStart = 0.9, duration = 1.2, start = 'top 85%' } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, scale: scaleStart },
    {
      opacity: 1,
      scale: 1,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target as any,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function animateParallaxBg(
  container: HTMLElement,
  bgElement: HTMLElement,
  speed: number = 0.3
) {
  return gsap.to(bgElement, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
