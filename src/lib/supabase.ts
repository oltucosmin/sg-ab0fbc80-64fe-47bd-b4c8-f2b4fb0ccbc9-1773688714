import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Read from environment variables (NEXT_PUBLIC_ prefix makes them available in browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Debug logging to verify environment variables are loaded
if (typeof window === 'undefined') {
  // Server-side logging only
  console.log('🔧 Supabase Configuration (Server):');
  console.log('URL:', supabaseUrl);
  console.log('Key exists:', !!supabaseAnonKey);
  console.log('Key length:', supabaseAnonKey?.length);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);