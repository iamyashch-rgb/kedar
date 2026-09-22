import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';
import { ArrowRight, Compass, X, Menu, Phone, ShieldCheck, Globe } from 'lucide-react';
import gsap from 'gsap';
import logoImg from '../../assets/photo/logo-transparent.png';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // GSAP animation refs for mobile menu
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle Scroll Appearance Change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap & Escape key handler for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        triggerButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && menuOverlayRef.current) {
        const focusables = menuOverlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      triggerButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // GSAP Entrance & Exit Animations for Mobile Fullscreen Overlay
  useEffect(() => {
    if (mobileMenuOpen && menuOverlayRef.current) {
      // Create GSAP Timeline for menu opening
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      menuTimelineRef.current = tl;

      // 1. Overlay Fade & Slide In
      tl.fromTo(
        menuOverlayRef.current,
        { opacity: 0, y: '-2%' },
        { opacity: 1, y: '0%', duration: 0.4 }
      );

      // 2. Staggered Menu Links entrance
      if (menuLinksRef.current?.children) {
        tl.fromTo(
          Array.from(menuLinksRef.current.children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          '-=0.2'
        );
      }

      // 3. Footer / CTA entrance
      if (menuFooterRef.current) {
        tl.fromTo(
          menuFooterRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
          '-=0.2'
        );
      }
    }
  }, [mobileMenuOpen]);

  // Navigation Links Specification
  const navLinks = [
    { label: t('nav_about'), href: '#about', index: '01' },
    { label: t('nav_properties'), href: '#properties', index: '02' },
    { label: t('nav_land'), href: '#land', index: '03' },
    { label: t('nav_construction'), href: '#construction', index: '04' },
    { label: t('nav_process'), href: '#process', index: '05' },
    { label: t('nav_contact'), href: '#contact', index: '06' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-stone)] py-1.5 sm:py-2 shadow-2xl'
            : 'bg-transparent border-b border-transparent py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* ==========================================================================
             LEFT: COMPANY LOGO / BRAND NAME
             ========================================================================== */}
          <a
            href="#hero"
            className="flex items-center group arch-focus rounded-[2px] p-0.5 -ml-1 transition-opacity -mt-1 sm:-mt-1.5"
            aria-label={`${SITE_CONFIG.name} Home`}
          >
            <img
              src={logoImg}
              alt={SITE_CONFIG.name}
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(234,179,8,0.25)]"
            />
          </a>

          {/* ==========================================================================
             CENTER / RIGHT: DESKTOP NAVIGATION LINKS
             ========================================================================== */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-text-secondary)]"
          >
            {navLinks.map((link) => (
              <a
                key={link.index}
                href={link.href}
                className="arch-link-hover hover:text-[var(--color-text-primary)] py-1 flex items-center gap-1.5 arch-focus rounded-[2px]"
              >
                <span className="text-[10px] text-[var(--color-earth-accent)] opacity-70">
                  {link.index}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* ==========================================================================
             RIGHT: LANGUAGE SELECTOR & CTA BUTTON
             ========================================================================== */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector Toggle Pill */}
            <div
              className="flex items-center border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)] rounded-[2px] p-0.5 font-mono text-xs"
              aria-label={t('select_language')}
            >
              <Globe className="w-3.5 h-3.5 text-[var(--color-earth-accent)] mx-1.5 shrink-0" aria-hidden="true" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-[1px] transition-colors cursor-pointer font-mono ${
                  language === 'en'
                    ? 'bg-[var(--color-earth-accent)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-white'
                }`}
                aria-label="Switch to English language"
              >
                EN
              </button>
              <span className="text-[var(--color-border-stone)] px-0.5 text-[10px]">//</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-[1px] transition-colors cursor-pointer font-mono ${
                  language === 'hi'
                    ? 'bg-[var(--color-earth-accent)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-white'
                }`}
                aria-label="हिन्दी भाषा चुनें"
              >
                हिंदी
              </button>
            </div>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)]/60 hover:border-[var(--color-earth-accent)] text-[var(--color-earth-accent)] hover:text-white hover:bg-[var(--color-earth-accent)] font-mono text-xs font-semibold rounded-[2px] transition-all duration-300 flex items-center gap-2 arch-focus cursor-pointer shadow-sm group"
                title="Manage & Edit Properties - Admin Portal"
                aria-label="Open Admin Portal"
              >
                <div className="w-5 h-5 rounded-[2px] bg-[var(--color-earth-accent)]/20 text-[var(--color-earth-accent)] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                </div>
                <span className="tracking-wider uppercase">{t('nav_admin')}</span>
              </button>
            )}

            {/* Strong Primary CTA */}
            <a href="#contact" className="arch-focus rounded-[2px]">
              <Button
                variant="accent"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                {t('nav_start_project')}
              </Button>
            </a>
          </div>

          {/* ==========================================================================
             MOBILE: LANGUAGE SWITCH, ADMIN LOGO & HAMBURGER TOGGLE BUTTON
             ========================================================================== */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Admin Logo Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-[2px] bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)]/60 text-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent)] hover:text-white transition-colors arch-focus cursor-pointer"
                title="Admin Portal"
                aria-label="Open Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-[var(--color-earth-accent)] hover:text-white" />
              </button>
            )}

            {/* Mobile Compact Language Selector */}
            <div className="flex items-center border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)] rounded-[2px] p-0.5 font-mono text-[11px]">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-2 py-1 flex items-center gap-1 text-[var(--color-earth-accent)] font-bold cursor-pointer"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
                <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
              </button>
            </div>

            {/* Mobile Compact CTA */}
            <a href="#contact" className="sm:hidden arch-focus">
              <Button variant="accent" size="sm">
                Project
              </Button>
            </a>

            <button
              ref={triggerButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[2px] bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] arch-focus cursor-pointer touch-target"
              aria-expanded={mobileMenuOpen}
              aria-controls="fullscreen-mobile-menu"
              aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--color-earth-accent)]" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--color-text-primary)]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================================================
         FULLSCREEN MOBILE ARCHITECTURE STUDIO NAVIGATION OVERLAY
         ========================================================================== */}
      {mobileMenuOpen && (
        <div
          id="fullscreen-mobile-menu"
          ref={menuOverlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex flex-col justify-between p-5 sm:p-10 overflow-y-auto arch-grid-bg pb-safe"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-stone)]">
            <a href="#hero" onClick={handleLinkClick} className="flex items-center min-h-[44px]">
              <img
                src={logoImg}
                alt={SITE_CONFIG.name}
                className="h-14 sm:h-16 w-auto object-contain mix-blend-screen filter drop-shadow-[0_2px_14px_rgba(234,179,8,0.35)]"
              />
            </a>

            <div className="flex items-center gap-3">
              {/* Language Switcher inside Mobile Top Bar */}
              <div className="flex items-center border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)] rounded-[2px] p-1 font-mono text-xs">
                <Globe className="w-4 h-4 text-[var(--color-earth-accent)] mr-1.5" />
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-[1px] transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-[var(--color-earth-accent)] text-white font-bold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  EN
                </button>
                <span className="text-[var(--color-border-stone)] px-1">//</span>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2.5 py-1 rounded-[1px] transition-colors cursor-pointer ${
                    language === 'hi'
                      ? 'bg-[var(--color-earth-accent)] text-white font-bold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              <button
                ref={closeButtonRef}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[2px] bg-[var(--color-bg-tertiary)] text-[var(--color-earth-accent)] border border-[var(--color-earth-accent-border)] arch-focus cursor-pointer touch-target"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Center Links List */}
          <nav
            ref={menuLinksRef}
            aria-label="Mobile Menu Links"
            className="my-auto py-8 flex flex-col gap-2 max-w-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.index}
                href={link.href}
                onClick={handleLinkClick}
                className="group flex items-center justify-between py-3 border-b border-[var(--color-border-stone)] text-2xl sm:text-3xl font-heading font-bold text-[var(--color-text-primary)] hover:text-[var(--color-earth-accent)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-normal opacity-70">
                    {link.index} //
                  </span>
                  <span>{link.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-concrete-mid)] group-hover:text-[var(--color-earth-accent)] group-hover:translate-x-2 transition-all duration-300" />
              </a>
            ))}

            {onOpenAdmin && (
              <button
                onClick={() => {
                  handleLinkClick();
                  onOpenAdmin();
                }}
                className="group flex items-center justify-between py-3 border-b border-[var(--color-earth-accent-border)]/60 text-xl sm:text-2xl font-heading font-bold text-[var(--color-earth-accent)] hover:text-white transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[2px] bg-[var(--color-earth-accent)]/20 text-[var(--color-earth-accent)] group-hover:bg-[var(--color-earth-accent)] group-hover:text-white flex items-center justify-center transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>{t('nav_admin')}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-earth-accent)] group-hover:translate-x-2 transition-all duration-300" />
              </button>
            )}
          </nav>

          {/* Bottom Drawer Footer & CTA */}
          <div ref={menuFooterRef} className="pt-6 border-t border-[var(--color-border-stone)] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[var(--color-concrete-light)]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--color-earth-accent)]" />
                <span>[ NEW DELHI • MUMBAI ]</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Phone className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
                <span>Toll Free: {SITE_CONFIG.contact.tollFree}</span>
              </div>
            </div>

            {/* Mobile Drawer Strong CTA */}
            <a href="#contact" onClick={handleLinkClick} className="w-full">
              <Button
                variant="accent"
                size="lg"
                isFullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t('nav_start_project')}
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
