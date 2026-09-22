import React, { useEffect, useRef } from 'react';
import { CURATED_IMAGES } from '../../config/image.config';
import { useLanguage } from '../../context/LanguageContext';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';
import { LeadEnquiryButton } from '../common/LeadEnquiryButton';
import { ArchGridOverlay, ArchHairline } from '../common/ArchGridLine';
import { Building2, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const clipImageContainerRef = useRef<HTMLDivElement>(null);
  const clipImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (clipImageContainerRef.current) {
        clipImageContainerRef.current.style.clipPath = 'none';
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Clip-Path Mask Reveal Animation for Image
      if (clipImageContainerRef.current && clipImageRef.current) {
        gsap.fromTo(
          clipImageContainerRef.current,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: clipImageContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          clipImageRef.current,
          { scale: 1.2 },
          {
            scale: 1.0,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: clipImageContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const LIFECYCLE_STEPS = isHindi
    ? [
        { index: '01', title: 'भूमि पहचान', desc: 'उच्च-लाभ वाली फ्रीहोल्ड भूमि और संयुक्त उद्यमों का अधिग्रहण।' },
        { index: '02', title: 'कानूनी जांच', desc: '30-वर्षीय कानूनी जांच और निर्बाध स्वामित्व हस्तांतरण।' },
        { index: '03', title: 'स्थापत्य योजना', desc: 'संरचनात्मक इंजीनियरिंग और मास्टर-प्लानिंग सीएडी ब्लूप्रिंट।' },
        { index: '04', title: 'टर्नकी निर्माण', desc: 'आईएस-कोड प्रमाणित सिविल निर्माण और सामग्री परीक्षण।' },
        { index: '05', title: 'प्रोजेक्ट ट्रैकिंग', desc: 'सख्त गुणवत्ता आश्वासन और चरणबद्ध निर्माण निगरानी।' },
        { index: '06', title: 'अंतिम वितरण', desc: 'रेरा हैंडओवर और दीर्घकालिक रखरखाव सहायता।' },
      ]
    : [
        { index: '01', title: 'Land Identification', desc: 'Sourcing high-yield freehold land parcels & joint-ventures.' },
        { index: '02', title: 'Property Transactions', desc: 'Clear 30-year legal due-diligence & title transfer.' },
        { index: '03', title: 'Architectural Planning', desc: 'Structural engineering & master-planning CAD blueprints.' },
        { index: '04', title: 'Turnkey Construction', desc: 'IS-code certified civil execution & material testing.' },
        { index: '05', title: 'Project Execution', desc: 'Strict milestone tracking & quality assurance audit.' },
        { index: '06', title: 'Final Delivery', desc: 'RERA handover & ongoing facility management.' },
      ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==========================================================================
           TWO-COLUMN EDITORIAL LAYOUT
           ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT COLUMN: Large Typography Statement & Clip-Path Image */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Eyebrow index="02" variant="accent" className="mb-6">
              {t('about_eyebrow')}
            </Eyebrow>

            <h2 className="font-heading text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] mb-8 text-[var(--color-text-primary)]">
              {t('about_title_1')} <br />
              <span className="text-[var(--color-earth-accent)] font-normal italic">
                {t('about_title_2')}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-normal max-w-xl mb-10">
              {t('about_desc')}
            </p>

            {/* Feature Clip-Path Mask Revealed Image */}
            <div
              ref={clipImageContainerRef}
              className="relative w-full aspect-[4/3] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] shadow-2xl bg-[var(--color-bg-card)] group"
            >
              <img
                ref={clipImageRef}
                src={CURATED_IMAGES.architecturalDrawing.url}
                alt="Kedar Properties Architectural CAD Blueprint, Property Development & House Construction Master-Planning"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-transparent to-transparent pointer-events-none p-6 flex flex-col justify-end">
                <p className="text-sm text-[var(--color-text-primary)] font-medium mt-1">
                  {isHindi ? 'मास्टर-प्लानिंग और सिविल इंजीनियरिंग उत्कृष्टता' : 'Master-Planning & Civil Blueprint Precision'}
                </p>
              </div>

              {/* Corner Crosshairs */}
              <span className="absolute top-3 left-3 font-mono text-xs text-[var(--color-earth-accent)] opacity-60">+</span>
              <span className="absolute bottom-3 right-3 font-mono text-xs text-[var(--color-earth-accent)] opacity-60">+</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Company Story & Lifecycle Steps Grid */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div className="p-8 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px]">
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                {isHindi ? 'संपूर्ण संपत्ति जीवनचक्र और विकास नियंत्रण' : 'Complete Property Lifecycle & Development Control'}
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {isHindi
                  ? 'पारंपरिक दलालों के विपरीत, केदार प्रॉपर्टीज संपूर्ण वैल्यू-चैन को नियंत्रित करती है। भूमि खरीद-बिक्री से लेकर वास्तुकला योजना, निर्माण और अंतिम डिलीवरी तक, हम 100% शीर्षक सुरक्षा की गारंटी देते हैं।'
                  : 'Unlike traditional real estate agents or isolated contractors, Kedar Properties commands the complete value chain. From raw land buying and selling and legal due-diligence to master-planning, residential & commercial construction, and final estate delivery, we guarantee 100% title security and structural excellence.'}
              </p>

              <ArchHairline variant="subtle" className="my-6" />

              {/* Lifecycle 6-Step Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIFECYCLE_STEPS.map((step) => (
                  <div
                    key={step.index}
                    className="p-4 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] transition-colors rounded-[2px] group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold">
                        {step.index} //
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-concrete-mid)] group-hover:text-[var(--color-earth-accent)] transition-colors" />
                    </div>
                    <div className="font-heading text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                      {step.title}
                    </div>
                    <div className="font-body text-xs text-[var(--color-text-muted)] leading-normal">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <LeadEnquiryButton
                variant="START A PROJECT"
                size="lg"
                buttonStyle="accent"
                analyticsCategory="About Section"
              />
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" icon={<Building2 className="w-4 h-4" />}>
                  {isHindi ? 'सेवाएं देखें' : 'Explore Services'}
                </Button>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
