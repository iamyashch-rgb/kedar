import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, FileText, Lock, Scale } from 'lucide-react';
import { ArchGridOverlay } from './ArchGridLine';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

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
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-4xl bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] rounded-[2px] overflow-hidden shadow-2xl my-auto text-[var(--color-text-primary)] max-h-[85vh] flex flex-col"
      >
        <ArchGridOverlay />

        {/* Top Header Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-stone)] backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            {isPrivacy ? (
              <Lock className="w-4 h-4 text-[var(--color-earth-accent)]" />
            ) : (
              <Scale className="w-4 h-4 text-[var(--color-earth-accent)]" />
            )}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] block font-bold">
                KEDAR PROPERTY // LEGAL DOCUMENTATION
              </span>
              <h2 id="legal-modal-title" className="font-heading text-lg sm:text-xl font-extrabold uppercase text-[var(--color-text-primary)]">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-earth-accent)] hover:text-white transition-all duration-300 text-[var(--color-text-secondary)] arch-focus"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-body text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <div className="p-4 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] flex items-center justify-between font-mono text-xs text-[var(--color-text-tertiary)]">
            <span>EFFECTIVE DATE: JANUARY 1, 2026</span>
            <span>STATUS: ACTIVE COMPLIANCE</span>
          </div>

          {isPrivacy ? (
            <div className="space-y-6">
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  1. Information Collection & Purpose
                </h3>
                <p>
                  Kedar Properties collects client information solely for real estate consultations, property inspections, land acquisition agreements, and architectural construction services. We collect personal details (such as full name, email address, phone number, and location preferences) strictly when willingly provided through our lead inquiry forms, consultation request modules, or direct correspondence.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  2. Data Security & Storage Standard
                </h3>
                <p>
                  We deploy enterprise-grade security protocols, encryption, and strict access control measures to protect client records, financial transactions, property deed records, and land documentation against unauthorized access, disclosure, alteration, or destruction.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  3. Non-Disclosure & Third-Party Sharing
                </h3>
                <p>
                  Your privacy is paramount. Kedar Properties does not sell, rent, or lease client data to third-party marketing companies. Information is shared strictly on a need-to-know basis with verified banking partners, government registration authorities, or legal consultants involved in your specific land or property transaction.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  4. Cookies & Digital Analytics
                </h3>
                <p>
                  Our web application uses minimalist performance cookies to maintain session states and improve website navigation. We do not track users across external third-party websites or construct invasive advertising profiles.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  5. Client Rights & Legal Inquiries
                </h3>
                <p>
                  Clients retain full rights to request access to their stored data, request corrections, or ask for data removal upon completion of contractual obligations. For privacy concerns or formal data requests, contact our legal desk at <span className="text-[var(--color-earth-accent)] font-mono">privacy@kedarproperties.com</span>.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing, browsing, or utilizing the web platform of Kedar Properties, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, along with all applicable local, national, and real estate regulation laws.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  2. Property Listings & Service Scope
                </h3>
                <p>
                  All property renders, land plot dimensions, architectural blueprints, and pricing estimates presented on this website serve as preliminary information. Formal property transfers, construction commitments, and land deal structures are finalized strictly through executed legal contracts and title verification.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  3. Intellectual Property Rights
                </h3>
                <p>
                  All content included on this website—such as text, architectural designs, logos, graphics, icons, digital downloads, and brand identities—is the exclusive property of Kedar Properties or its content suppliers and is protected under applicable copyright and intellectual property laws.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  4. Limitation of Liability
                </h3>
                <p>
                  Kedar Properties strives for absolute precision in all digital assets and disclosures. However, we shall not be held liable for indirect, incidental, or consequential damages resulting from website unavailability, temporary technical disruptions, or decisions made based on unverified preliminary site metrics.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)] uppercase flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  5. Governing Law & Jurisdiction
                </h3>
                <p>
                  These Terms & Conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising in connection with website usage or preliminary inquiries fall under the exclusive jurisdiction of the competent courts in Delhi NCR / Gurugram.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-stone)] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-[1px] transition-colors arch-focus"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
