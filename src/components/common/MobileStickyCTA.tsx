import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl, trackLeadEvent } from '../../config/site.config';
import { LeadEnquiryButton } from './LeadEnquiryButton';

export const MobileStickyCTA: React.FC = () => {
  const telHref = `tel:${SITE_CONFIG.contact.tollFree.replace(/\s+/g, '')}`;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-t border-[var(--color-border-stone)] px-4 py-3 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
        {/* Call Helpline Button */}
        <a
          href={telHref}
          onClick={() => trackLeadEvent('Mobile Sticky Bar', 'click_call', 'Helpline')}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 px-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] active:border-[var(--color-earth-accent-border)] text-[var(--color-text-primary)] font-mono text-xs font-bold uppercase rounded-[2px] touch-target select-none arch-focus"
          aria-label="Call Helpline Desk"
        >
          <Phone className="w-3.5 h-3.5 text-[var(--color-earth-accent)] shrink-0" aria-hidden="true" />
          <span>Call Desk</span>
        </a>

        {/* WhatsApp Direct Action */}
        <a
          href={getWhatsAppUrl("Hello Kedar Properties, I want to inquire via mobile desk.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLeadEvent('Mobile Sticky Bar', 'click_whatsapp', 'WhatsApp Desk')}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 px-2.5 bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 font-mono text-xs font-bold uppercase rounded-[2px] touch-target select-none arch-focus"
          aria-label="WhatsApp Direct Desk"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        {/* Start Project CTA Button */}
        <LeadEnquiryButton
          variant="START A PROJECT"
          size="sm"
          buttonStyle="accent"
          analyticsCategory="Mobile Sticky Bar"
          className="flex-[1.2] !px-3"
        />
      </div>
    </aside>
  );
};

export default MobileStickyCTA;
