export interface Service {
  id: string;
  num?: string;
  code: string;
  title: string;
  description: string;
  desc?: string;
  category: 'real-estate' | 'land-dealing' | 'construction' | 'advisory' | string;
  image: string;
  capabilities: string[];
  shortDescription?: string;
  fullDescription?: string;
  featured?: boolean;
}

// Backwards compatibility alias
export type ServiceRowItem = Service;
export type BusinessService = Service;
