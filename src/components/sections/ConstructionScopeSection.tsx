import React, { useState, useEffect, useRef } from 'react';
import { CURATED_IMAGES } from '../../config/image.config';
import { dataService } from '../../services/dataService';
import { useLanguage } from '../../context/LanguageContext';
import { CONSTRUCTION_STAGES_DATA } from '../../data/constructionStages';
import type { ConstructionStage } from '../../types/construction';
import { Eyebrow } from '../common/Eyebrow';
import { LeadEnquiryButton } from '../common/LeadEnquiryButton';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ConstructionStageItem {
  num: string;
  title: string;
  desc: string;
  codeTag: string;
  image: string;
  capabilities: string[];
}

export const ConstructionScopeSection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const timelineListRef = useRef<HTMLDivElement>(null);

  // Initialize with CONSTRUCTION_STAGES_DATA to prevent empty render & GSAP target loss
  const [stagesList, setStagesList] = useState<ConstructionStage[]>(CONSTRUCTION_STAGES_DATA);

  useEffect(() => {
    let isMounted = true;
    dataService.getConstructionStages().then((data) => {
      if (isMounted && data.length > 0) {
        setStagesList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const STAGES: ConstructionStageItem[] = stagesList.map(s => ({
    num: s.num,
    title: s.title || s.name || '',
    desc: s.desc || s.description || '',
    codeTag: s.codeTag || `STAGE ${s.num}`,
    image: s.image || CURATED_IMAGES.constructionSite.url,
    capabilities: s.capabilities || []
  }));

  // GSAP ScrollTrigger Line Filling & Stage Reveal Animations
  useEffect(() => {
    if (!sectionRef.current || !lineFillRef.current || !timelineListRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Vertical Construction Line Fill Progress Animation
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineListRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );

      // 2. Timeline Item Cards Reveal Stagger
      if (timelineListRef.current?.children) {
        Array.from(timelineListRef.current.children).forEach((child) => {
          gsap.fromTo(
            child,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: child,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [stagesList]);

  return (
    <section
      ref={sectionRef}
      id="construction-scope"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-[var(--color-border-stone)]">
          <div>
            <Eyebrow index="06" variant="accent" className="mb-4">
              {t('scope_eyebrow')}
            </Eyebrow>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.02]">
              {isHindi ? 'आप अपना विज़न लाएं।' : 'YOU BRING THE VISION.'} <br />
              <span className="text-[var(--color-earth-accent)] font-normal italic">
                {isHindi ? 'हम बाकी सब निर्माण करेंगे।' : 'WE BUILD THE REST.'}
              </span>
            </h2>
          </div>

          <p className="text-base text-[var(--color-text-secondary)] font-normal max-w-md leading-relaxed">
            {t('scope_desc')}
          </p>
        </div>

        {/* ==========================================================================
           SEQUENTIAL 12-STAGE CONSTRUCTION TIMELINE WITH VERTICAL PROGRESS LINE
           ========================================================================== */}
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          
          {/* Vertical Construction Line Track */}
          <div
            ref={lineTrackRef}
            className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border-stone)] -translate-x-1/2 z-0"
          >
            {/* Terracotta Scroll-Progress Filling Line */}
            <div
              ref={lineFillRef}
              className="w-full h-full bg-[var(--color-earth-accent)] origin-top shadow-[0_0_12px_rgba(194,109,71,0.8)]"
            />
          </div>

          {/* Timeline Stage Cards List */}
          <div ref={timelineListRef} className="relative z-10 flex flex-col gap-8 sm:gap-16">
            {STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <article
                  key={stage.num}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 relative group`}
                >
                  {/* Timeline Center Node Marker */}
                  <div className="absolute left-3 sm:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-earth-accent)] flex items-center justify-center text-[var(--color-earth-accent)] font-mono text-[9px] font-bold group-hover:bg-[var(--color-earth-accent)] group-hover:text-white transition-colors duration-300">
                      {stage.num}
                    </div>
                  </div>

                  {/* Stage Content Card */}
                  <div className={`w-full sm:w-[calc(50%-3rem)] ${isEven ? 'sm:text-right sm:items-end' : 'sm:text-left sm:items-start'} flex flex-col pl-7 sm:pl-0`}>
                    <div className="arch-card p-4 sm:p-8 rounded-[2px] w-full border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] transition-colors">
                      
                      {/* Code Tag & Stage Number */}
                      <div className={`flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--color-border-stone)] ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                        <span className="font-mono text-[9px] sm:text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest px-2 py-0.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)]">
                          [ {stage.codeTag} ]
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-[var(--color-concrete-light)]">
                          STAGE {stage.num} / 12
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] transition-colors mb-2">
                        {stage.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        {stage.desc}
                      </p>

                      {/* Architectural Image Feature */}
                      <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)] mb-4 group/img">
                        <img
                          src={stage.image}
                          alt={`Kedar Properties Construction Stage ${stage.num} - ${stage.title}`}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src !== CURATED_IMAGES.architecturalDrawing.url) {
                              target.src = CURATED_IMAGES.architecturalDrawing.url;
                            }
                          }}
                          className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover/img:scale-105 transition-transform duration-700 block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/60 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Capabilities Bullets */}
                      <div className="space-y-1.5 pt-2">
                        {stage.capabilities.map((cap, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 font-mono text-[10px] text-[var(--color-concrete-light)] ${isEven ? 'sm:justify-end' : ''}`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-earth-accent)] shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Empty Spacer Column for Alternating 2-Column Grid */}
                  <div className="hidden sm:block w-[calc(50%-3rem)]" />
                </article>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[var(--color-earth-accent)] uppercase tracking-widest block mb-1">
              [ SINGLE-POINT CIVIL CONTRACTING ]
            </span>
            <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">
              Ready to Engineer Your Architectural Vision?
            </h3>
          </div>

          <LeadEnquiryButton
            variant="DISCUSS YOUR PROJECT"
            size="lg"
            buttonStyle="accent"
            analyticsCategory="Construction Scope Section"
          />
        </div>

      </div>
    </section>
  );
};

export default ConstructionScopeSection;
