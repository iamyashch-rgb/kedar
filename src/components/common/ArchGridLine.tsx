import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ArchGridOverlayProps {
  columns?: 2 | 3 | 4 | 6 | 12;
  className?: string;
  showCrosshairs?: boolean;
}

export const ArchGridOverlay: React.FC<ArchGridOverlayProps> = ({
  columns = 4,
  className,
  showCrosshairs = true,
}) => {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    6: 'grid-cols-3 md:grid-cols-6',
    12: 'grid-cols-4 md:grid-cols-12',
  }[columns];

  return (
    <div
      className={twMerge(
        clsx(
          'absolute inset-0 pointer-events-none z-0 max-w-[var(--container-wide)] mx-auto px-4 md:px-8',
          className
        )
      )}
      aria-hidden="true"
    >
      <div className={clsx('h-full w-full grid border-x border-[var(--color-grid-line)]', colClass)}>
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-[var(--color-grid-line)] relative"
          >
            {showCrosshairs && i === 0 && (
              <>
                <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[var(--color-earth-accent)] font-mono text-xs opacity-60">
                  +
                </span>
                <span className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-[var(--color-earth-accent)] font-mono text-xs opacity-60">
                  +
                </span>
              </>
            )}
            {showCrosshairs && i === columns - 1 && (
              <>
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[var(--color-earth-accent)] font-mono text-xs opacity-60">
                  +
                </span>
                <span className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-[var(--color-earth-accent)] font-mono text-xs opacity-60">
                  +
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export interface ArchHairlineProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'subtle' | 'medium' | 'strong' | 'accent';
  className?: string;
  label?: string;
  animateOnScroll?: boolean;
}

export const ArchHairline: React.FC<ArchHairlineProps> = ({
  orientation = 'horizontal',
  variant = 'subtle',
  className,
  label,
  animateOnScroll = false,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateOnScroll || !lineRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (orientation === 'horizontal') {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );
      } else {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, lineRef);

    return () => ctx.revert();
  }, [animateOnScroll, orientation]);

  const colorMap = {
    subtle: 'bg-[var(--color-border-stone)]',
    medium: 'bg-[var(--color-border-medium)]',
    strong: 'bg-[var(--color-concrete-mid)]',
    accent: 'bg-[var(--color-earth-accent)]',
  };

  if (orientation === 'vertical') {
    return (
      <div
        ref={lineRef}
        className={twMerge(
          clsx('w-px h-full shrink-0 origin-top', colorMap[variant], className)
        )}
      />
    );
  }

  if (label) {
    return (
      <div className={twMerge(clsx('flex items-center gap-4 w-full my-6', className))}>
        <div ref={lineRef} className={clsx('h-px flex-1 origin-left', colorMap[variant])} />
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--color-concrete-light)] opacity-70 shrink-0">
          {label}
        </span>
        <div className={clsx('h-px flex-1', colorMap[variant])} />
      </div>
    );
  }

  return (
    <div
      ref={lineRef}
      className={twMerge(
        clsx('h-px w-full shrink-0 origin-left', colorMap[variant], className)
      )}
    />
  );
};
