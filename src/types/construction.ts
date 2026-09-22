export type ConstructionCategory =
  | 'building-construction'
  | 'residential-construction'
  | 'commercial-construction'
  | 'renovation-refurbishment'
  | 'architectural-execution'
  | 'construction-management'
  | 'property-development';

export interface ConstructionStage {
  id: string;
  num: string;
  name: string;
  title?: string;
  description: string;
  desc?: string;
  milestone: 'PLAN' | 'FOUNDATION' | 'STRUCTURE' | 'EXECUTION' | 'FINISHING' | 'DELIVERY' | string;
  codeTag: string;
  image: string;
  capabilities: string[];
  order: number;
}

// Backwards compatibility alias
export type ConstructionStageItem = ConstructionStage;
