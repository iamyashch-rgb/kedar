import React, { useEffect, useRef } from 'react';
import { CURATED_IMAGES } from '../../config/image.config';
import { SITE_CONFIG } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { LeadEnquiryButton } from '../common/LeadEnquiryButton';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { HeroSocialPopup } from '../common/HeroSocialPopup';
import { ChevronDown, Compass } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx: gsap.Context | null = null;

    const playHeroEntrance = () => {
      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: 0.45, scale: 1 });
          if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
          if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { opacity: 1, y: 0 });
          if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { opacity: 1, y: 0 });
          if (descRef.current) gsap.set(descRef.current, { opacity: 1, y: 0 });
          if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
          if (indicatorRef.current) gsap.set(indicatorRef.current, { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Slow scale/parallax background image
        if (bgImageRef.current) {
          gsap.fromTo(
            bgImageRef.current,
            { scale: 1.12, opacity: 0 },
            { scale: 1.0, opacity: 0.45, duration: 2.0, ease: 'power2.out' }
          );
        }

        // 2. Eyebrow fade & slide upward
        if (eyebrowRef.current) {
          tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.1
          );
        }

        // 3. Headline words / lines animate into place
        if (headlineLine1Ref.current && headlineLine2Ref.current) {
          tl.fromTo(
            [headlineLine1Ref.current, headlineLine2Ref.current],
            { opacity: 0, y: 45 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
            '-=0.4'
          );
        }

        // 4. Description text reveal
        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
          );
        }

        // 5. Dual CTAs reveal
        if (ctaRef.current?.children) {
          tl.fromTo(
            Array.from(ctaRef.current.children),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
            '-=0.5'
          );
        }

        // 6. Indicator badge reveal
        if (indicatorRef.current) {
          tl.fromTo(
            indicatorRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
          );
        }

        // 7. Continuous subtle scroll animation
        if (scrollDotRef.current) {
          gsap.to(scrollDotRef.current, {
            y: 8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          });
        }
      }, heroRef);
    };

    window.addEventListener('pageLoaderComplete', playHeroEntrance);

    const heroFallbackTimer = setTimeout(() => {
      playHeroEntrance();
    }, 1500);

    return () => {
      window.removeEventListener('pageLoaderComplete', playHeroEntrance);
      clearTimeout(heroFallbackTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--color-bg-primary)] select-none"
    >
      {/* Background Architectural Image & Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          ref={bgImageRef}
          src={CURATED_IMAGES.heroBg.url}
          alt={CURATED_IMAGES.heroBg.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90 contrast-105"
        />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/60 to-[var(--color-bg-primary)]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/90 via-transparent to-[var(--color-bg-primary)]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#0A0A0C_90%)] opacity-80" />
      </div>

      {/* Structural Hairline Grid Lines & Crosshairs Overlay */}
      <ArchGridOverlay columns={4} showCrosshairs />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto w-full my-auto flex flex-col items-start justify-center">
        
        {/* Eyebrow / Category Tag */}
        <div ref={eyebrowRef} className="opacity-0 mb-6">
          <Eyebrow index="01" variant="accent">
            {isHindi ? 'देवभूमि उत्तराखंड • रियल एस्टेट एवं निर्माण' : 'DEVBHOOMI UTTARAKHAND • REALTY & CONSTRUCTION'}
          </Eyebrow>
        </div>

        {/* Large Editorial Headline (Single H1 for Semantic SEO Hierarchy) */}
        <h1 className="flex flex-col mb-6 sm:mb-8 max-w-full font-heading text-3xl sm:text-5xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] font-bold tracking-tight leading-[0.98] break-words">
          <span
            ref={headlineLine1Ref}
            className="opacity-0 text-[var(--color-text-primary)] block"
          >
            {t('hero_headline1')}
          </span>
          <span
            ref={headlineLine2Ref}
            className="opacity-0 text-[var(--color-earth-accent)] block mt-1 sm:mt-2"
          >
            {t('hero_headline2')}
          </span>
        </h1>

        {/* Concise Description with Organic Service Concepts */}
        <p
          ref={descRef}
          className="opacity-0 text-xs sm:text-base md:text-lg text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8"
        >
          {t('hero_subtitle')}
        </p>

        {/* Action CTAs: BUY PROPERTIES, SELL PROPERTIES & WHATSAPP ADVISORY */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8 sm:mb-10">
          <LeadEnquiryButton
            variant="BUY PROPERTIES"
            customText={t('hero_buy_properties')}
            size="md"
            buttonStyle="accent"
            analyticsCategory="Hero Section"
          />
          <LeadEnquiryButton
            variant="SELL YOUR PROPERTY"
            customText={t('hero_sell_properties')}
            size="md"
            buttonStyle="primary"
            analyticsCategory="Hero Section"
          />
          <LeadEnquiryButton
            variant="WHATSAPP ADVISORY"
            size="md"
            buttonStyle="whatsapp"
            customMessage={isHindi ? "नमस्ते केदार प्रॉपर्टीज, मैं उत्तराखंड में संपत्ति खरीदने या बेचने के संबंध में चर्चा करना चाहता हूं।" : "Hello Kedar Properties, I want to discuss buying or selling a property in Uttarakhand."}
            analyticsCategory="Hero Section"
          />
          <a
            href={SITE_CONFIG.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to Jai Baba Kedar Property YouTube Channel"
            className="inline-flex items-center justify-center font-mono uppercase font-bold tracking-wider rounded-[2px] transition-all duration-300 cursor-pointer touch-target select-none arch-focus px-5 py-2.5 min-h-[44px] text-xs sm:text-sm gap-2 bg-red-950/80 text-red-300 border border-red-700/60 hover:bg-red-900 hover:border-red-500 shadow-md"
          >
            <svg className="w-4 h-4 text-red-500 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>{isHindi ? 'यूट्यूब चैनल' : 'YOUTUBE CHANNEL'}</span>
          </a>
        </div>

        {/* Vertical Indicator Tag (City names removed) */}
        <div
          ref={indicatorRef}
          className="opacity-0 inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 bg-[var(--color-bg-tertiary)]/90 border border-[var(--color-border-stone)] rounded-[2px] font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-concrete-light)] uppercase select-none max-w-full"
        >
          <Compass className="w-3.5 h-3.5 text-[var(--color-earth-accent)] shrink-0" />
          <span>{isHindi ? 'उत्तराखंड • संपत्ति • भूमि • निर्माण कार्य' : 'UTTARAKHAND • PROPERTY • LAND • CONSTRUCTION'}</span>
        </div>
      </div>

      {/* Continuous Subtle Scroll Indicator */}
      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto w-full flex items-center justify-between pt-6 border-t border-[var(--color-border-stone)]/40 font-mono text-[10px] text-[var(--color-concrete-light)] uppercase tracking-widest">
        <div>[{isHindi ? 'रेरा पंजीकृत संस्थान' : 'RERA REGISTERED ENTERPRISE'}]</div>

        <a
          href="#services"
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-earth-accent)] transition-colors py-1 arch-focus"
          aria-label="Scroll to explore website sections"
        >
          <span>{isHindi ? 'स्क्रॉल करें' : 'SCROLL'}</span>
          <div className="w-5 h-8 border border-[var(--color-border-medium)] rounded-full flex items-start justify-center p-1">
            <div ref={scrollDotRef} className="w-1 h-2 bg-[var(--color-earth-accent)] rounded-full" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
        </a>

        <div className="hidden sm:block">[ 01 // {isHindi ? 'अवलोकन' : 'OVERVIEW'} ]</div>
      </div>

      {/* Floating Instagram & Facebook Social Popup */}
      <HeroSocialPopup />
    </section>
  );
};

export default HeroSection;
