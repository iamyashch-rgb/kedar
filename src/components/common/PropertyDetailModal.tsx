import React, { useState, useEffect, useRef } from 'react';
import type { PropertyItem } from '../../types/property';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';
import { LeadEnquiryButton } from './LeadEnquiryButton';
import { X, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export interface PropertyDetailModalProps {
  property: PropertyItem | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
}) => {
  const { t, isHindi } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset active image & focus close button when property changes
  useEffect(() => {
    setActiveImageIndex(0);
    setInquirySubmitted(false);
    if (property) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [property]);

  // Handle Focus Trap & Escape key to close modal
  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusables = modalContainerRef.current.querySelectorAll<HTMLElement>(
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
  }, [property, onClose]);

  if (!property) return null;

  const images = property.gallery && property.gallery.length > 0
    ? property.gallery
    : [property.featuredImage];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto select-none arch-grid-bg"
    >
      {/* Modal Container */}
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-5xl bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] rounded-[2px] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--color-border-stone)] bg-[var(--color-bg-secondary)] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-earth-accent)] uppercase tracking-widest px-2.5 py-1 bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent-border)]">
              {property.category}
            </span>
            <span className="font-mono text-xs text-[var(--color-concrete-light)] hidden sm:inline">
              [ {property.city} ]
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-[2px] bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] arch-focus cursor-pointer transition-colors"
            aria-label="Close modal window"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border-stone)]">
            <div>
              <h2
                id="property-modal-title"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-snug"
              >
                {property.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs text-[var(--color-concrete-light)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" aria-hidden="true" />
                <span>{property.locality}, {property.city}</span>

              </div>
            </div>

            {property.priceDisplay && (
              <div className="flex flex-col items-start md:items-end">
                <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase tracking-widest">
                  OFFERING PRICE
                </span>
                <span className="font-heading text-3xl font-extrabold text-[var(--color-earth-accent)]">
                  {property.priceDisplay}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Multi-Image Gallery */}
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)]">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[10px] text-[var(--color-earth-accent)] px-2 py-1 bg-[var(--color-bg-primary)]/90 border border-[var(--color-border-stone)]">
                VIEW {activeImageIndex + 1} OF {images.length}
              </span>
            </div>

            {/* Gallery Thumbnail Selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 shrink-0 rounded-[2px] overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[var(--color-earth-accent)] ring-1 ring-[var(--color-earth-accent)] opacity-100'
                        : 'border-[var(--color-border-stone)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail preview" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Architectural Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px]">
            <div>
              <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase block">{t('prop_area')}</span>
              <span className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{property.area}</span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase block">{t('prop_config')}</span>
              <span className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{property.configuration}</span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase block">{t('prop_availability')}</span>
              <span className="font-mono text-sm font-bold text-[var(--color-earth-accent)]">{property.availability}</span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase block">{t('prop_rera')}</span>
              <span className="font-mono text-xs font-semibold text-[var(--color-text-secondary)]">
                {property.reraId || (isHindi ? 'सत्यापित दस्तावेज' : 'Verified Title')}
              </span>
            </div>
          </div>

          {/* Editorial Description & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-heading text-lg font-bold text-[var(--color-text-primary)]">
                {t('specifications_overview')}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-normal">
                {property.description}
              </p>

              {property.highlights && property.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase block">
                    {t('key_highlights')}:
                  </span>
                  <div className="space-y-1.5">
                    {property.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Asset Inquiry Form */}
            <div className="lg:col-span-5 p-6 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[2px]">
              <h4 className="font-heading text-base font-bold text-[var(--color-text-primary)] mb-1">
                {t('modal_inquire_title')}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                {t('connect_advisory')}
              </p>

              {inquirySubmitted ? (
                <div className="p-4 bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent-border)] rounded-[2px] text-center space-y-2">
                  <ShieldCheck className="w-6 h-6 text-[var(--color-earth-accent)] mx-auto" />
                  <div className="font-mono text-xs font-bold text-[var(--color-text-primary)]">
                    {t('modal_submitted')}
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {isHindi ? 'हमारी टीम आपसे 2 कार्य घंटों के भीतर संपर्क करेगी।' : 'Our advisory desk will contact you within 2 business hours.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-3">
                  <div>
                    <label htmlFor="prop-modal-name" className="block font-mono text-[10px] text-[var(--color-text-secondary)] uppercase mb-1">
                      {t('form_name')}
                    </label>
                    <input
                      id="prop-modal-name"
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-xs text-[var(--color-text-primary)] font-body rounded-[2px] arch-focus"
                    />
                  </div>

                  <div>
                    <label htmlFor="prop-modal-phone" className="block font-mono text-[10px] text-[var(--color-text-secondary)] uppercase mb-1">
                      {t('form_phone')}
                    </label>
                    <input
                      id="prop-modal-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-xs text-[var(--color-text-primary)] font-mono rounded-[2px] arch-focus"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="sm"
                    isFullWidth
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {t('card_inquire')}
                  </Button>

                  <div className="pt-2">
                    <LeadEnquiryButton
                      variant="WHATSAPP ADVISORY"
                      size="sm"
                      isFullWidth
                      customMessage={`Hello Kedar Properties, I am interested in inquiring about "${property.title}" (${property.category}) in ${property.locality}, ${property.city}.`}
                      analyticsCategory="Property Detail Modal"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetailModal;
