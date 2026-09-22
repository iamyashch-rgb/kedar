export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  coords: string;
  coordinates?: string;
  x: number;
  y: number;
  xPct?: number;
  yPct?: number;
  terrain?: string;
  regulatory?: string;
  scopeFocus?: string;
  parcels?: string;
  featured?: boolean;
}

// Alias for GIS map nodes
export type GISNode = Location;
