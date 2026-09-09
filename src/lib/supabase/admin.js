import "server-only";
import { createClient } from "@supabase/supabase-js";

let cached = null;

/**
 * Service-role client. Bypasses RLS entirely, so it must never be
 * imported into a Client Component or leaked to the browser -- the
 * `server-only` import above makes that a build error if it happens.
 * Used only inside Server Actions (contact form, analytics writes).
 * Returns null when SUPABASE_SERVICE_ROLE_KEY isn't configured yet.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  if (!cached) {
    cached = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }
  return cached;
}
