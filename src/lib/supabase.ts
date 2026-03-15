import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Hardcoded values for development - replace with env vars in production
const supabaseUrl = 'https://deuuhyvjbxamxeabmhql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldXVoeXZqYnhhbXhlYWJtaHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTQ0NjksImV4cCI6MjA1NzUzMDQ2OX0.mpkwTqTB7riDfwt7SGlDZw_11gwKcxjOaUaV4yuVRiI';

console.log('🔑 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');
console.log('Key length:', supabaseAnonKey.length);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);