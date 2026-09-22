import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Mail, ArrowUpRight, Share2 } from 'lucide-react';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { LegalModal, type LegalModalType } from '../common/LegalModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoIconImg from '../../assets/photo/logo-icon-transparent.png';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  onOpenAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenAdmin }) => {
  const { t, isHindi } = useLanguage();
  const footerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle Architectural Line Animation on Scroll Entry
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Large Final Headline Reveal
      gsap.fromTo(
        '.footer-legacy-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const NAV_LINKS = [
    { label: t('nav_about'), href: '#about' },
    { label: t('nav_properties'), href: '#properties' },
    { label: t('nav_land'), href: '#land' },
    { label: t('nav_construction'), href: '#construction-scope' },
    { label: t('nav_process'), href: '#process' },
    { label: t('nav_contact'), href: '#contact' },
  ];

  return (
    <>
      <footer
        ref={footerRef}
        className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-t border-[var(--color-border-stone)] pt-20 pb-12 overflow-hidden"
      >
        {/* Animated Architectural Line Rule across the top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--color-border-stone)] overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-[var(--color-earth-accent)] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <ArchGridOverlay />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* Massive Editorial Final Statement */}
          <div className="footer-legacy-title border-b border-[var(--color-border-stone)] pb-12 space-y-4">
            <div className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-[0.25em]">
              {SITE_CONFIG.name} // {isHindi ? 'स्थापत्य विरासत' : 'ARCHITECTURAL LEGACY'}
            </div>

            <h2 className="font-heading text-4xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)] leading-[0.95] break-words">
              {t('footer_tagline_1')} <br />
              <span className="text-[var(--color-earth-accent)]">{t('footer_tagline_2')}</span>
            </h2>
          </div>

          {/* 3-Column Navigation & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-border-stone)]">
            {/* Col 1: Business Brand & Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider block">
                  {t('footer_identity')}
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={logoIconImg}
                    alt={SITE_CONFIG.name}
                    className="h-10 sm:h-12 w-auto object-contain mix-blend-screen filter drop-shadow-[0_4px_16px_rgba(234,179,8,0.35)]"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold uppercase text-[var(--color-text-primary)] leading-none">
                      {SITE_CONFIG.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase tracking-[0.2em] mt-1">
                      {SITE_CONFIG.subtagline}
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
                {isHindi ? 'भारत में प्रमुख संपत्ति डीलर, भूमि अधिग्रहण, लक्जरी आवास और टर्नकी सिविल निर्माण संस्थान।' : SITE_CONFIG.shortDescription}
              </p>
            </div>

            {/* Col 2: Navigation Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-mono text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-2">
                {t('footer_nav_title')}
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-[var(--color-text-secondary)]">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={`Navigate to ${link.label} section`}
                      className="hover:text-[var(--color-earth-accent)] transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact & Social Placeholders (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Contact Information Placeholders */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-2">
                  {t('footer_desk_title')}
                </h4>
                <div className="space-y-2.5 font-mono text-xs text-[var(--color-text-secondary)]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{SITE_CONFIG.headquarters.address}</span>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 hover:text-[var(--color-earth-accent)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-2 hover:text-[var(--color-earth-accent)] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>
              </div>

              {/* Social Link Placeholders */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" aria-hidden="true" />
                  <span>{t('footer_channels_title')}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] font-mono text-[10px] text-[var(--color-text-secondary)] rounded-[1px] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] transition-colors arch-focus"
                  >
                    [ INSTAGRAM ]
                  </a>
                  <a
                    href={SITE_CONFIG.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] font-mono text-[10px] text-[var(--color-text-secondary)] rounded-[1px] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] transition-colors arch-focus"
                  >
                    [ YOUTUBE ]
                  </a>
                  <a
                    href={SITE_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] font-mono text-[10px] text-[var(--color-text-secondary)] rounded-[1px] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] transition-colors arch-focus"
                  >
                    [ FACEBOOK ]
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[var(--color-text-tertiary)] gap-4">
            <div>
              © {new Date().getFullYear()} {SITE_CONFIG.legalName}. {t('footer_rights')}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[var(--color-earth-accent)] transition-colors arch-focus cursor-pointer"
              >
                {t('footer_privacy')}
              </button>
              <span className="text-[var(--color-border-stone)]">//</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-[var(--color-earth-accent)] transition-colors arch-focus cursor-pointer"
              >
                {t('footer_terms')}
              </button>
              {onOpenAdmin && (
                <>
                  <span className="text-[var(--color-border-stone)]">//</span>
                  <button
                    onClick={onOpenAdmin}
                    className="text-[var(--color-earth-accent)] hover:underline font-bold transition-colors arch-focus cursor-pointer"
                  >
                    [{t('nav_admin')}]
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
};

