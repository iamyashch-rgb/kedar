import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export type CursorMode = 'default' | 'button' | 'link' | 'image' | 'property' | 'project';

export const ArchitecturalCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const visibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if current device is touch or mobile/tablet
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const noHover = window.matchMedia('(hover: none)').matches;
      const isMobileWidth = window.innerWidth < 1024;
      return isCoarse || noHover || isMobileWidth;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    // GSAP quickTo setters for 60fps hardware-accelerated interpolation
    const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.15, ease: 'power2.out' });
    const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.15, ease: 'power2.out' });
    const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
    const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    // Event delegation for contextual target hover inspection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check specific data-cursor attributes first
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'project') {
        setMode('project');
        setLabel('VIEW PROJECT');
        return;
      }
      if (cursorAttr === 'property') {
        setMode('property');
        setLabel('EXPLORE');
        return;
      }
      if (cursorAttr === 'image') {
        setMode('image');
        setLabel('VIEW');
        return;
      }

      // Check semantic tags
      if (target.closest('button, [role="button"], .btn')) {
        setMode('button');
        setLabel('');
        return;
      }

      if (target.closest('a')) {
        setMode('link');
        setLabel('');
        return;
      }

      if (target.closest('img')) {
        setMode('image');
        setLabel('VIEW');
        return;
      }

      // Reset to default
      setMode('default');
      setLabel('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Do not render on mobile / tablet / touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[500] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Inner Architectural Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-earth-accent)] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(194,109,71,0.9)]"
      />

      {/* Outer Floating Ring & Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[var(--color-earth-accent)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] ${
          mode === 'default'
            ? 'w-8 h-8 border-opacity-40 bg-transparent'
            : mode === 'button'
            ? 'w-12 h-12 bg-[var(--color-earth-accent-muted)] border-opacity-80 scale-110'
            : mode === 'link'
            ? 'w-10 h-10 border-opacity-70 bg-transparent scale-105'
            : 'w-24 h-24 bg-black/80 border-opacity-90 shadow-2xl scale-100'
        }`}
      >
        {/* Label Badge Text */}
        {label && (
          <span className="font-mono text-[9px] font-bold text-white uppercase tracking-widest text-center px-1 animate-fade-in">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
