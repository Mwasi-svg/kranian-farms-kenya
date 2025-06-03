import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL
const supabaseUrl = 'https://rdpocdxvbhxxoxqkuwak.supabase.co';
// Replace with your actual Supabase public API key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcG9jZHh2Ymh4eG94cWt1d2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTQ4MTYsImV4cCI6MjA2Mjg5MDgxNn0.tdxjBCH2ZPCE-HXu3sKLSlFoDqcPvQb2JmDucTGWRm8';

export const supabase = createClient(supabaseUrl, supabaseKey);

/*
  Replace 'YOUR_SUPABASE_URL' with the URL of your Supabase project.
  You can find this in your Supabase project settings under "API".
  It typically looks like "https://your-project-id.supabase.co".

  Replace 'YOUR_SUPABASE_PUBLIC_KEY' with your Supabase public API key.
  You can find this in your Supabase project settings under "API".
  This is the `anon` key.
*/