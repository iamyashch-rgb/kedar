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

import {
  supabase,
  isSupabaseConfigured,
  checkSupabaseConnection,
  type SupabaseStatus,
} from '../lib/supabase';

const STORAGE_KEY_PROPERTIES = 'kedar_properties_data_v1';
const BROADCAST_CHANNEL_NAME = 'kedar_properties_channel';

let cachedProperties: Property[] | null = null;
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  } catch (err) {
    console.warn('BroadcastChannel initialization failed:', err);
  }
}

// Notify UI components & other tabs of data mutations
const notifyUpdate = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('kedar_properties_updated'));
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'PROPERTIES_UPDATED', timestamp: Date.now() });
    } catch (e) {
      // Ignore broadcast errors
    }
  }
};

// Fallback helper: Get properties from localStorage or default static data
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
    if (Array.isArray(parsed) && parsed.length > 0) {
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
  notifyUpdate();
};

export const dataService = {
  /**
   * Return current database configuration state
   */
  getStorageMode(): { mode: 'SUPABASE' | 'LOCAL_CACHE'; endpointUrl: string; isConfigured: boolean } {
    if (isSupabaseConfigured && supabase) {
      return {
        mode: 'SUPABASE',
        endpointUrl: import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || 'Configured',
        isConfigured: true,
      };
    }
    return {
      mode: 'LOCAL_CACHE',
      endpointUrl: 'Browser LocalStorage',
      isConfigured: false,
    };
  },

  /**
   * Health check utility for Supabase connection status
   */
  async checkSupabaseHealth(): Promise<SupabaseStatus> {
    return await checkSupabaseConnection();
  },

  /**
   * Event listener subscription for reactive UI updates (tab, cross-tab, and Supabase Realtime)
   */
  subscribeToProperties(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handler = () => callback();
    window.addEventListener('kedar_properties_updated', handler);

    let bcHandler: ((event: MessageEvent) => void) | null = null;
    if (broadcastChannel) {
      bcHandler = (event: MessageEvent) => {
        if (event.data?.type === 'PROPERTIES_UPDATED') {
          cachedProperties = null; // Invalidate memory cache
          callback();
        }
      };
      broadcastChannel.addEventListener('message', bcHandler);
    }

    // Subscribe to Supabase Postgres Realtime changes if active
    let supabaseChannel: any = null;
    if (supabase) {
      try {
        supabaseChannel = supabase
          .channel('public:properties')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'properties' },
            () => {
              cachedProperties = null; // Invalidate cache on remote database change
              callback();
            }
          )
          .subscribe();
      } catch (err) {
        console.warn('Supabase Realtime subscription error:', err);
      }
    }

    return () => {
      window.removeEventListener('kedar_properties_updated', handler);
      if (broadcastChannel && bcHandler) {
        broadcastChannel.removeEventListener('message', bcHandler);
      }
      if (supabaseChannel && supabase) {
        supabase.removeChannel(supabaseChannel);
      }
    };
  },

  // ==========================================================================
  // PROPERTY API (CRUD Operations)
  // ==========================================================================
  async getProperties(filters?: Partial<PropertyFilterState>): Promise<Property[]> {
    let results: Property[] | null = null;

    // Try fetching from Supabase database if client is available
    if (supabase) {
      try {
        const { data, error } = await supabase.from('properties').select('*');
        if (!error && Array.isArray(data) && data.length > 0) {
          results = data as Property[];
          // Update local cache with latest database state
          cachedProperties = results;
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(results));
            } catch (e) {
              // Ignore storage errors
            }
          }
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }

    // Fallback to local storage if Supabase query yielded no results or errored
    if (results === null) {
      results = loadStoredProperties();
    }

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

    return results;
  },

  async getPropertyById(id: string): Promise<Property | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
        if (!error && data) return data as Property;
      } catch (e) {
        // Fallback
      }
    }
    const properties = await this.getProperties();
    return properties.find((p) => p.id === id) || null;
  },

  async getFeaturedProperties(): Promise<Property[]> {
    const properties = await this.getProperties();
    return properties.filter((p) => p.featured || p.isFeatured);
  },

  async addProperty(newPropertyData: Omit<Property, 'id'>): Promise<Property> {
    const properties = loadStoredProperties();
    const generatedId = `prop-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newProperty: Property = {
      ...newPropertyData,
      id: generatedId,
    };

    if (supabase) {
      try {
        const { error } = await supabase.from('properties').insert([newProperty]);
        if (error) {
          console.error('Supabase insert property error:', error);
        }
      } catch (err) {
        console.error('Supabase insert network failure:', err);
      }
    }

    const updated = [newProperty, ...properties];
    saveStoredProperties(updated);
    return newProperty;
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

    if (supabase) {
      try {
        const { error } = await supabase.from('properties').update(updatedFields).eq('id', id);
        if (error) {
          console.error('Supabase update property error:', error);
        }
      } catch (err) {
        console.error('Supabase update network failure:', err);
      }
    }

    properties[index] = updatedProperty;
    saveStoredProperties(properties);
    return updatedProperty;
  },

  async deleteProperty(id: string): Promise<boolean> {
    const properties = loadStoredProperties();
    const filtered = properties.filter((p) => p.id !== id);

    if (supabase) {
      try {
        const { error } = await supabase.from('properties').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete property error:', error);
        }
      } catch (err) {
        console.error('Supabase delete network failure:', err);
      }
    }

    saveStoredProperties(filtered);
    return true;
  },

  async resetPropertiesToDefault(): Promise<Property[]> {
    if (supabase) {
      try {
        // Clear Supabase table and seed with default mock dataset
        await supabase.from('properties').delete().neq('id', 'keep-all');
        await supabase.from('properties').upsert(PROPERTIES_DATA);
      } catch (err) {
        console.error('Supabase reset error:', err);
      }
    }
    saveStoredProperties([...PROPERTIES_DATA]);
    return [...PROPERTIES_DATA];
  },

  /**
   * Bulk Sync / Seed tool: Uploads local property dataset into Supabase table
   */
  async syncLocalPropertiesToSupabase(): Promise<{ success: boolean; count: number; message: string }> {
    if (!supabase) {
      return {
        success: false,
        count: 0,
        message: 'Supabase client is not initialized. Check .env settings.',
      };
    }

    try {
      const currentProps = loadStoredProperties();
      const { error } = await supabase.from('properties').upsert(currentProps, { onConflict: 'id' });

      if (error) {
        return {
          success: false,
          count: 0,
          message: `Supabase sync error: ${error.message} (code: ${error.code})`,
        };
      }

      return {
        success: true,
        count: currentProps.length,
        message: `Successfully seeded ${currentProps.length} properties to Supabase!`,
      };
    } catch (err: any) {
      return {
        success: false,
        count: 0,
        message: err?.message || 'Sync failed due to network error.',
      };
    }
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
  async submitEnquiry(payload: Record<string, any>): Promise<{ success: boolean; refId: string }> {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refId = `KEDAR-ENQ-${randomNum}`;

    if (supabase) {
      try {
        const { error } = await supabase.from('enquiries').insert([
          {
            ref_id: refId,
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            city: payload.city,
            interests: payload.interests,
            project_requirement: payload.projectRequirement,
            message: payload.message,
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) {
          console.warn('Supabase enquiry insert warning:', error.message);
        }
      } catch (err) {
        console.warn('Supabase enquiry insert exception:', err);
      }
    }

    return {
      success: true,
      refId,
    };
  },
};

export default dataService;
