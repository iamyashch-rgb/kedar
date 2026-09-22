import React, { useState, useEffect, useRef } from 'react';
import { CURATED_IMAGES } from '../../config/image.config';
import { useLanguage } from '../../context/LanguageContext';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ProcessStepItem {
  num: string;
  stepTag: string;
  title: string;
  desc: string;
  deliverables: string[];
  image: string;
}

export const ProcessSection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const outerTrackRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLOListElement>(null);
  const desktopProgressLineRef = useRef<HTMLDivElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const PROCESS_STEPS: ProcessStepItem[] = isHindi
    ? [
        {
          num: '01',
          stepTag: 'चरण 01',
          title: 'प्रारंभिक परामर्श',
          desc: 'परियोजना के दायरे, वित्तीय उद्देश्यों, कानूनी ढांचे और स्थान की प्राथमिकताओं को परिभाषित करने के लिए परामर्श।',
          deliverables: ['परामर्श विवरण', 'बजट व कानूनी रोडमैप', 'ग्राहक प्रतिनिधित्व समझौता'],
          image: CURATED_IMAGES.heroBg.url,
        },
        {
          num: '02',
          stepTag: 'चरण 02',
          title: 'आवश्यकता एवं साइट विश्लेषण',
          desc: 'विस्तृत वास्तुकला विवरण तैयार करना, भौतिक स्थल निरीक्षण, पर्यावरण विश्लेषण और ज़ोनिंग उन्मुखीकरण।',
          deliverables: ['भौतिक साइट सर्वेक्षण', 'ज़ोनिंग व पहुंच ऑडिट', 'स्थापत्य विवरण विनिर्देश'],
          image: CURATED_IMAGES.landPlot.url,
        },
        {
          num: '03',
          stepTag: 'चरण 03',
          title: 'भूमि/संपत्ति मूल्यांकन',
          desc: 'व्यापक 30-वर्षीय राजस्व रिकॉर्ड खोज (जमाबंदी, खसरा-खतौनी), मृदा भार क्षमता परीक्षण और स्वामित्व सत्यापन।',
          deliverables: ['30-वर्षीय शीर्षक खोज रिपोर्ट', 'मृदा बोरिंग प्रमाणपत्र', 'कानूनी भार रहित सत्यापन'],
          image: CURATED_IMAGES.architecturalDrawing.url,
        },
        {
          num: '04',
          stepTag: 'चरण 04',
          title: 'योजना एवं लागत अनुमान',
          desc: 'आईएस-कोड मात्रा विवरण पत्र (बीओक्यू), सामग्री लागत विश्लेषण, संरचनात्मक इंजीनियरिंग और समय सारणी।',
          deliverables: ['मदवार बीओक्यू लागत', 'मास्टर निर्माण समय-सीमा', 'संरचनात्मक इस्पात ऑडिट'],
          image: CURATED_IMAGES.commercialHub.url,
        },
        {
          num: '05',
          stepTag: 'चरण 05',
          title: 'डिजाइन एवं स्वीकृति',
          desc: 'पैरामीट्रिक 3D बीआईएम संरचनात्मक मॉडलिंग, नगर निगम सीएलयू स्वीकृतियां और रेरा पंजीकरण।',
          deliverables: ['स्वीकृत नगर निगम ब्लूप्रिंट', 'सीएलयू और पर्यावरण स्वीकृति', 'रेरा पंजीकरण आईडी'],
          image: CURATED_IMAGES.heroBg.url,
        },
        {
          num: '06',
          stepTag: 'चरण 06',
          title: 'सिविल निर्माण',
          desc: 'एकल जवाबदेही के तहत नींव से निर्माण: आरसीसी कॉलम कास्टिंग, स्लैब शटरिंग और चिनाई कार्य।',
          deliverables: ['आईएस-456 प्रमाणित आरसीसी ढांचा', 'साप्ताहिक ड्रोन प्रगति अपडेट', 'साइट पर सिविल पर्यवेक्षण'],
          image: CURATED_IMAGES.constructionSite.url,
        },
        {
          num: '07',
          stepTag: 'चरण 07',
          title: 'गुणवत्ता परीक्षण',
          desc: '28-दिवसीय कंक्रीट क्यूब मजबूती ऑडिट, पीएमसी गुणवत्ता नियंत्रण, 5-बार हाइड्रो परीक्षण और शून्य-दोष निरीक्षण।',
          deliverables: ['28-दिवसीय क्यूब मजबूती प्रमाणपत्र', '5-बार हाइड्रो टेस्ट ऑडिट', 'शून्य-दोष गुणवत्ता क्लीयरेंस'],
          image: CURATED_IMAGES.luxuryVilla.url,
        },
        {
          num: '08',
          stepTag: 'चरण 08',
          title: 'हैंडओवर एवं स्वामित्व',
          desc: 'नगर निगम अधिभोग प्रमाणपत्र (ओसी) प्राप्त करना, अंतिम दस्तावेज उत्परिवर्तन, चाबी सौंपना और प्रबंधन।',
          deliverables: ['अधिभोग प्रमाणपत्र (ओसी)', 'अंतिम विलेख नामांतरण', 'चाबी और वारंटी पैक'],
          image: CURATED_IMAGES.heroBg.url,
        },
      ]
    : [
        {
          num: '01',
          stepTag: 'STEP 01',
          title: 'Consultation',
          desc: 'Initial advisory consultation to define project scope, financial objectives, legal framework, and location priorities.',
          deliverables: ['Advisory Scope Brief', 'Budget & Legal Roadmap', 'Client Representation Accord'],
          image: CURATED_IMAGES.heroBg.url,
        },
        {
          num: '02',
          stepTag: 'STEP 02',
          title: 'Requirement & Site Understanding',
          desc: 'In-depth architectural brief drafting, physical site inspection, environmental analysis, and zoning orientation.',
          deliverables: ['Physical Site Survey', 'Zoning & Access Audit', 'Architectural Brief Specification'],
          image: CURATED_IMAGES.landPlot.url,
        },
        {
          num: '03',
          stepTag: 'STEP 03',
          title: 'Property/Land Evaluation',
          desc: 'Comprehensive 30-year revenue record search (Jamabandi, Khasra-Khatauni), soil load-bearing test, and title clearance.',
          deliverables: ['30-Year Title Search Report', 'Soil Core Boring Certificate', 'Legal Encumbrance Verification'],
          image: CURATED_IMAGES.architecturalDrawing.url,
        },
        {
          num: '04',
          stepTag: 'STEP 04',
          title: 'Planning & Estimation',
          desc: 'IS-code Bill of Quantities (BOQ), material budget rate analysis, structural engineering, and P6 Primavera schedule.',
          deliverables: ['Itemized BOQ Costing', 'P6 Master Construction Timeline', 'Structural Steel Audit'],
          image: CURATED_IMAGES.commercialHub.url,
        },
        {
          num: '05',
          stepTag: 'STEP 05',
          title: 'Design & Approvals',
          desc: 'Parametric 3D BIM structural modeling, municipal Town & Country Planning CLU clearances, and RERA registration.',
          deliverables: ['Sanctioned Municipal Blueprints', 'CLU & Environmental Sanction', 'RERA Registration ID'],
          image: CURATED_IMAGES.heroBg.url,
        },
        {
          num: '06',
          stepTag: 'STEP 06',
          title: 'Construction',
          desc: 'Ground-up civil execution under single-point accountability: RCC column casting, slab shuttering, and masonry.',
          deliverables: ['IS-456 Certified RCC Framing', 'Weekly Drone Progress Updates', 'On-Site Civil Supervision'],
          image: CURATED_IMAGES.constructionSite.url,
        },
        {
          num: '07',
          stepTag: 'STEP 07',
          title: 'Quality Checks',
          desc: '28-Day concrete cube strength audit, PMC quality control, 5-bar hydro-testing, and zero-snag inspection.',
          deliverables: ['28-Day Cube Strength Certificate', '5-Bar Hydro Test Audit', 'Zero-Snag Quality Clearance'],
          image: CURATED_IMAGES.luxuryVilla.url,
        },
        {
          num: '08',
          stepTag: 'STEP 08',
          title: 'Handover',
          desc: 'Procurement of municipal Occupancy Certificate (OC), final deed mutation, estate keys handover, and facility management.',
          deliverables: ['Occupancy Certificate (OC)', 'Final Deed Mutation', 'Estate Keys & Warranty Pack'],
          image: CURATED_IMAGES.heroBg.url,
        },
      ];

  // GSAP ScrollTrigger Pinned Horizontal Track Animation (Desktop)
  useEffect(() => {
    if (!outerTrackRef.current || !stickyContainerRef.current || !horizontalTrackRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll Timeline
      const totalWidth = horizontalTrackRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const xDistance = -(totalWidth - windowWidth + 120);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: outerTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyContainerRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            // Compute active step index (0 to 7)
            const stepIdx = Math.min(7, Math.max(0, Math.floor(self.progress * 8)));
            setActiveStepIndex(stepIdx);

            // Fill desktop horizontal progress line
            if (desktopProgressLineRef.current) {
              desktopProgressLineRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      timeline.to(horizontalTrackRef.current, {
        x: xDistance,
        ease: 'none',
      });
    }, outerTrackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      className="relative w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] select-none"
    >
      {/* ==========================================================================
         DESKTOP PINNED HORIZONTAL SCROLL TRACK (md:block)
         ========================================================================== */}
      <div ref={outerTrackRef} className="hidden md:block relative w-full h-[300vh]">
        {/* Pinned Sticky Container */}
        <div
          ref={stickyContainerRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-between py-10 px-6 lg:px-12 overflow-hidden arch-grid-bg"
        >
          {/* Background Architectural Grid Lines */}
          <ArchGridOverlay columns={4} showCrosshairs />

          {/* Desktop Top Header Bar */}
          <div className="relative z-20 max-w-[var(--container-wide)] mx-auto w-full flex flex-col gap-3 pb-4 border-b border-[var(--color-border-stone)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <Eyebrow index="07" variant="accent" className="mb-2">
                  {t('process_eyebrow')}
                </Eyebrow>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none">
                  {t('process_title')}
                </h2>
              </div>

              {/* Active Step Status Counter */}
              <div className="flex items-center gap-4 font-mono text-xs">
                <span className="text-[var(--color-earth-accent)] font-bold">
                  [ STEP {PROCESS_STEPS[activeStepIndex].num} / 08 ]
                </span>
                <span className="text-[var(--color-text-primary)] font-semibold uppercase">
                  {PROCESS_STEPS[activeStepIndex].title}
                </span>
              </div>
            </div>

            {/* Horizontal Fill Line Progress Bar */}
            <div className="w-full h-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] relative overflow-hidden rounded-[1px]">
              <div
                ref={desktopProgressLineRef}
                className="h-full bg-[var(--color-earth-accent)] transition-all duration-100"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Center Horizontal Scrolling Track */}
          <div className="relative z-10 my-auto w-full overflow-hidden py-6">
            <ol
              ref={horizontalTrackRef}
              className="flex items-stretch gap-8 sm:gap-12 w-max list-none m-0 p-0"
            >
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;

                return (
                  <li
                    key={step.num}
                    className={`arch-card w-[420px] lg:w-[480px] shrink-0 p-6 sm:p-8 rounded-[2px] border transition-all duration-500 flex flex-col justify-between ${
                      isActive
                        ? 'border-[var(--color-earth-accent-border)] bg-[var(--color-bg-card-hover)] shadow-2xl scale-102'
                        : 'border-[var(--color-border-stone)] bg-[var(--color-bg-card)] opacity-70'
                    }`}
                  >
                    {/* Step Header */}
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border-stone)]">
                        <span
                          className={`font-mono transition-all duration-500 ${
                            isActive
                              ? 'text-4xl font-extrabold text-[var(--color-earth-accent)] scale-110'
                              : 'text-2xl font-bold text-[var(--color-concrete-light)]'
                          }`}
                        >
                          {step.num} //
                        </span>

                        <span className="font-mono text-xs text-[var(--color-earth-accent)] uppercase tracking-widest px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)]">
                          {step.stepTag}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                        {step.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        {step.desc}
                      </p>
                    </div>

                    {/* Step Image & Deliverables */}
                    <div>
                      <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] mb-4 bg-[var(--color-bg-tertiary)]">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover filter brightness-95 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {step.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-concrete-light)]">
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-earth-accent)] shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop Footer Status */}
          <div className="relative z-20 max-w-[var(--container-wide)] mx-auto w-full pt-4 border-t border-[var(--color-border-stone)] flex items-center justify-between font-mono text-[10px] text-[var(--color-concrete-light)] uppercase">
            <div>[ SCROLL HORIZONTALLY TO EXPLORE STEP 01 - 08 ]</div>
            <a href="#contact" className="text-[var(--color-earth-accent)] hover:underline arch-focus">
              START YOUR JOURNEY →
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================================================
         MOBILE VERTICAL TIMELINE LAYOUT & ACCESSIBLE NO-JS FALLBACK (md:hidden)
         ========================================================================== */}
      <div className="md:hidden py-16 px-4 sm:px-6 max-w-full overflow-hidden">
        <div className="mb-10">
          <Eyebrow index="07" variant="accent" className="mb-3">
            CLIENT JOURNEY & EXECUTION FRAMEWORK
          </Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
            HOW <span className="text-[var(--color-earth-accent)] font-normal italic">WE BUILD.</span>
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-2">
            8-step client journey from consultation to final OC key handover.
          </p>
        </div>

        {/* Vertical Mobile Timeline List */}
        <ol className="relative border-l border-[var(--color-earth-accent-border)] ml-2 sm:ml-3 space-y-8 list-none p-0 m-0 max-w-full">
          {PROCESS_STEPS.map((step) => (
            <li key={step.num} className="ml-4 sm:ml-6 relative group">
              {/* Node Dot */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-2 w-4 h-4 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-earth-accent)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[var(--color-earth-accent)] rounded-full" />
              </div>

              {/* Mobile Card Box */}
              <div className="arch-card p-4 sm:p-5 rounded-[2px] border border-[var(--color-border-stone)]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--color-border-stone)]">
                  <span className="font-mono text-base sm:text-lg font-bold text-[var(--color-earth-accent)]">
                    {step.num} //
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-concrete-light)] uppercase px-2 py-0.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)]">
                    {step.stepTag}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>

                <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] mb-4 bg-[var(--color-bg-tertiary)]">
                  <img src={step.image} alt={step.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1.5">
                  {step.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 font-mono text-[9px] text-[var(--color-concrete-light)]">
                      <CheckCircle2 className="w-3 h-3 text-[var(--color-earth-accent)] shrink-0 mt-0.5" />
                      <span className="leading-tight">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a href="#contact" className="arch-focus inline-block w-full">
            <Button variant="accent" size="lg" isFullWidth icon={<ArrowRight className="w-4 h-4" />}>
              Start Consultation
            </Button>
          </a>
        </div>
      </div>

    </section>
  );
};

export default ProcessSection;
