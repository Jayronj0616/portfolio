import { createClient } from "@supabase/supabase-js";

let cached = null;

/**
 * Public, read-only client (anon key). RLS only grants this key
 * SELECT on `projects` and `testimonials` — see supabase/schema.sql.
 * Returns null when Supabase env vars aren't configured yet, so pages
 * can fall back to static data instead of crashing.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!cached) cached = createClient(url, anonKey);
  return cached;
}
