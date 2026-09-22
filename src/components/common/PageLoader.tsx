import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArchGridOverlay } from './ArchGridLine';
import logoIconImg from '../../assets/photo/logo-icon-transparent.png';

export const PageLoader: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsDone(true);
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // Lock body scroll during initial load animation
    document.body.style.overflow = 'hidden';

    // Fast CAD loading sequence (target ~0.8s)
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 25) + 15;
        return next > 100 ? 100 : next;
      });
    }, 25);

    // Hard safety fallback (1.8s max timeout guard)
    const fallbackTimer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            setIsDone(true);
            window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
          },
        });

        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.25,
          ease: 'power2.inOut',
        })
          .to('.loader-text-item', {
            opacity: 0,
            y: -15,
            duration: 0.25,
            stagger: 0.04,
            ease: 'power2.in',
          })
          .to(overlayRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.inOut',
          });
      }, overlayRef);

      return () => ctx.revert();
    }
  }, [loadingProgress]);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[400] bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 text-[var(--color-text-primary)] border-b border-[var(--color-border-stone)] select-none"
    >
      <ArchGridOverlay />

      <div className="max-w-md w-full relative z-10 space-y-6 text-center">
        {/* Monospaced CAD Header */}
        <div className="loader-text-item space-y-3 flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-earth-accent)] uppercase tracking-[0.25em] block font-bold">
            [ INITIALIZING ARCHITECTURAL STUDIO ]
          </span>
          <div className="flex items-center gap-3">
            <img
              src={logoIconImg}
              alt="Kedar Property"
              className="h-10 sm:h-12 w-auto object-contain mix-blend-screen filter drop-shadow-xl"
            />
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)] leading-none text-left">
              KEDAR <span className="text-[var(--color-earth-accent)]">// PROPERTY</span>
            </h1>
          </div>
        </div>

        {/* Hairline Progress Bar */}
        <div className="loader-text-item relative w-full h-[2px] bg-[var(--color-border-stone)] overflow-hidden rounded-[1px]">
          <div
            ref={lineRef}
            className="w-full h-full bg-[var(--color-earth-accent)] origin-left transition-all duration-150"
            style={{ transform: `scaleX(${loadingProgress / 100})` }}
          />
        </div>

        {/* Counter & Status Footer */}
        <div className="loader-text-item flex items-center justify-between font-mono text-xs text-[var(--color-text-tertiary)] pt-2">
          <span>KEDAR ENTERPRISE</span>
          <span className="font-bold text-[var(--color-earth-accent)]">{loadingProgress}%</span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
};
