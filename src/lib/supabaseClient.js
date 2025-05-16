// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anonymous public key from environment variables.
// You need to set these environment variables in your project.
// For example, in a .env file:
// SUPABASE_URL=YOUR_SUPABASE_URL
// SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: For client-side applications using build tools like Vite,
// you might need to prefix your environment variables with VITE_,
// e.g., import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY.
// Adjust the variable access based on your project's setup.