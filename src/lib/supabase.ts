import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Debug logging
console.log('🔑 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');
console.log('Key exists:', !!supabaseAnonKey);
console.log('Key is not placeholder:', supabaseAnonKey !== 'placeholder');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);