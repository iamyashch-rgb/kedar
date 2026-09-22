import React from 'react';
import { ArrowRight, MessageSquare, Send, Building2, MapPin, HardHat } from 'lucide-react';
import { getWhatsAppUrl, trackLeadEvent } from '../../config/site.config';

export type LeadCTAVariant =
  | 'ENQUIRE NOW'
  | 'ENQUIRE ABOUT THIS PROPERTY'
  | 'DISCUSS YOUR PROJECT'
  | 'FIND LAND'
  | 'START A PROJECT'
  | 'BUY PROPERTIES'
  | 'SELL PROPERTIES'
  | 'SELL YOUR PROPERTY'
  | 'WHATSAPP ADVISORY';

export interface LeadEnquiryButtonProps {
  variant?: LeadCTAVariant;
  actionType?: 'scroll_contact' | 'whatsapp' | 'custom';
  customText?: string;
  customMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  buttonStyle?: 'accent' | 'primary' | 'outline' | 'whatsapp';
  isFullWidth?: boolean;
  className?: string;
  analyticsCategory?: string;
  analyticsLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const LeadEnquiryButton: React.FC<LeadEnquiryButtonProps> = ({
  variant = 'ENQUIRE NOW',
  actionType = variant === 'WHATSAPP ADVISORY' ? 'whatsapp' : 'scroll_contact',
  customText,
  customMessage,
  size = 'md',
  buttonStyle = variant === 'WHATSAPP ADVISORY' ? 'whatsapp' : 'accent',
  isFullWidth = false,
  className = '',
  analyticsCategory = 'Lead Generation',
  analyticsLabel = variant,
  onClick,
}) => {
  const displayText = customText || variant;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // Analytics tracking
    trackLeadEvent(analyticsCategory, 'lead_cta_click', analyticsLabel);

    if (onClick) {
      onClick(e);
      return;
    }

    if (actionType === 'scroll_contact') {
      const target = document.getElementById('contact') || document.querySelector('footer');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Icon selector based on variant
  const renderIcon = () => {
    switch (variant) {
      case 'WHATSAPP ADVISORY':
        return <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" aria-hidden="true" />;
      case 'DISCUSS YOUR PROJECT':
        return <HardHat className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'FIND LAND':
        return <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'ENQUIRE ABOUT THIS PROPERTY':
        return <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'START A PROJECT':
        return <Send className="w-4 h-4 shrink-0" aria-hidden="true" />;
      default:
        return <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />;
    }
  };

  // Size styling
  const sizeClasses = {
    sm: 'px-3.5 py-2 min-h-[40px] text-xs gap-1.5',
    md: 'px-5 py-2.5 min-h-[44px] text-xs sm:text-sm gap-2',
    lg: 'px-6 sm:px-8 py-3.5 min-h-[50px] text-sm sm:text-base gap-2.5',
  }[size];

  // Button Style Variant
  const styleClasses = {
    accent:
      'bg-[var(--color-earth-accent)] text-white border border-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent-hover)] shadow-md',
    primary:
      'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border border-[var(--color-text-primary)] hover:bg-white font-bold shadow-md',
    outline:
      'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)]',
    whatsapp:
      'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900/90 hover:border-emerald-500 shadow-md',
  }[buttonStyle];

  const baseClasses = `inline-flex items-center justify-center font-mono uppercase font-bold tracking-wider rounded-[2px] transition-all duration-300 cursor-pointer touch-target select-none arch-focus ${sizeClasses} ${styleClasses} ${
    isFullWidth ? 'w-full' : ''
  } ${className}`;

  // Render WhatsApp Link
  if (actionType === 'whatsapp') {
    return (
      <a
        href={getWhatsAppUrl(customMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-analytics-category={analyticsCategory}
        data-analytics-action="whatsapp_click"
        data-analytics-label={analyticsLabel}
        className={baseClasses}
        aria-label={`${displayText} on WhatsApp`}
      >
        {renderIcon()}
        <span>{displayText}</span>
      </a>
    );
  }

  // Render Scroll / Trigger Action Button
  return (
    <a
      href="#contact"
      onClick={handleClick}
      data-analytics-category={analyticsCategory}
      data-analytics-action="lead_cta_click"
      data-analytics-label={analyticsLabel}
      className={baseClasses}
      aria-label={displayText}
    >
      <span>{displayText}</span>
      {renderIcon()}
    </a>
  );
};

export default LeadEnquiryButton;
