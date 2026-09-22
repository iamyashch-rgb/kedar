import React, { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { CURATED_IMAGES } from '../../config/image.config';
import { CheckCircle2, FileCheck, ShieldCheck, MapPin, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TrustPrinciple {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  cadTag: string;
  image: string;
  icon: React.ReactNode;
}

export const TrustSection: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const PRINCIPLES: TrustPrinciple[] = [
    {
      num: '01',
      title: 'TRANSPARENCY',
      subtitle: 'Clear Communication & Documented Processes',
      description:
        'Every land title, BOQ estimate, material grade, and timeline milestone is fully documented and open-book. We eliminate ambiguity with complete RERA compliance and real-time site reporting.',
      details: [
        'Open-book Itemized Bill of Quantities (BOQ)',
        'RERA Certified Legal Title & Land Clearance',
        'Bi-weekly Structural Audit Reports & Photo Dossiers',
      ],
      cadTag: 'AUDIT // IS 456 OPEN ESTIMATION',
      image: CURATED_IMAGES.architecturalDrawing.url,
      icon: <FileCheck className="w-5 h-5 text-[var(--color-earth-accent)]" />,
    },
    {
      num: '02',
      title: 'QUALITY',
      subtitle: 'Materials, Workmanship & Civil Execution',
      description:
        'Uncompromising adherence to structural IS codes, C50 self-compacting concrete, high-yield FE 550D rebar steel, and 28-day PMC lab strength testing before every slab pour.',
      details: [
        'IS 456 & IS 1786 Certified Rebar & Concrete',
        '28-Day PMC Concrete Cube Strength Testing',
        '5-Bar Hydro-Tested Plumbing & FRLS Copper Utilities',
      ],
      cadTag: 'ENGINEERING // C50 CONCRETE & FE550D REBAR',
      image: CURATED_IMAGES.constructionSite.url,
      icon: <ShieldCheck className="w-5 h-5 text-[var(--color-earth-accent)]" />,
    },
    {
      num: '03',
      title: 'LOCAL UNDERSTANDING',
      subtitle: 'Regional Knowledge Across Indian Micro-Markets',
      description:
        'Deep ground-level expertise in soil mechanics, municipal zoning setbacks, regional climatic factors, and market dynamics across Delhi NCR, Mumbai BKC, Dehradun, Lucknow, Gurugram, and Hyderabad.',
      details: [
        'Geotechnical Seismic Zone III/IV Foundation Customization',
        'State-specific Municipal & RERA Approval Coordination',
        'Regional Subcontractor & Material Supply Chain Network',
      ],
      cadTag: 'FOOTPRINT // 6+ METRO ZONES & SEISMIC KNOWLEDGE',
      image: CURATED_IMAGES.panIndiaMap.url,
      icon: <MapPin className="w-5 h-5 text-[var(--color-earth-accent)]" />,
    },
    {
      num: '04',
      title: 'END-TO-END SUPPORT',
      subtitle: 'From Property Discovery to Handover',
      description:
        'A single point of accountability covering initial land identification, architectural 3D BIM design, turnkey civil construction, MEP installations, interior execution, and final key handover.',
      details: [
        'Single-Window Project Management Responsibility',
        'Integrated Architectural, Structural & Interior Design',
        'RERA Occupancy Certificate (OC) Procurement',
      ],
      cadTag: 'LIFECYCLE // LAND ACQUISITION TO HANDOVER',
      image: CURATED_IMAGES.heroBg.url,
      icon: <Compass className="w-5 h-5 text-[var(--color-earth-accent)]" />,
    },
  ];

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const totalSteps = PRINCIPLES.length;

      ScrollTrigger.create({
        trigger: outerContainerRef.current,
        start: 'top top',
        end: () => `+=${totalSteps * 100}%`,
        pin: stickyPanelRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            totalSteps - 1,
            Math.floor(self.progress * totalSteps)
          );
          setActivePrinciple(idx);

          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, {
              scaleY: self.progress,
            });
          }
        },
      });
    }, outerContainerRef);

    return () => ctx.revert();
  }, [PRINCIPLES.length]);

  return (
    <section
      id="trust"
      ref={outerContainerRef}
      className="relative bg-[var(--color-bg-primary)] border-b border-[var(--color-border-stone)]"
    >
      {/* Pinned Sticky Section Wrapper */}
      <div
        ref={stickyPanelRef}
        className="min-h-screen w-full flex flex-col justify-between relative py-16 sm:py-24 overflow-hidden"
      >
        <ArchGridOverlay />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-8 my-auto">
          {/* Section Eyebrow & Main Title */}
          <div className="space-y-3 border-b border-[var(--color-border-stone)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Eyebrow index="09">CORE PRINCIPLES & VALUES</Eyebrow>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)] mt-2">
                BUILT ON <span className="text-[var(--color-earth-accent)]">TRUST.</span>
              </h2>
            </div>

            <div className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest hidden sm:block">
              [ STANDARDS OF ARCHITECTURAL EXECUTION ]
            </div>
          </div>

          {/* Desktop Interactive Layout: Left Timeline Indicator + Right Viewport Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Vertical Indicators & Number Selector */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 relative border-r border-[var(--color-border-stone)] pr-0 lg:pr-8">
              {/* Vertical Progress Filling Axis Line */}
              <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[2px] bg-[var(--color-border-stone)]">
                <div
                  ref={progressLineRef}
                  className="w-full bg-[var(--color-earth-accent)] origin-top transition-all duration-100"
                  style={{ height: '100%', transform: 'scaleY(0)' }}
                />
              </div>

              <div className="space-y-4">
                {PRINCIPLES.map((principle, idx) => {
                  const isActive = activePrinciple === idx;

                  return (
                    <button
                      key={principle.num}
                      onClick={() => setActivePrinciple(idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-[2px] border transition-all duration-500 flex items-center justify-between group ${
                        isActive
                          ? 'bg-[var(--color-bg-secondary)] border-[var(--color-earth-accent-border)] shadow-lg'
                          : 'bg-[var(--color-bg-primary)] border-[var(--color-border-stone)] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-mono text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                            isActive
                              ? 'text-[var(--color-earth-accent)] scale-110'
                              : 'text-[var(--color-text-tertiary)]'
                          }`}
                        >
                          {principle.num}
                        </span>
                        <div>
                          <h3
                            className={`font-heading text-base sm:text-lg font-bold uppercase transition-colors duration-300 ${
                              isActive
                                ? 'text-[var(--color-text-primary)]'
                                : 'text-[var(--color-text-secondary)]'
                            }`}
                          >
                            {principle.title}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-[var(--color-earth-accent)] scale-125'
                            : 'bg-transparent border border-[var(--color-border-stone)]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quote Badge */}
              <div className="hidden lg:block p-4 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px]">
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] block uppercase tracking-widest mb-1">
                  COMMITMENT STATEMENT
                </span>
                <p className="font-body text-xs text-[var(--color-text-secondary)] italic">
                  "Architecture is not just about concrete and glass. It is a contractual promise of longevity, precision, and trust."
                </p>
              </div>
            </div>

            {/* Right Column: Viewport Takeover Display Card */}
            <div className="lg:col-span-8 relative flex flex-col justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px] p-6 sm:p-10 min-h-[440px] overflow-hidden shadow-2xl">
              {/* Background Architectural Image with Vignette Overlay */}
              <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700">
                <img
                  src={PRINCIPLES[activePrinciple].image}
                  alt={PRINCIPLES[activePrinciple].title}
                  className="w-full h-full object-cover transition-all duration-700 filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-[var(--color-bg-secondary)]/80 to-transparent" />
              </div>

              {/* Top CAD Tag */}
              <div className="relative z-10 flex items-center justify-between border-b border-[var(--color-border-stone)] pb-4">
                <div className="flex items-center gap-2">
                  {PRINCIPLES[activePrinciple].icon}
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] font-bold">
                    {PRINCIPLES[activePrinciple].subtitle}
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-[var(--color-text-tertiary)] hidden sm:block">
                  [ {PRINCIPLES[activePrinciple].cadTag} ]
                </span>
              </div>

              {/* Middle Headline & Description */}
              <div className="relative z-10 my-6 space-y-4">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[var(--color-border-stone)] opacity-50 block">
                  {PRINCIPLES[activePrinciple].num} //
                </span>

                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]">
                  {PRINCIPLES[activePrinciple].title}
                </h3>

                <p className="font-body text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                  {PRINCIPLES[activePrinciple].description}
                </p>
              </div>

              {/* Bottom Key Deliverable Bullets */}
              <div className="relative z-10 pt-4 border-t border-[var(--color-border-stone)]">
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest block mb-3">
                  CORE DELIVERABLES & AUDIT BENCHMARKS:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRINCIPLES[activePrinciple].details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0 mt-0.5" />
                      <span className="font-mono text-xs text-[var(--color-text-secondary)] leading-tight">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
