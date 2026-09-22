export interface OfficeLocation {
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters?: boolean;
}

export interface SEOConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage: string;
  twitterHandle: string;
  locale: string;
}

export interface SiteConfig {
  // Business Identity
  name: string;
  legalName: string;
  shortName: string;
  monogramLetter: string;
  logoUrl: string;
  tagline: string;
  subtagline: string;
  description: string;
  shortDescription: string;
  reraRegistration: string;
  establishedYear: number;

  // Contact Channels
  contact: {
    tollFree: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    consultationEmail: string;
  };

  // Addresses & Locations
  headquarters: OfficeLocation & {
    street: string;
    state: string;
    pincode: string;
    country: string;
    geo: {
      latitude: number;
      longitude: number;
    };
  };
  regionalOffices: OfficeLocation[];

  // Social Links
  socials: {
    linkedin?: string;
    instagram: string;
    youtube: string;
    facebook: string;
    twitter: string;
  };

  // Service Areas
  serviceAreas: string[];

  // Business Scope & Services
  businessScope: string[];

  // Centralized SEO Configuration
  seo: SEOConfig;
}

/**
 * ============================================================================
 * KEDAR PROPERTIES - CENTRALIZED BUSINESS OWNER CONFIGURATION
 * ============================================================================
 * BUSINESS OWNER INSTRUCTIONS:
 * Modify the values in this file to update your business details, contact information,
 * office addresses, social links, service areas, and SEO metadata across the ENTIRE website.
 * 
 * Changing any property here automatically updates:
 * - Header, Footer, and Navigation menus
 * - Hero section statements and contact channels
 * - WhatsApp instant chat & lead enquiry forms
 * - Contact section address cards
 * - SEO Title tags, Meta Description, Open Graph & Twitter Card social previews
 * - Schema.org JSON-LD Structured Data for Google Search
 * ============================================================================
 */
