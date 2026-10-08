import { createClient } from "@supabase/supabase-js";

// How long a page built from these reads may be served before it is
// rebuilt in the background. Short enough that an edit made straight in
// Supabase (SQL editor, a script) shows up within about a minute; the
// admin dashboard doesn't wait for this -- its Server Actions call
// revalidatePath, which refreshes the pages immediately.
const REVALIDATE_SECONDS = 60;

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
  if (!cached) {
    cached = createClient(url, anonKey, {
      global: {
        // supabase-js reads through fetch(), and a statically rendered
        // route's fetches are cached by Next "indefinitely" by default --
        // stored on disk with revalidate=31536000 (one year) and reused
        // by every later build that restores .next/cache. That is how the
        // site kept serving a project order that was days out of date
        // while the database already held the new one. Give every read an
        // explicit, short lifetime instead.
        fetch: (input, init) =>
          fetch(input, { ...init, next: { revalidate: REVALIDATE_SECONDS } }),
      },
    });
  }
  return cached;
}
