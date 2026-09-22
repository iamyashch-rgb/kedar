import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (barRef.current) {
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[300] h-[2.5px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="w-full h-full bg-[var(--color-earth-accent)] origin-left shadow-[0_0_8px_rgba(194,109,71,0.8)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
