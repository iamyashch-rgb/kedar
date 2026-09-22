import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site.config';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
}) => {
  const seoTitle = title || SITE_CONFIG.seo.defaultTitle;
  const seoDescription = description || SITE_CONFIG.seo.defaultDescription;
  const seoKeywords = (keywords || SITE_CONFIG.seo.defaultKeywords).join(', ');
  const seoCanonical = canonicalUrl || SITE_CONFIG.seo.siteUrl;
  const seoOgImage = ogImage || SITE_CONFIG.seo.ogImage;

  useEffect(() => {
    // 1. Update Document Title
    document.title = seoTitle;

    // Helper function to update or create a meta element
    const updateMetaTag = (nameAttr: string, attrValue: string, contentValue: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', contentValue);
    };

    // Helper function to update link element
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', seoDescription);
    updateMetaTag('name', 'keywords', seoKeywords);
    updateLinkTag('canonical', seoCanonical);

    // 3. Open Graph (FB/WhatsApp/LinkedIn) Meta Tags
    updateMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:title', seoTitle);
    updateMetaTag('property', 'og:description', seoDescription);
    updateMetaTag('property', 'og:url', seoCanonical);
    updateMetaTag('property', 'og:image', seoOgImage);
    updateMetaTag('property', 'og:locale', SITE_CONFIG.seo.locale);

    // 4. Twitter / X Meta Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', SITE_CONFIG.seo.twitterHandle);
    updateMetaTag('name', 'twitter:title', seoTitle);
    updateMetaTag('name', 'twitter:description', seoDescription);
    updateMetaTag('name', 'twitter:image', seoOgImage);

    // 5. Dynamic JSON-LD Schema.org Injection
    let schemaScript = document.querySelector('#dynamic-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "@id": `${SITE_CONFIG.seo.siteUrl}#organization`,
          "name": SITE_CONFIG.legalName,
          "alternateName": SITE_CONFIG.name,
          "description": SITE_CONFIG.description,
          "url": SITE_CONFIG.seo.siteUrl,
          "telephone": SITE_CONFIG.contact.phone,
          "email": SITE_CONFIG.contact.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": SITE_CONFIG.headquarters.street,
            "addressLocality": SITE_CONFIG.headquarters.city,
            "addressRegion": SITE_CONFIG.headquarters.state,
            "postalCode": SITE_CONFIG.headquarters.pincode,
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": SITE_CONFIG.headquarters.geo.latitude,
            "longitude": SITE_CONFIG.headquarters.geo.longitude
          },
          "areaServed": SITE_CONFIG.serviceAreas,
          "knowsAbout": SITE_CONFIG.businessScope
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_CONFIG.seo.siteUrl}#website`,
          "url": SITE_CONFIG.seo.siteUrl,
          "name": SITE_CONFIG.name,
          "publisher": {
            "@id": `${SITE_CONFIG.seo.siteUrl}#organization`
          },
          "inLanguage": SITE_CONFIG.seo.locale
        }
      ]
    };

    schemaScript.text = JSON.stringify(schemaGraph);
  }, [seoTitle, seoDescription, seoKeywords, seoCanonical, seoOgImage]);

  return null;
};

export default SEOHead;
