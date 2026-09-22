import React, { useState, useRef, useEffect } from 'react';
import { CURATED_IMAGES } from '../../config/image.config';
import { dataService } from '../../services/dataService';
import { useLanguage } from '../../context/LanguageContext';
import type { ConstructionStage } from '../../types/construction';
import { Eyebrow } from '../common/Eyebrow';
import { LeadEnquiryButton } from '../common/LeadEnquiryButton';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { ShieldCheck, HardHat, UserCheck, Wrench, Ruler, FileText, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ConstructionScrollSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const outerTrackRef = useRef<HTMLDivElement>(null);
  const stickyCanvasRef = useRef<HTMLDivElement>(null);

  // SVG / Structural Layer Refs
  const blueprintGridRef = useRef<SVGSVGElement>(null);
  const foundationRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const floorsRef = useRef<HTMLDivElement>(null);
  const facadeRef = useRef<HTMLDivElement>(null);
  const craneRef = useRef<HTMLDivElement>(null);
  const finalRenderRef = useRef<HTMLDivElement>(null);
  const dustParticlesRef = useRef<HTMLDivElement>(null);

  // 6 Animated Construction Worker Refs
  const worker1Ref = useRef<HTMLDivElement>(null); // Architect / Surveyor
  const worker2Ref = useRef<HTMLDivElement>(null); // Foundation Engineer
  const worker3Ref = useRef<HTMLDivElement>(null); // Steel Erector (Climber)
  const worker4Ref = useRef<HTMLDivElement>(null); // Scaffolding Specialist
  const worker5Ref = useRef<HTMLDivElement>(null); // Upper Floor Supervisor
  const worker6Ref = useRef<HTMLDivElement>(null); // Facade Finisher

  // HUD & Stage State
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(1);
  const [stagesList, setStagesList] = useState<ConstructionStage[]>([]);

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

  const DEFAULT_STAGES = isHindi
    ? [
        { num: '01', name: 'साइट सर्वेक्षण एवं बेंचमार्क', milestone: 'योजना' },
        { num: '02', name: 'सीएडी ब्लूप्रिंट और विनिर्देश', milestone: 'योजना' },
        { num: '03', name: 'कंक्रीट नींव एवं सुदृढ़ीकरण', milestone: 'नींव' },
        { num: '04', name: 'स्टील बीम एवं संरचना निर्माण', milestone: 'ढांचा' },
        { num: '05', name: 'बहुस्तरीय फ़्लोर स्लैब', milestone: 'ढांचा' },
        { num: '06', name: 'ग्लेजिंग और अग्रभाग फ़िनिशिंग', milestone: 'निष्पादन' },
        { num: '07', name: 'सिविल टीम एवं एचयूडी निगरानी', milestone: 'निष्पादन' },
        { num: '08', name: 'टावर क्रेन व भारी मशीनरी', milestone: 'निष्पादन' },
        { num: '09', name: 'संरचनात्मक रोशनी व इंटीरियर', milestone: 'फ़िनिशिंग' },
        { num: '10', name: 'अंतिम वास्तुकला हैंडओवर', milestone: 'वितरण' },
      ]
    : [
        { num: '01', name: 'SITE GROUND & BENCHMARK', milestone: 'PLAN' },
        { num: '02', name: 'BLUEPRINT CAD SPECIFICATION', milestone: 'PLAN' },
        { num: '03', name: 'CONCRETE FOOTING & REBAR', milestone: 'FOUNDATION' },
        { num: '04', name: 'STEEL I-BEAM ERECTION', milestone: 'STRUCTURE' },
        { num: '05', name: 'MULTI-TIER FLOOR SLABS', milestone: 'STRUCTURE' },
        { num: '06', name: 'CURTAIN WALL FACADE GLAZING', milestone: 'EXECUTION' },
        { num: '07', name: 'SITE CREW & CIVIL HUD', milestone: 'EXECUTION' },
        { num: '08', name: 'EQUIPMENT & TOWER CRANE', milestone: 'EXECUTION' },
        { num: '09', name: 'STRUCTURAL ILLUMINATION', milestone: 'FINISHING' },
        { num: '10', name: 'FINAL ARCHITECTURAL DELIVERY', milestone: 'DELIVERY' },
      ];

  const STAGES = stagesList.length > 0 ? stagesList : DEFAULT_STAGES;

  const MILESTONES = isHindi
    ? [
        { id: 'PLAN', label: 'योजना', range: [0, 20] },
        { id: 'FOUNDATION', label: 'नींव', range: [20, 35] },
        { id: 'STRUCTURE', label: 'ढांचा', range: [35, 55] },
        { id: 'EXECUTION', label: 'निर्माण', range: [55, 80] },
        { id: 'FINISHING', label: 'फ़िनिशिंग', range: [80, 90] },
        { id: 'DELIVERY', label: 'हैंडओवर', range: [90, 100] },
      ]
    : [
        { id: 'PLAN', label: 'PLAN', range: [0, 20] },
        { id: 'FOUNDATION', label: 'FOUNDATION', range: [20, 35] },
        { id: 'STRUCTURE', label: 'STRUCTURE', range: [35, 55] },
        { id: 'EXECUTION', label: 'EXECUTION', range: [55, 80] },
        { id: 'FINISHING', label: 'FINISHING', range: [80, 90] },
        { id: 'DELIVERY', label: 'DELIVERY', range: [90, 100] },
      ];

  useEffect(() => {
    if (!outerTrackRef.current || !stickyCanvasRef.current) return;

    if (window.innerWidth < 768) {
      setProgressPercent(100);
      setCurrentStageIndex(10);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgressPercent(100);
      setCurrentStageIndex(10);
      return;
    }

    const ctx = gsap.context(() => {
      // Pinning ScrollTrigger Master Scrub Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: outerTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyCanvasRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = Math.round(self.progress * 100);
            setProgressPercent(p);
            const stage = Math.min(10, Math.max(1, Math.ceil(self.progress * 10)));
            setCurrentStageIndex(stage);
          },
        },
      });

      // ==========================================================================
      // STAGE 1 & 2: Site Ground & Blueprint CAD SVG Drawing (0% -> 20%)
      // ==========================================================================
      if (blueprintGridRef.current) {
        masterTl.fromTo(
          blueprintGridRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.18 },
          0
        );
      }

      // WORKER 1: Architect / Surveyor checking plans (Ground datum motion)
      if (worker1Ref.current) {
        masterTl.fromTo(
          worker1Ref.current,
          { opacity: 0, x: -90 },
          { opacity: 1, x: 45, duration: 0.2 },
          0.02
        ).to(worker1Ref.current, { opacity: 0, duration: 0.05 }, 0.22);
      }

      // ==========================================================================
      // STAGE 3: Concrete Foundation Footing Slab (20% -> 32%)
      // ==========================================================================
      if (foundationRef.current) {
        masterTl.fromTo(
          foundationRef.current,
          { opacity: 0, y: 70, scaleY: 0.3 },
          { opacity: 1, y: 0, scaleY: 1, duration: 0.14 },
          0.2
        );
      }

      // Dust & Particulate Overlay (20% -> 42%)
      if (dustParticlesRef.current) {
        masterTl.fromTo(
          dustParticlesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.8, y: -30, duration: 0.2 },
          0.2
        ).to(dustParticlesRef.current, { opacity: 0, duration: 0.08 }, 0.42);
      }

      // WORKER 2: Foundation Engineer inspecting rebar (Horizontal motion)
      if (worker2Ref.current) {
        masterTl.fromTo(
          worker2Ref.current,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 35, duration: 0.16 },
          0.22
        ).to(worker2Ref.current, { opacity: 0, duration: 0.05 }, 0.38);
      }

      // ==========================================================================
      // STAGE 4: Structural Steel Columns Erection (32% -> 44%)
      // ==========================================================================
      if (columnsRef.current?.children) {
        masterTl.fromTo(
          Array.from(columnsRef.current.children),
          { opacity: 0, scaleY: 0, transformOrigin: 'bottom center' },
          { opacity: 1, scaleY: 1, duration: 0.14, stagger: 0.02 },
          0.32
        );
      }

      // WORKER 3: Steel Erector climbing vertically up left column I-beam
      if (worker3Ref.current) {
        masterTl.fromTo(
          worker3Ref.current,
          { opacity: 0, y: 130 },
          { opacity: 1, y: -25, duration: 0.18 },
          0.34
        ).to(worker3Ref.current, { opacity: 0, duration: 0.05 }, 0.52);
      }

      // ==========================================================================
      // STAGE 5: Multi-Tier Floor Plates Slabs (44% -> 56%)
      // ==========================================================================
      if (floorsRef.current?.children) {
        masterTl.fromTo(
          Array.from(floorsRef.current.children),
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.14, stagger: 0.03 },
          0.44
        );
      }

      // WORKER 4: Scaffolding Specialist traversing Floor 2
      if (worker4Ref.current) {
        masterTl.fromTo(
          worker4Ref.current,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 45, duration: 0.2 },
          0.48
        ).to(worker4Ref.current, { opacity: 0, duration: 0.05 }, 0.72);
      }

      // ==========================================================================
      // STAGE 6: Curtain Wall Glass Facade Assembling (56% -> 68%)
      // ==========================================================================
      if (facadeRef.current) {
        masterTl.fromTo(
          facadeRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.14 },
          0.56
        );
      }

      // WORKER 5: Upper Floor Supervisor on Roof Slab (Stage 5 to 8)
      if (worker5Ref.current) {
        masterTl.fromTo(
          worker5Ref.current,
          { opacity: 0, x: 80 },
          { opacity: 1, x: -25, duration: 0.22 },
          0.58
        ).to(worker5Ref.current, { opacity: 0, duration: 0.05 }, 0.82);
      }

      // ==========================================================================
      // STAGE 7 & 8: Tower Crane & Site Crew (68% -> 84%)
      // ==========================================================================
      if (craneRef.current) {
        masterTl.fromTo(
          craneRef.current,
          { opacity: 0, rotate: -15, transformOrigin: 'bottom left' },
          { opacity: 1, rotate: 0, duration: 0.12 },
          0.72
        );
      }

      // WORKER 6: Facade Finisher descending vertically along glass curtain wall
      if (worker6Ref.current) {
        masterTl.fromTo(
          worker6Ref.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 35, duration: 0.2 },
          0.68
        ).to(worker6Ref.current, { opacity: 0, duration: 0.05 }, 0.90);
      }

      // ==========================================================================
      // STAGE 9 & 10: Final Photorealistic Architectural Revelation (84% -> 100%)
      // ==========================================================================
      if (finalRenderRef.current) {
        masterTl.fromTo(
          finalRenderRef.current,
          { opacity: 0, filter: 'brightness(0.7) contrast(1.2)' },
          { opacity: 1, filter: 'brightness(1) contrast(1.05)', duration: 0.16 },
          0.84
        );
      }
    }, outerTrackRef);

    return () => ctx.revert();
  }, []);

  const currentStage = STAGES[currentStageIndex - 1] || STAGES[0];

  return (
    <section id="construction" className="relative w-full bg-[var(--color-bg-primary)] select-none">
      {/* ==========================================================================
         DESKTOP PINNED 400VH ANIMATED TRACK (md:block)
         ========================================================================== */}
      <div ref={outerTrackRef} className="hidden md:block relative w-full h-[400vh]">
        {/* Pinned Sticky Viewport Canvas */}
        <div
          ref={stickyCanvasRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-hidden arch-grid-bg"
        >
          {/* Architectural Grid Lines Overlay */}
          <ArchGridOverlay columns={4} showCrosshairs />

        {/* ==========================================================================
           TOP HUD HEADER BAR
           ========================================================================== */}
        <div className="relative z-30 max-w-[var(--container-wide)] mx-auto w-full flex flex-col gap-3 pb-4 border-b border-[var(--color-border-stone)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            
            {/* Header Title & Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--color-earth-accent)] animate-pulse" />
              <Eyebrow index="04 // ANIMATED EXECUTION" variant="minimal">
                SIGNATURE SCROLL CONSTRUCTION
              </Eyebrow>
            </div>

            {/* Stage HUD Status Counter */}
            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-[var(--color-earth-accent)] font-bold">
                [ STAGE {currentStage.num} / 10 ]
              </span>
              <span className="text-[var(--color-text-primary)] font-medium uppercase truncate max-w-[200px] sm:max-w-none">
                {currentStage.name}
              </span>
              <span className="text-[var(--color-concrete-light)] font-bold">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Scrubbed Progress HUD Bar */}
          <div className="w-full h-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] relative overflow-hidden rounded-[1px]">
            <div
              className="h-full bg-[var(--color-earth-accent)] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ==========================================================================
           CENTER: MULTI-LAYERED ARCHITECTURAL BUILDING CANVAS
           ========================================================================== */}
        <div className="relative z-10 my-auto w-full max-w-4xl mx-auto h-[55vh] sm:h-[62vh] flex items-center justify-center">
          
          {/* LAYER 0: Sky Grid & Ground Datum Baseline */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
            <div className="w-full flex justify-between font-mono text-[9px] text-[var(--color-concrete-mid)]">
              <span>+45.000m TOP LEV</span>
              <span>[ STRUCTURAL AXIS A-D ]</span>
            </div>
            {/* Ground Line Datum */}
            <div className="w-full flex items-center gap-2 border-t-2 border-dashed border-[var(--color-earth-accent-border)] pt-1">
              <span className="font-mono text-[10px] text-[var(--color-earth-accent)]">
                DATUM ±0.000m GROUND LEVEL
              </span>
              <div className="h-px flex-1 bg-[var(--color-border-stone)]" />
            </div>
          </div>

          {/* DUST PARTICLES LAYER */}
          <div
            ref={dustParticlesRef}
            className="absolute bottom-16 left-1/4 w-1/2 h-24 pointer-events-none z-10 opacity-0"
          >
            <div className="flex justify-around items-center h-full">
              <Sparkles className="w-4 h-4 text-[var(--color-earth-accent)] opacity-60 animate-ping" />
              <Sparkles className="w-3 h-3 text-[var(--color-concrete-light)] opacity-40 animate-pulse" />
              <Sparkles className="w-4 h-4 text-[var(--color-earth-accent)] opacity-50 animate-pulse" />
            </div>
          </div>

          {/* LAYER 1: Blueprint CAD Vector SVG Grid (Stage 1 & 2) */}
          <svg
            ref={blueprintGridRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-0 z-0"
            viewBox="0 0 800 600"
            fill="none"
          >
            {/* Axis Lines */}
            <line x1="100" y1="100" x2="100" y2="500" stroke="rgba(194,109,71,0.3)" strokeDasharray="4 4" />
            <line x1="300" y1="100" x2="300" y2="500" stroke="rgba(194,109,71,0.3)" strokeDasharray="4 4" />
            <line x1="500" y1="100" x2="500" y2="500" stroke="rgba(194,109,71,0.3)" strokeDasharray="4 4" />
            <line x1="700" y1="100" x2="700" y2="500" stroke="rgba(194,109,71,0.3)" strokeDasharray="4 4" />

            {/* Horizontal Datum Lines */}
            <line x1="100" y1="450" x2="700" y2="450" stroke="rgba(244,241,234,0.15)" strokeWidth="1" />
            <line x1="100" y1="350" x2="700" y2="350" stroke="rgba(244,241,234,0.15)" strokeWidth="1" />
            <line x1="100" y1="250" x2="700" y2="250" stroke="rgba(244,241,234,0.15)" strokeWidth="1" />
            <line x1="100" y1="150" x2="700" y2="150" stroke="rgba(244,241,234,0.15)" strokeWidth="1" />

            <text x="380" y="470" fill="rgba(194,109,71,0.8)" fontSize="10" fontFamily="JetBrains Mono">28.50m BREADTH</text>
            <text x="710" y="300" fill="rgba(244,241,234,0.5)" fontSize="10" fontFamily="JetBrains Mono">30.00m HEIGHT</text>
          </svg>

          {/* ==========================================================================
             WORKER 1: ARCHITECT / SURVEYOR (Foreground z-20, Ground Datum)
             ========================================================================== */}
          <div
            ref={worker1Ref}
            className="absolute bottom-6 left-12 z-20 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)] rounded-[2px] shadow-lg"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--color-earth-accent)] flex items-center justify-center text-white">
              <FileText className="w-3 h-3" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-[var(--color-earth-accent)] font-bold">[ W-01 ]</span> ARCHITECT // CAD PLAN
            </div>
          </div>

          {/* LAYER 2: Concrete Foundation Footing Slab (Stage 3) */}
          <div
            ref={foundationRef}
            className="absolute bottom-12 w-[70%] h-12 bg-[var(--color-concrete-dark)] border border-[var(--color-earth-accent-border)] opacity-0 flex items-center justify-around z-5"
          >
            <span className="font-mono text-[9px] text-[var(--color-earth-accent)]">FOOTING REBAR F1</span>
            <span className="font-mono text-[9px] text-[var(--color-earth-accent)]">CONCRETE SLAB C35</span>
            <span className="font-mono text-[9px] text-[var(--color-earth-accent)]">FOOTING REBAR F2</span>
          </div>

          {/* ==========================================================================
             WORKER 2: FOUNDATION ENGINEER (Midground z-10, Footing Slab)
             ========================================================================== */}
          <div
            ref={worker2Ref}
            className="absolute bottom-14 left-1/3 z-10 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px]"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-white">
              <Ruler className="w-3 h-3" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-emerald-400 font-bold">[ W-02 ]</span> FOUNDATION REBAR
            </div>
          </div>

          {/* LAYER 3: Structural Steel Columns / I-Beams (Stage 4) */}
          <div
            ref={columnsRef}
            className="absolute bottom-24 w-[65%] h-[55%] flex justify-between pointer-events-none z-5"
          >
            <div className="w-3 h-full bg-[var(--color-stone-700)] border-x border-[var(--color-earth-accent)]" />
            <div className="w-3 h-full bg-[var(--color-stone-700)] border-x border-[var(--color-earth-accent)]" />
            <div className="w-3 h-full bg-[var(--color-stone-700)] border-x border-[var(--color-earth-accent)]" />
            <div className="w-3 h-full bg-[var(--color-stone-700)] border-x border-[var(--color-earth-accent)]" />
          </div>

          {/* ==========================================================================
             WORKER 3: STEEL ERECTOR CLIMBER (Midground z-10, Vertical Column)
             ========================================================================== */}
          <div
            ref={worker3Ref}
            className="absolute bottom-24 left-[16%] z-10 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent)] rounded-[2px] shadow-lg"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--color-earth-accent)] flex items-center justify-center text-white">
              <Wrench className="w-3 h-3" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-[var(--color-earth-accent)] font-bold">[ W-03 ]</span> STEEL ERECTOR
            </div>
          </div>

          {/* LAYER 4: Multi-Tier Floor Slabs (Stage 5) */}
          <div
            ref={floorsRef}
            className="absolute bottom-24 w-[68%] h-[55%] flex flex-col justify-between pointer-events-none z-5"
          >
            <div className="w-full h-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border-stone)] flex items-center px-4 font-mono text-[8px] text-[var(--color-concrete-light)]">FLOOR 04 // ROOF SLAB</div>
            <div className="w-full h-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border-stone)] flex items-center px-4 font-mono text-[8px] text-[var(--color-concrete-light)]">FLOOR 03 // LEVEL 3</div>
            <div className="w-full h-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border-stone)] flex items-center px-4 font-mono text-[8px] text-[var(--color-concrete-light)]">FLOOR 02 // LEVEL 2</div>
            <div className="w-full h-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border-stone)] flex items-center px-4 font-mono text-[8px] text-[var(--color-concrete-light)]">FLOOR 01 // PODIUM</div>
          </div>

          {/* ==========================================================================
             WORKER 4: SCAFFOLDING SPECIALIST (Midground z-10, Floor 2 Scaffolding)
             ========================================================================== */}
          <div
            ref={worker4Ref}
            className="absolute bottom-40 left-1/4 z-10 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px]"
          >
            <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <HardHat className="w-3 h-3" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-amber-400 font-bold">[ W-04 ]</span> SCAFFOLDING
            </div>
          </div>

          {/* LAYER 5: Curtain Wall Glass Facade Grid (Stage 6) */}
          <div
            ref={facadeRef}
            className="absolute bottom-24 w-[65%] h-[52%] bg-gradient-to-tr from-[var(--color-earth-accent-muted)] via-cyan-950/20 to-transparent border-2 border-[var(--color-earth-accent-border)] grid grid-cols-4 grid-rows-3 gap-1 p-2 opacity-0 pointer-events-none z-10"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border border-[var(--color-border-stone)] bg-white/5 backdrop-blur-[2px]" />
            ))}
          </div>

          {/* ==========================================================================
             WORKER 5: UPPER FLOOR SUPERVISOR (Foreground z-20, Roof Slab Level 4)
             ========================================================================== */}
          <div
            ref={worker5Ref}
            className="absolute top-24 right-1/4 z-20 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)] rounded-[2px] shadow-lg"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--color-earth-accent)] flex items-center justify-center text-white">
              <UserCheck className="w-3 h-3" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-[var(--color-earth-accent)] font-bold">[ W-05 ]</span> ROOF SLAB SUPERVISOR
            </div>
          </div>

          {/* ==========================================================================
             WORKER 6: FACADE FINISHING SPECIALIST (Foreground z-20, Curtain Wall)
             ========================================================================== */}
          <div
            ref={worker6Ref}
            className="absolute top-36 left-1/3 z-20 opacity-0 pointer-events-none flex items-center gap-2 px-2.5 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px]"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]">
              <span className="text-cyan-400 font-bold">[ W-06 ]</span> FACADE FINISHER
            </div>
          </div>

          {/* LAYER 7: Tower Crane SVG (Stage 8) */}
          <div
            ref={craneRef}
            className="absolute -top-4 right-8 w-40 h-40 opacity-0 pointer-events-none z-15"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-earth-accent)]" fill="none" stroke="currentColor">
              <line x1="20" y1="90" x2="20" y2="10" strokeWidth="2" />
              <line x1="10" y1="20" x2="90" y2="20" strokeWidth="2" />
              <line x1="20" y1="20" x2="70" y2="60" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* LAYER 8: Final Photorealistic Architectural Render Revelation (Stage 9 & 10) */}
          <div
            ref={finalRenderRef}
            className="absolute bottom-20 w-[70%] h-[58%] rounded-[2px] overflow-hidden border-2 border-[var(--color-earth-accent)] shadow-2xl opacity-0 transition-opacity z-25"
          >
            <img
              src={CURATED_IMAGES.heroBg.url}
              alt="Final Architectural Delivery"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent p-4 flex flex-col justify-end">
              <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest">[ 100% COMPLETE ]</span>
              <h3 className="font-heading text-xl font-bold text-white">Kedar Tower One</h3>
            </div>
          </div>

        </div>

        {/* ==========================================================================
           BOTTOM: FLOATING MILESTONE LABELS BAR
           ========================================================================== */}
        <div className="relative z-30 max-w-[var(--container-wide)] mx-auto w-full pt-4 border-t border-[var(--color-border-stone)] flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase hidden sm:block">
            MILESTONE STAGES:
          </div>

          {/* Milestone Pills Matrix */}
          <div className="flex flex-wrap items-center gap-2">
            {MILESTONES.map((m) => {
              const isActive =
                progressPercent >= m.range[0] && progressPercent <= m.range[1];
              return (
                <div
                  key={m.id}
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-[2px] transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[var(--color-earth-accent)] text-white font-bold shadow-md'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-concrete-light)] border border-[var(--color-border-stone)]'
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  <span>{m.label}</span>
                </div>
              );
            })}
          </div>

          {/* Direct CTA shortcut when complete */}
          <LeadEnquiryButton
            variant="DISCUSS YOUR PROJECT"
            size="sm"
            buttonStyle="accent"
            analyticsCategory="Construction Section Pinned"
          />
        </div>
      </div>
    </div>

      {/* ==========================================================================
         DEDICATED MOBILE CONSTRUCTION STAGE EXPERIENCE (md:hidden)
         ========================================================================== */}
      <div className="md:hidden py-16 px-4 sm:px-6 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-stone)] arch-grid-bg">
        <div className="mb-6">
          <Eyebrow index="04" variant="accent" className="mb-2">
            CONSTRUCTION STAGE INSPECTOR
          </Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            EXECUTION <span className="text-[var(--color-earth-accent)] italic">PROGRESS.</span>
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-2">
            Tap stages below to inspect our 10-phase civil execution framework.
          </p>
        </div>

        {/* Stage Selector Pills (Tap-friendly 44px targets) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none snap-x snap-mandatory">
          {STAGES.map((st, idx) => {
            const isCurrent = currentStageIndex === idx + 1;
            return (
              <button
                key={st.num}
                onClick={() => setCurrentStageIndex(idx + 1)}
                className={`px-3.5 py-2 min-h-[44px] shrink-0 font-mono text-xs font-bold rounded-[2px] border transition-all snap-start cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--color-earth-accent)] text-white border-[var(--color-earth-accent)] shadow-md'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border-[var(--color-border-stone)]'
                }`}
              >
                <span>{st.num}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Stage Display Card */}
        <div className="arch-card p-5 rounded-[2px] border border-[var(--color-border-stone)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border-stone)] pb-3 font-mono text-xs">
            <span className="text-[var(--color-earth-accent)] font-bold">
              [ STAGE {currentStage.num} / 10 ]
            </span>
            <span className="text-[var(--color-concrete-light)] font-bold">
              {currentStage.milestone}
            </span>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-1">
              {currentStage.name}
            </h3>
            <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Precision civil engineering, structural testing, and milestone audit for {currentStage.name.toLowerCase()}.
            </p>
          </div>

          {/* Render image for current stage */}
          <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)]">
            <img
              src={CURATED_IMAGES.heroBg.url}
              alt={currentStage.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end">
              <span className="font-mono text-[9px] text-[var(--color-earth-accent)] font-bold uppercase tracking-wider">
                [ IS-CODE CERTIFIED EXECUTION ]
              </span>
            </div>
          </div>

          {/* Stage Progress Bar */}
          <div className="w-full h-1.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-[var(--color-earth-accent)] transition-all duration-300"
              style={{ width: `${(currentStageIndex / 10) * 100}%` }}
            />
          </div>

          {/* Touch-Friendly Action */}
          <div className="pt-2">
            <LeadEnquiryButton
              variant="DISCUSS YOUR PROJECT"
              size="lg"
              isFullWidth
              buttonStyle="accent"
              analyticsCategory="Construction Section Mobile"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionScrollSection;
