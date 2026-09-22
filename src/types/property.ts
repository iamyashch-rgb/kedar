export type PropertyCategory =
  | 'APARTMENTS'
  | 'INDEPENDENT HOMES'
  | 'VILLAS'
  | 'COMMERCIAL'
  | 'LAND & PLOTS';

export type PropertyPurpose = 'BUY' | 'SELL' | 'INVESTMENT';

export type IndianCity =
  | 'Delhi NCR'
  | 'Noida'
  | 'Gurugram'
  | 'Lucknow'
  | 'Dehradun'
  | 'Jaipur'
  | 'Mumbai'
  | 'Bengaluru'
  | 'Pune'
  | 'Hyderabad';

export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  city: IndianCity | string;
  state: string;
  price: number | string;
  priceDisplay: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  status: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  available: boolean | string;

  // Legacy/UI specific compatibility fields
  category: PropertyCategory;
  purpose: PropertyPurpose;
  locality: string;
  configuration: string;
  availability: 'RERA Ready' | 'Under Construction' | 'Immediate Handover' | 'New Launch' | string;
  reraId?: string;
  coordinates?: string;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  isFeatured?: boolean;
}

// Backwards compatibility alias
export type PropertyItem = Property;

export interface PropertyFilterState {
  category: PropertyCategory | 'ALL';
  city: IndianCity | 'ALL CITIES';
  purpose: PropertyPurpose | 'ALL';
}
