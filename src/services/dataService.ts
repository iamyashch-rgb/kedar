import type { Property, PropertyFilterState } from '../types/property';
import type { Project } from '../types/project';
import type { Location } from '../types/location';
import type { Service } from '../types/service';
import type { ConstructionStage } from '../types/construction';

import { PROPERTIES_DATA } from '../data/properties';
import { PROJECTS_DATA } from '../data/projects';
import { LOCATIONS_DATA } from '../data/locations';
import { SERVICES_DATA } from '../data/services';
import { CONSTRUCTION_STAGES_DATA } from '../data/constructionStages';

const STORAGE_KEY_PROPERTIES = 'kedar_properties_data_v1';

let cachedProperties: Property[] | null = null;

// Helper to get local stored properties or fallback to initial data
const loadStoredProperties = (): Property[] => {
  if (cachedProperties !== null) {
    return cachedProperties;
  }
  if (typeof window === 'undefined') {
    cachedProperties = [...PROPERTIES_DATA];
    return cachedProperties;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROPERTIES);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(PROPERTIES_DATA));
      cachedProperties = [...PROPERTIES_DATA];
      return cachedProperties;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedProperties = parsed;
      return cachedProperties;
    }
    cachedProperties = [...PROPERTIES_DATA];
    return cachedProperties;
  } catch (err) {
    console.error('Failed to parse properties from localStorage:', err);
    cachedProperties = [...PROPERTIES_DATA];
    return cachedProperties;
  }
};

const saveStoredProperties = (properties: Property[]): void => {
  cachedProperties = properties;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties));
  } catch (err) {
    console.error('Failed to save properties to localStorage:', err);
  }
  // Dispatch custom event to notify listening UI components in real time
  window.dispatchEvent(new Event('kedar_properties_updated'));
};

/**
 * Central Data Service Abstraction Layer.
 * UI components consume these async methods.
 */
export const dataService = {
  // Event listener subscription for real-time reactive UI updates
  subscribeToProperties(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    const handler = () => callback();
    window.addEventListener('kedar_properties_updated', handler);
    return () => window.removeEventListener('kedar_properties_updated', handler);
  },

  // ==========================================================================
  // PROPERTY API (CRUD Operations)
  // ==========================================================================
  async getProperties(filters?: Partial<PropertyFilterState>): Promise<Property[]> {
    let results = loadStoredProperties();

    if (filters) {
      if (filters.category && filters.category !== 'ALL') {
        results = results.filter((p) => p.category === filters.category);
      }
      if (filters.city && filters.city !== 'ALL CITIES') {
        results = results.filter((p) => p.city === filters.city);
      }
      if (filters.purpose && filters.purpose !== 'ALL') {
        results = results.filter((p) => p.purpose === filters.purpose);
      }
    }

    return Promise.resolve(results);
  },

  async getPropertyById(id: string): Promise<Property | null> {
    const properties = loadStoredProperties();
    const found = properties.find((p) => p.id === id) || null;
    return Promise.resolve(found);
  },

  async getFeaturedProperties(): Promise<Property[]> {
    const properties = loadStoredProperties();
    const featured = properties.filter((p) => p.featured || p.isFeatured);
    return Promise.resolve(featured);
  },

  async addProperty(newPropertyData: Omit<Property, 'id'>): Promise<Property> {
    const properties = loadStoredProperties();
    const generatedId = `prop-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newProperty: Property = {
      ...newPropertyData,
      id: generatedId,
    };
    const updated = [newProperty, ...properties];
    saveStoredProperties(updated);
    return Promise.resolve(newProperty);
  },

  async updateProperty(id: string, updatedFields: Partial<Property>): Promise<Property> {
    const properties = loadStoredProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Property with ID ${id} not found.`);
    }

    const updatedProperty: Property = {
      ...properties[index],
      ...updatedFields,
      id,
    };

    properties[index] = updatedProperty;
    saveStoredProperties(properties);
    return Promise.resolve(updatedProperty);
  },

  async deleteProperty(id: string): Promise<boolean> {
    const properties = loadStoredProperties();
    const filtered = properties.filter((p) => p.id !== id);
    saveStoredProperties(filtered);
    return Promise.resolve(true);
  },

  async resetPropertiesToDefault(): Promise<Property[]> {
    saveStoredProperties([...PROPERTIES_DATA]);
    return Promise.resolve([...PROPERTIES_DATA]);
  },

  // ==========================================================================
  // PROJECT API
  // ==========================================================================
  async getProjects(category?: string): Promise<Project[]> {
    let results = [...PROJECTS_DATA];

    if (category && category !== 'all') {
      if (category === 'under-construction') {
        results = results.filter((p) => p.status === 'under-construction');
      } else if (category === 'completed') {
        results = results.filter((p) => p.status === 'completed');
      } else {
        results = results.filter((p) => p.category === category);
      }
    }

    return Promise.resolve(results);
  },

  async getProjectById(id: string): Promise<Project | null> {
    const found = PROJECTS_DATA.find((p) => p.id === id) || null;
    return Promise.resolve(found);
  },

  // ==========================================================================
  // LOCATION & GIS API
  // ==========================================================================
  async getLocations(): Promise<Location[]> {
    return Promise.resolve([...LOCATIONS_DATA]);
  },

  async getLocationById(id: string): Promise<Location | null> {
    const found = LOCATIONS_DATA.find((l) => l.id === id) || null;
    return Promise.resolve(found);
  },

  // ==========================================================================
  // SERVICE API
  // ==========================================================================
  async getServices(): Promise<Service[]> {
    return Promise.resolve([...SERVICES_DATA]);
  },

  async getServiceById(id: string): Promise<Service | null> {
    const found = SERVICES_DATA.find((s) => s.id === id || s.code === id) || null;
    return Promise.resolve(found);
  },

  // ==========================================================================
  // CONSTRUCTION STAGES API
  // ==========================================================================
  async getConstructionStages(): Promise<ConstructionStage[]> {
    const sorted = [...CONSTRUCTION_STAGES_DATA].sort((a, b) => a.order - b.order);
    return Promise.resolve(sorted);
  },

  // ==========================================================================
  // ENQUIRY SUBMISSION API
  // ==========================================================================
  async submitEnquiry(_payload: Record<string, any>): Promise<{ success: boolean; refId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return {
      success: true,
      refId: `KEDAR-ENQ-${randomNum}`,
    };
  },
};

export default dataService;
