import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://pnyqgsufporxhshmbdnv.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_VsFFXakdmscd2HUvolZICQ_wISDv1ty';

const supabaseUrl =
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL ||
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.trim().length > 0 && 
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey && 
  supabaseAnonKey.trim().length > 0
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export type SupabaseStatus = {
  isConfigured: boolean;
  isConnected: boolean;
  message: string;
  url: string;
};

/**
 * Utility to test if the current Supabase configuration is reachable.
 */
export const checkSupabaseConnection = async (): Promise<SupabaseStatus> => {
  if (!isSupabaseConfigured || !supabase) {
    return {
      isConfigured: false,
      isConnected: false,
      message: 'Supabase URL or Key missing in .env',
      url: supabaseUrl || 'Not set',
    };
  }

  try {
    // Attempt a light select ping to test connectivity and table existence
    const { data, error } = await supabase.from('properties').select('id').limit(1);

    if (error) {
      // Table doesn't exist yet (PostgreSQL 42P01 or PostgREST PGRST205)
      if (error.code === '42P01' || error.code === 'PGRST205') {
        return {
          isConfigured: true,
          isConnected: true,
          message: 'Connected to Supabase Cloud! Click "VIEW SQL SETUP" to create "properties" table.',
          url: supabaseUrl,
        };
      }
      return {
        isConfigured: true,
        isConnected: false,
        message: `Supabase query error: ${error.message}`,
        url: supabaseUrl,
      };
    }

    return {
      isConfigured: true,
      isConnected: true,
      message: `Successfully connected to Supabase (${data?.length ?? 0} record test)`,
      url: supabaseUrl,
    };
  } catch (err: any) {
    return {
      isConfigured: true,
      isConnected: false,
      message: err?.message || 'Network fetch failed / DNS unresolved',
      url: supabaseUrl,
    };
  }
};
