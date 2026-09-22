import React, { useState, useEffect, useRef } from 'react';
import { dataService } from '../../services/dataService';
import { useLanguage } from '../../context/LanguageContext';
import type { Service } from '../../types/service';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Desktop Hover Cursor Tracking State
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mobile Accordion Expansion State
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null);

  const [servicesList, setServicesList] = useState<Service[]>([]);

  useEffect(() => {
    let isMounted = true;
    dataService.getServices().then((data) => {
      if (isMounted) {
        setServicesList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const SERVICES_LIST = servicesList;

  // Track Mouse Movement for Cursor-Following Image Preview (Optimized with RAF)
  useEffect(() => {
    if (hoveredIndex === null) return;

    let animationFrameId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: clientX, y: clientY });
        animationFrameId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredIndex]);

  // GSAP Viewport Entrance Stagger Animation
  useEffect(() => {
    if (!sectionRef.current || !listContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (listContainerRef.current?.children) {
        gsap.fromTo(
          Array.from(listContainerRef.current.children),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMobileClick = (index: number) => {
    setExpandedMobileIndex(expandedMobileIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[var(--color-border-stone)]">
          <div>
            <Eyebrow index="03" variant="accent" className="mb-4">
              {t('services_eyebrow')}
            </Eyebrow>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none">
              {t('services_title')}
            </h2>
          </div>

          <p className="text-base text-[var(--color-text-secondary)] font-normal max-w-md leading-relaxed">
            {t('services_subtitle')}
          </p>
        </div>

        {/* ==========================================================================
           EDITORIAL SERVICE ROWS MATRIX
           ========================================================================== */}
        <div ref={listContainerRef} className="flex flex-col w-full">
          {SERVICES_LIST.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isMobileExpanded = expandedMobileIndex === index;

            return (
              <article
                key={service.num || service.code || index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleMobileClick(index)}
                className={`group relative border-b border-[var(--color-border-stone)] py-5 sm:py-8 transition-colors duration-300 cursor-pointer min-h-[44px] touch-target ${
                  isHovered ? 'bg-[var(--color-bg-card-hover)]' : 'bg-transparent'
                }`}
              >
                {/* Desktop & Main Row Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 px-2 sm:px-4">
                  
                  {/* Left: Index & Service Title */}
                  <div className="flex items-center gap-4 sm:gap-10 transition-transform duration-300 md:group-hover:translate-x-3">
                    <span className="font-mono text-xs sm:text-sm text-[var(--color-earth-accent)] font-bold shrink-0">
                      {service.num || `0${index + 1}`} //
                    </span>

                    <h3 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight group-hover:text-[var(--color-earth-accent)] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Short Desc & Arrow Icon */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12">
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-normal max-w-md hidden md:block">
                      {service.desc || service.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                        [ VIEW DIVISION ]
                      </span>
                      <div className="w-10 h-10 border border-[var(--color-border-stone)] group-hover:border-[var(--color-earth-accent-border)] bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] rounded-[2px] transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Mobile Tap Reveal Drawer (Inline Accordion) */}
                <div
                  className={`md:hidden px-2 pt-4 transition-all duration-300 overflow-hidden ${
                    isMobileExpanded ? 'max-h-[500px] opacity-100 mt-4 border-t border-[var(--color-border-stone)]/50' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {service.desc || service.description}
                  </p>

                  <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] mb-4">
                    <img
                      src={service.image}
                      alt={`Kedar Properties - ${service.title} Service Division`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 pb-2">
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-concrete-light)]">
                        <CheckCircle2 className="w-3 h-3 text-[var(--color-earth-accent)] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* ==========================================================================
           DESKTOP FLOATING CURSOR-FOLLOWING IMAGE PREVIEW TOOLTIP
           ========================================================================== */}
        {hoveredIndex !== null && (
          <div
            className="hidden md:block fixed pointer-events-none z-50 transition-opacity duration-300"
            style={{
              top: `${mousePos.y + 20}px`,
              left: `${mousePos.x + 20}px`,
            }}
          >
            <div className="w-80 h-52 bg-[var(--color-bg-card)] border-2 border-[var(--color-earth-accent)] rounded-[2px] shadow-2xl overflow-hidden relative">
              <img
                src={SERVICES_LIST[hoveredIndex].image}
                alt={SERVICES_LIST[hoveredIndex].title}
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest">
                  [ {SERVICES_LIST[hoveredIndex].num} // ARCHITECTURAL PREVIEW ]
                </span>
                <span className="font-heading text-sm font-bold text-white">
                  {SERVICES_LIST[hoveredIndex].title}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesSection;
