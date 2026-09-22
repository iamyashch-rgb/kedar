export interface CuratedImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category: 'architecture' | 'residential' | 'commercial' | 'land' | 'construction' | 'team';
  blurDataUrl?: string;
}

export const CURATED_IMAGES = {
  heroBg: {
    id: "hero-luxury-tower",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
    alt: "Modern Luxury Residential Architecture India",
    category: "architecture",
  },
  constructionSite: {
    id: "site-execution",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
    alt: "High-Rise Commercial Construction Site Management",
    category: "construction",
  },
  luxuryVilla: {
    id: "villa-goa-ncr",
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
    alt: "Independent Luxury Modern Villa with Infinity Pool",
    category: "residential",
  },
  landPlot: {
    id: "land-acquisition-plot",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    alt: "Prime Green Agricultural & Gated Residential Land Plots",
    category: "land",
  },
  commercialHub: {
    id: "commercial-tower-bkc",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Glass Facade Grade-A Commercial Office Tower",
    category: "commercial",
  },
  architecturalDrawing: {
    id: "blueprint-design",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Architectural CAD Blueprints and Project Management",
    category: "architecture",
  },
  interiorRenovation: {
    id: "renovation-refurbishment",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    alt: "Premium Penthouse Interior Renovation & Fit-out",
    category: "residential",
  },
  panIndiaMap: {
    id: "india-skyline",
    url: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    alt: "Pan India Real Estate Development Footprint",
    category: "architecture",
  },
} as const;

/**
 * Utility to generate responsive image source URLs with dynamic widths
 */
export function getOptimizedImageUrl(baseUrl: string, width: number = 800, quality: number = 80): string {
  if (!baseUrl.includes('unsplash.com')) return baseUrl;
  const cleanUrl = baseUrl.split('?')[0];
  return `${cleanUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function generateSrcSet(baseUrl: string, widths: number[] = [400, 800, 1200, 1600]): string {
  if (!baseUrl.includes('unsplash.com')) return '';
  return widths.map(w => `${getOptimizedImageUrl(baseUrl, w)} ${w}w`).join(', ');
}
