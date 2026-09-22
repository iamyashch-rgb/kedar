import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      animationCallback(ctx);
    }, containerRef);

    return () => {
      ctx.revert(); // Clean up all GSAP timelines and ScrollTriggers inside container
    };
  }, deps);

  return containerRef;
}
