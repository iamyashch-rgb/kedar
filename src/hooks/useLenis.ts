import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LenisOptions } from '../types/animation';

gsap.registerPlugin(ScrollTrigger);

export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check system prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: options.duration || 1.2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: options.orientation || 'vertical',
      gestureOrientation: options.gestureOrientation || 'vertical',
      smoothWheel: options.smoothWheel !== undefined ? options.smoothWheel : true,
      wheelMultiplier: options.wheelMultiplier || 1,
      touchMultiplier: options.touchMultiplier || 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options.duration, options.orientation, options.smoothWheel]);

  return lenisRef;
}
