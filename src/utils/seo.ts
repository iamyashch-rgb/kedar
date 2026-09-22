import { SITE_CONFIG } from '../config/site.config';

export function generateRealEstateSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.kedarproperties.in/#organization",
    "name": SITE_CONFIG.legalName,
    "alternateName": SITE_CONFIG.name,
    "description": "Kedar Properties is a premier real estate enterprise in India specializing in property buying and selling, land for sale, luxury apartments, and turnkey residential and commercial house construction.",
    "url": "https://www.kedarproperties.in",
    "logo": "https://www.kedarproperties.in/logo.png",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "telephone": SITE_CONFIG.contact.phone,
    "email": SITE_CONFIG.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.headquarters.address,
      "addressLocality": SITE_CONFIG.headquarters.city,
      "addressRegion": "Haryana",
      "postalCode": "122002",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4385,
      "longitude": 77.0984,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:30",
      "closes": "19:00",
    },
    "areaServed": SITE_CONFIG.regionalOffices.map((office) => office.city),
    "knowsAbout": [
      "Property dealer in India",
      "Property buying and selling",
      "Land for sale",
      "Luxury apartments",
      "Residential construction",
      "Commercial construction",
      "House construction",
      "Property development",
      ...SITE_CONFIG.businessScope,
    ],
    "sameAs": [
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.youtube,
      SITE_CONFIG.socials.facebook,
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.kedarproperties.in/#website",
    "url": "https://www.kedarproperties.in/",
    "name": "Kedar Properties",
    "description": "Premier property dealer in India offering verified property buying and selling, land for sale, apartments, and turnkey house construction.",
    "publisher": {
      "@id": "https://www.kedarproperties.in/#organization",
    },
    "inLanguage": "en-IN",
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kedarproperties.in/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Featured Properties",
        "item": "https://www.kedarproperties.in/#properties",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Land & Plot Dealing",
        "item": "https://www.kedarproperties.in/#land",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Turnkey Construction",
        "item": "https://www.kedarproperties.in/#construction",
      },
    ],
  };
}

export function generateServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kedar Properties Real Estate & Construction Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Property Dealer & Advisory",
        "description": "Professional property dealer services in India for seamless property buying and selling.",
      },
      {
        "@type": "OfferCatalog",
        "name": "Land & Plot Acquisition",
        "description": "Verified land for sale, freehold plot parcels, and commercial land dealing.",
      },
      {
        "@type": "OfferCatalog",
        "name": "Residential & Luxury Apartments",
        "description": "Luxury high-rise apartments, penthouses, and gated residential estates across core urban corridors.",
      },
      {
        "@type": "OfferCatalog",
        "name": "Turnkey Residential Construction",
        "description": "IS-code certified house construction, custom luxury villas, and residential engineering.",
      },
      {
        "@type": "OfferCatalog",
        "name": "Commercial Construction & Infrastructure",
        "description": "Grade-A corporate office towers, commercial construction, and retail plaza development.",
      },
      {
        "@type": "OfferCatalog",
        "name": "Property Development",
        "description": "Joint-venture development, master-planning CAD, and institutional capital execution.",
      },
    ],
  };
}

