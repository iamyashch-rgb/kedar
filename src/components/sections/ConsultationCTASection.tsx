import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG, getWhatsAppUrl } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { Eyebrow } from '../common/Eyebrow';
import { Button } from '../common/Button';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { CURATED_IMAGES } from '../../config/image.config';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MapPin, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  interests: string[];
  projectRequirement: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

// API-Ready submission function (ready to connect to REST backend)
export const submitContactEnquiry = async (data: ContactFormData): Promise<{ success: boolean; refId: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (import.meta.env.DEV) {
    console.log('[API Payload Submitted]:', JSON.stringify(data, null, 2));
  }

  // Generate mock CAD reference code
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return {
    success: true,
    refId: `KEDAR-ENQ-${randomNum}`,
  };
};

export const ConsultationCTASection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    interests: ['Construction', 'Buying Property'],
    projectRequirement: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; refId: string } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const INTEREST_OPTIONS = isHindi
    ? ['संपत्ति खरीद', 'संपत्ति बिक्री', 'भूमि व प्लॉट', 'अपार्टमेंट', 'विला / स्वतंत्र मकान', 'वाणिज्यिक संपत्ति', 'भवन निर्माण', 'नवीनीकरण', 'अन्य']
    : ['Buying Property', 'Selling Property', 'Land', 'Apartment', 'House', 'Commercial Property', 'Construction', 'Renovation', 'Other'];

  // GSAP Viewport Entry Reveal Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic Headline Reveal
      gsap.fromTo(
        '.contact-headline',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Sequential Form Fields Animate Upward
      const fields = gsap.utils.toArray<HTMLElement>('.animate-field');
      gsap.fromTo(
        fields,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Toggle interest pill selection
  const toggleInterest = (option: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(option);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((item) => item !== option) };
      } else {
        return { ...prev, interests: [...prev.interests, option] };
      }
    });
  };

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = isHindi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name (minimum 2 characters)';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    const isValid10DigitPhone = digitsOnly.length === 10 || (digitsOnly.length === 12 && digitsOnly.startsWith('91'));
    if (!formData.phone.trim() || !isValid10DigitPhone) {
      newErrors.phone = isHindi ? 'कृपया 10 अंकों का वैध फोन नंबर दर्ज करें' : 'Please enter a valid 10-digit phone number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = isHindi ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await submitContactEnquiry(formData);
      setSubmissionResult(result);
    } catch (err) {
      console.error('Submission Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      interests: ['Construction', 'Buying Property'],
      projectRequirement: '',
      message: '',
    });
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Large Full-Bleed Architectural Background Image with Vignette */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src={CURATED_IMAGES.heroBg.url}
          alt="Architectural Backdrop"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-[var(--color-bg-primary)]" />
      </div>

      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Dramatic Section Header */}
        <div className="contact-headline space-y-4 max-w-3xl border-b border-[var(--color-border-stone)] pb-8">
          <Eyebrow index="11">{t('cta_eyebrow')}</Eyebrow>

          <h2 className="font-heading text-3xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)] leading-[1.05]">
            {t('cta_title')}
          </h2>

          <p className="font-body text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {t('cta_subtitle')}
          </p>
        </div>

        {/* Contact Layout: Left Info & Direct Channels + Right Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Options */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-widest block">
                DIRECT CONTACT CHANNELS
              </span>
              <h3 className="font-heading text-2xl font-bold uppercase text-[var(--color-text-primary)]">
                CONNECT WITH US DIRECTLY
              </h3>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* Call Option */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="p-5 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] rounded-[2px] transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-[var(--color-earth-accent)] rounded-[1px] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    DIRECT CALL / HELPLINE
                  </span>
                  <span className="font-mono text-base font-bold text-[var(--color-text-primary)] block group-hover:text-[var(--color-earth-accent)] transition-colors">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* WhatsApp Option */}
              <a
                href={getWhatsAppUrl("Hello Kedar Properties, I would like to discuss a project / property requirement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] rounded-[2px] transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-emerald-500 rounded-[1px] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    WHATSAPP INSTANT DESK
                  </span>
                  <span className="font-mono text-base font-bold text-[var(--color-text-primary)] block group-hover:text-[var(--color-earth-accent)] transition-colors">
                    {SITE_CONFIG.contact.whatsappDisplay} (CHAT NOW)
                  </span>
                </div>
              </a>

              {/* Email Option */}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="p-5 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] rounded-[2px] transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-[var(--color-earth-accent)] rounded-[1px] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    OFFICIAL ENQUIRY EMAIL
                  </span>
                  <span className="font-mono text-base font-bold text-[var(--color-text-primary)] block group-hover:text-[var(--color-earth-accent)] transition-colors">
                    {SITE_CONFIG.contact.email}
                  </span>
                </div>
              </a>
            </div>

            {/* Studio Address Notice */}
            <div className="p-5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase">
                <MapPin className="w-4 h-4" />
                <span>ARCHITECTURAL DESK & CORPORATE STUDIO</span>
              </div>
              <p className="font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {SITE_CONFIG.headquarters.address}
              </p>
            </div>
          </div>

          {/* Right Column: Premium Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px] p-6 sm:p-10 shadow-2xl relative">
            {submissionResult?.success ? (
              /* Success State Card */
              <div className="py-12 px-4 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent-border)] flex items-center justify-center mx-auto text-[var(--color-earth-accent)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-widest block">
                    [ DOSSIER RECEIVED // {submissionResult.refId} ]
                  </span>
                  <h3 className="font-heading text-3xl font-extrabold uppercase text-[var(--color-text-primary)]">
                    ENQUIRY LOGGED SUCCESSFULLY
                  </h3>
                  <p className="font-body text-base text-[var(--color-text-secondary)] max-w-md mx-auto">
                    Thank you, <strong className="text-[var(--color-text-primary)]">{formData.name}</strong>. A senior real estate & construction advisor will review your requirement and reach out within 2 business hours.
                  </p>
                </div>

                <div className="p-4 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] font-mono text-xs text-[var(--color-text-tertiary)] max-w-sm mx-auto">
                  RERA REGISTERED ADVISORY // CONFIDENTIAL HANDLING
                </div>

                <Button variant="outline" size="sm" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
              </div>
            ) : (
              /* Interactive Form */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
                <div className="flex items-center justify-between border-b border-[var(--color-border-stone)] pb-4">
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-widest">
                    01 // PROJECT ENQUIRY FORM
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase">
                    * REQUIRED FIELDS
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-field space-y-1.5">
                    <label htmlFor="cta-form-name" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                      Full Name *
                    </label>
                    <input
                      id="cta-form-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-errormessage={errors.name ? 'cta-error-name' : undefined}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Vikramaditya Sharma"
                      className={`w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border rounded-[1px] font-body text-base sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none transition-colors arch-focus ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-border-stone)] focus:border-[var(--color-earth-accent)]'
                      }`}
                    />
                    {errors.name && (
                      <span id="cta-error-name" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="animate-field space-y-1.5">
                    <label htmlFor="cta-form-phone" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                      Phone Number *
                    </label>
                    <input
                      id="cta-form-phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-errormessage={errors.phone ? 'cta-error-phone' : undefined}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="10-digit mobile number (e.g. 7060120106)"
                      className={`w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border rounded-[1px] font-body text-base sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none transition-colors arch-focus ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-border-stone)] focus:border-[var(--color-earth-accent)]'
                      }`}
                    />
                    {errors.phone && (
                      <span id="cta-error-phone" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-field space-y-1.5">
                    <label htmlFor="cta-form-email" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                      Email Address *
                    </label>
                    <input
                      id="cta-form-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-errormessage={errors.email ? 'cta-error-email' : undefined}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border rounded-[1px] font-body text-base sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none transition-colors arch-focus ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-border-stone)] focus:border-[var(--color-earth-accent)]'
                      }`}
                    />
                    {errors.email && (
                      <span id="cta-error-email" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="animate-field space-y-1.5">
                    <label htmlFor="cta-form-city" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                      City / Location
                    </label>
                    <input
                      id="cta-form-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Noida, Gurugram, Mumbai"
                      className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] font-body text-base sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-earth-accent)] transition-colors arch-focus"
                    />
                  </div>
                </div>

                {/* I'm Interested In Multi-Select Pills */}
                <fieldset className="animate-field space-y-2 border-0 p-0 m-0">
                  <legend className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold p-0 mb-1">
                    I'M INTERESTED IN:
                  </legend>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {INTEREST_OPTIONS.map((option) => {
                      const isSelected = formData.interests.includes(option);
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => toggleInterest(option)}
                          aria-pressed={isSelected}
                          className={`px-3.5 py-2 min-h-[44px] font-mono text-xs uppercase rounded-[1px] border transition-all duration-300 touch-target cursor-pointer arch-focus ${
                            isSelected
                              ? 'bg-[var(--color-earth-accent)] text-white border-[var(--color-earth-accent)] font-bold shadow-md'
                              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)]'
                          }`}
                        >
                          {option} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Project / Requirement */}
                <div className="animate-field space-y-1.5">
                  <label htmlFor="cta-form-requirement" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                    Project / Requirement Title
                  </label>
                  <input
                    id="cta-form-requirement"
                    type="text"
                    value={formData.projectRequirement}
                    onChange={(e) => setFormData({ ...formData, projectRequirement: e.target.value })}
                    placeholder="e.g. 4-BHK Residence Construction or 5-Acre Land Purchase"
                    className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] font-body text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-earth-accent)] transition-colors arch-focus"
                  />
                </div>

                {/* Message */}
                <div className="animate-field space-y-1.5">
                  <label htmlFor="cta-form-message" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                    Message & Specific Details
                  </label>
                  <textarea
                    id="cta-form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify budget, square footage, site location, timeline expectations..."
                    className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] font-body text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-earth-accent)] transition-colors arch-focus"
                  />
                </div>

                {/* Submit Button */}
                <div className="animate-field pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isFullWidth
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )
                    }
                  >
                    {isSubmitting ? 'LOGGING ENQUIRING...' : 'START THE CONVERSATION'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