export const SITE_CONFIG: SiteConfig = {
  /**
   * --------------------------------------------------------------------------
   * 1. BUSINESS IDENTITY
   * --------------------------------------------------------------------------
   */
  // BUSINESS OWNER CONFIGURATION: Replace with your official brand name
  name: "Kedar Property",

  // BUSINESS OWNER CONFIGURATION: Replace with your legally registered entity name
  legalName: "Kedar Property & Realty Developers Ltd.",

  // BUSINESS OWNER CONFIGURATION: Short display name used in compact mobile bars
  shortName: "Kedar",

  // BUSINESS OWNER CONFIGURATION: Single letter logo monogram shown in the box header logo (e.g. 'K')
  monogramLetter: "K",
  logoUrl: "/logo-transparent.png",

  // BUSINESS OWNER CONFIGURATION: Primary company slogan / tagline
  tagline: "Building Heritage & Premier Property Dealing in Uttarakhand",

  // BUSINESS OWNER CONFIGURATION: Secondary architectural subtagline
  subtagline: "Buy & Sell Properties, Land & Construction in Uttarakhand",

  // BUSINESS OWNER CONFIGURATION: Full editorial business description (used in About section and SEO)
  description: "Uttarakhand's premier property dealer and realty conglomerate specializing in buying and selling residential properties, luxury villas, mountain plots, land acquisition, and turnkey civil house construction across Dehradun, Mussoorie, Rishikesh, Haridwar, Nainital, and Bhimtal.",

  // BUSINESS OWNER CONFIGURATION: Short concise description for meta tags and footer overview
  shortDescription: "Premier property dealer in Uttarakhand offering verified property buying, selling, land dealing in Dehradun, Rishikesh & Mussoorie, and turnkey construction.",

  // BUSINESS OWNER CONFIGURATION: Official RERA registration number
  reraRegistration: "UKRERA/PRJ/DEHRADUN/2026/08912",

  // BUSINESS OWNER CONFIGURATION: Year the company was established
  establishedYear: 2008,

  /**
   * --------------------------------------------------------------------------
   * 2. CONTACT CHANNELS
   * --------------------------------------------------------------------------
   */
  contact: {
    // BUSINESS OWNER CONFIGURATION: Toll-free / Helpline number
    tollFree: "+91 70601 20106",

    // BUSINESS OWNER CONFIGURATION: Primary phone number (E.164 format with country code for tel: links)
    phone: "+917060120106",

    // BUSINESS OWNER CONFIGURATION: Human-readable phone display format (10-digit number)
    phoneDisplay: "+91 70601 20106",

    // BUSINESS OWNER CONFIGURATION: WhatsApp number with country code without spaces
    whatsapp: "+917060120106",

    // BUSINESS OWNER CONFIGURATION: Human-readable WhatsApp number display (10-digit number)
    whatsappDisplay: "+91 70601 20106",

    // BUSINESS OWNER CONFIGURATION: Primary business enquiry email address
    email: "kedarproperty43@gmail.com",

    // BUSINESS OWNER CONFIGURATION: Advisory / consultation email address
    consultationEmail: "kedarproperty43@gmail.com",
  },

  /**
   * --------------------------------------------------------------------------
   * 3. CORPORATE HEADQUARTERS & ADDRESSES
   * --------------------------------------------------------------------------
   */
  headquarters: {
    city: "Pithoragarh (Uttarakhand)",
    region: "Uttarakhand Main Office",
    address: "Kedarproperty, 1st Floor Utkarsh Bank, Near Astha Coaching, Link Road, Pithoragarh, Uttarakhand 262501",
    street: "1st Floor Utkarsh Bank, Near Astha Coaching, Link Road",
    state: "Uttarakhand",
    pincode: "262501",
    country: "India",
    phone: "+91 70601 20106",
    email: "kedarproperty43@gmail.com",
    isHeadquarters: true,
    // BUSINESS OWNER CONFIGURATION: Geographic coordinates for Google Maps & Schema.org
    geo: {
      latitude: 29.5829,
      longitude: 80.2182,
    },
  },

  // BUSINESS OWNER CONFIGURATION: List of regional offices across active markets
  regionalOffices: [
    {
      city: "Dehradun",
      region: "Garhwal Regional Office",
      address: "Rajpur Road Heights, Dehradun, Uttarakhand 248001",
      phone: "+91 70601 20106",
      email: "kedarproperty43@gmail.com",
    },
    {
      city: "Rishikesh",
      region: "Ganges Valley Desk",
      address: "Tapovan Ganges Promenade, Rishikesh, Uttarakhand 249192",
      phone: "+91 63970 08988",
      email: "kedarproperty43@gmail.com",
    },
    {
      city: "Nainital / Haldwani",
      region: "Kumaon Regional Desk",
      address: "Bareilly-Nainital Road, Haldwani, Uttarakhand 263139",
      phone: "+91 70601 20106",
      email: "kedarproperty43@gmail.com",
    },
  ],

  /**
   * --------------------------------------------------------------------------
   * 4. SOCIAL MEDIA LINKS
   * --------------------------------------------------------------------------
   */
  socials: {
    linkedin: "",

    // BUSINESS OWNER CONFIGURATION: Official Instagram handle URL
    instagram: "https://www.instagram.com/propertykedar?stkn=MTRvNHJ3NzV3eTUzbw==",

    // BUSINESS OWNER CONFIGURATION: Official YouTube channel URL
    youtube: "https://youtube.com/@jaibabakedarproperty?si=roOF7gXxwjYHbl87",

    // BUSINESS OWNER CONFIGURATION: Official Facebook page URL
    facebook: "https://www.facebook.com/share/1Em8jLrbGg/",

    // BUSINESS OWNER CONFIGURATION: Official Twitter / X profile URL
    twitter: "https://twitter.com/kedarproperties",
  },

  /**
   * --------------------------------------------------------------------------
   * 5. SERVICE AREAS & REGIONAL COVERAGE
   * --------------------------------------------------------------------------
   */
  // BUSINESS OWNER CONFIGURATION: Primary geographic regions and cities served
  serviceAreas: [
    "Dehradun",
    "Mussoorie",
    "Rishikesh",
    "Haridwar",
    "Nainital",
    "Bhimtal",
    "Haldwani",
    "Almora",
    "Uttarakhand",
    "Delhi NCR",
  ],

  /**
   * --------------------------------------------------------------------------
   * 6. BUSINESS SCOPE & DIVISIONS
   * --------------------------------------------------------------------------
   */
  // BUSINESS OWNER CONFIGURATION: Core business scope services
  businessScope: [
    "Buy Properties in Uttarakhand",
    "Sell Your Property in Uttarakhand",
    "Residential Plots & Hill Land Acquisition",
    "Luxury Cottages & Mountain Villas",
    "Commercial Real Estate in Dehradun & Rishikesh",
    "Property Valuation & Legal Title Registration",
    "Turnkey Building Construction in Uttarakhand",
    "Hill Contour Engineering & Retaining Walls",
    "Resort & Cottage Construction",
    "Property Management & Advisory",
  ],

  /**
   * --------------------------------------------------------------------------
   * 7. SEARCH ENGINE OPTIMIZATION (SEO) & OPEN GRAPH PREVIEWS
   * --------------------------------------------------------------------------
   */
  seo: {
    // BUSINESS OWNER CONFIGURATION: Primary domain URL of the production website (with trailing slash)
    siteUrl: "https://www.kedarproperties.in/",

    // BUSINESS OWNER CONFIGURATION: Default browser tab title tag
    defaultTitle: "Kedar Property | Buy & Sell Properties in Uttarakhand, Land & Turnkey Construction",

    // BUSINESS OWNER CONFIGURATION: Title template used for subpages / modals (%s replaced by subpage title)
    titleTemplate: "%s | Kedar Property Uttarakhand",

    // BUSINESS OWNER CONFIGURATION: Default meta description for Google Search index
    defaultDescription: "Kedar Property is Uttarakhand's premier property dealer. Buy & sell properties, plots, luxury villas, and commercial land in Dehradun, Rishikesh, Mussoorie, and Nainital with 100% verified legal titles and turnkey construction.",

    // BUSINESS OWNER CONFIGURATION: Primary SEO keywords list
    defaultKeywords: [
      "buy property in Uttarakhand",
      "sell property in Uttarakhand",
      "property dealer in Dehradun",
      "plots for sale in Rishikesh",
      "villas in Mussoorie",
      "land for sale in Uttarakhand",
      "house construction in Dehradun",
      "Kedar Property Uttarakhand",
      "buy land in Bhimtal Nainital",
      "UKRERA approved plots",
    ],

    // BUSINESS OWNER CONFIGURATION: Default Open Graph social sharing image URL (1200x630px)
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",

    // BUSINESS OWNER CONFIGURATION: Twitter / X handle (e.g. '@kedarproperties')
    twitterHandle: "@kedarproperties",

    // BUSINESS OWNER CONFIGURATION: Locale specification
    locale: "en_IN",
  },
};

/**
 * Helper to generate a pre-filled WhatsApp link consuming SITE_CONFIG.contact.whatsapp
 */
export const getWhatsAppUrl = (customMessage?: string): string => {
  const rawNumber = SITE_CONFIG.contact.whatsapp || SITE_CONFIG.contact.phone;
  // Clean all non-numeric characters for wa.me formatting
  const cleanPhone = rawNumber.replace(/\D/g, '');
  const defaultMessage = `Hello ${SITE_CONFIG.name}, I would like to enquire about your real estate and construction services.`;
  const message = customMessage || defaultMessage;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Global analytics event tracking helper for lead generation CTAs
 */
export const trackLeadEvent = (category: string, action: string, label: string): void => {
  if (import.meta.env.DEV) {
    console.log(`[Lead Analytics Tracked] Category: ${category} | Action: ${action} | Label: ${label}`);
  }
  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: 'lead_cta_click',
        ctaCategory: category,
        ctaAction: action,
        ctaLabel: label,
      });
    }
  }
};
