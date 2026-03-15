import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Hardcoded credentials for Oikos Energy Supabase project
const supabaseUrl = 'https://deuuhyvjbxamxeabmhql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldXVoeXZqYnhhbXhlYWJtaHFsIiwicm9sZSI6ImFub24iLC5Saj7g9wDtGEWQ_uo4gZMe23MzMAVKVJc8PDmtn2owusU';

console.log('🔑 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');
console.log('Key length:', supabaseAnonKey.length);
console.log('Key exists:', !!supabaseAnonKey);
console.log('URL exists:', !!supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase client created successfully');