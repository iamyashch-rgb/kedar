import React, { useEffect, useState, useRef } from 'react';
import type { ProjectItem } from '../../types/project';
import { X, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { LeadEnquiryButton } from './LeadEnquiryButton';
import { ArchGridOverlay } from './ArchGridLine';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (project) {
      setActiveImage(project.image || (project.images && project.images[0]) || '');
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-5xl bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] rounded-[2px] overflow-hidden shadow-2xl my-auto text-[var(--color-text-primary)]"
      >
        <ArchGridOverlay />

        {/* Top Header Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-stone)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-earth-accent)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
              {project.id} // {project.yearStatus}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-earth-accent)] hover:text-white transition-all duration-300 text-[var(--color-text-secondary)] arch-focus"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-10 custom-scrollbar">
          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] font-mono text-xs uppercase text-[var(--color-earth-accent)] rounded-[1px]">
                {project.type}
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-[var(--color-text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
                {project.location}
              </span>
            </div>

            <h2
              id="modal-project-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]"
            >
              {project.title}
            </h2>
          </div>

          {/* Main Showcase Image & Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-[var(--color-border-stone)] bg-black">
              <img
                src={activeImage || project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md font-mono text-xs text-[var(--color-concrete-light)] border border-white/10">
                [ CAD REF: {project.id.toUpperCase()} // HIGH RES VIEW ]
              </div>
            </div>

            {/* Gallery Thumbnail Selector */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {project.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-24 h-16 shrink-0 rounded-[1px] overflow-hidden border transition-all duration-300 ${
                      activeImage === imgUrl
                        ? 'border-[var(--color-earth-accent)] ring-2 ring-[var(--color-earth-accent)] scale-105'
                        : 'border-[var(--color-border-stone)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px]">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)] block uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[var(--color-earth-accent)] block">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] border-b border-[var(--color-border-stone)] pb-2">
                01 // ARCHITECTURAL & ENGINEERING NARRATIVE
              </h3>
              <p className="font-body text-base text-[var(--color-text-secondary)] leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Scope & Details Column */}
            <div className="space-y-6 p-6 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[2px]">
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] block uppercase mb-1">
                  Architect of Record
                </span>
                <span className="font-heading font-semibold text-sm text-[var(--color-text-primary)]">
                  {project.architect || 'Kedar Design Bureau'}
                </span>
              </div>

              {project.scope && project.scope.length > 0 && (
                <div>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)] block uppercase mb-2">
                    Execution Scope
                  </span>
                  <ul className="space-y-2">
                    {project.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-earth-accent)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-[var(--color-border-stone)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-[var(--color-text-tertiary)]">
              FOR PROJECT DOSSIERS & INVESTMENT ENQUIRIES
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto">
                Close
              </Button>
              <LeadEnquiryButton
                variant="DISCUSS YOUR PROJECT"
                size="sm"
                buttonStyle="accent"
                analyticsCategory="Project Detail Modal"
                onClick={() => onClose()}
              />
              <LeadEnquiryButton
                variant="WHATSAPP ADVISORY"
                size="sm"
                buttonStyle="whatsapp"
                customMessage={`Hello Kedar Properties, I want to inquire about portfolio project "${project.title}" (${project.location}).`}
                analyticsCategory="Project Detail Modal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
