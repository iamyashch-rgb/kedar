export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'land' | 'under-construction' | 'completed';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'residential' | 'commercial' | 'land' | string;
  year: number | string;
  status: 'completed' | 'under-construction' | string;
  description: string;
  images: string[];
  featured: boolean;

  // UI layout & details compatibility fields
  yearStatus?: string;
  type?: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: string;
  gallery?: string[];
  metrics?: ProjectMetric[];
  architect?: string;
  scope?: string[];
  aspectRatio?: 'aspect-[4/5]' | 'aspect-[16/9]' | 'aspect-[4/3]' | 'aspect-[3/4]';
  columnSpan?: 'col-span-1' | 'col-span-1 lg:col-span-2' | 'col-span-1 lg:col-span-3';
}

// Backwards compatibility alias
export type ProjectItem = Project;
