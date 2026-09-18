import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const BUCKET = "site-images";

/**
 * Uploads an image file to the public site-images bucket and returns its
 * public URL. Always goes through the service-role client -- the bucket
 * has no RLS-equivalent policies configured, so only server code with the
 * service role key can write to it.
 */
export async function uploadPublicImage(file, folder) {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file selected.");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only PNG, JPEG, WEBP, or GIF images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large (5MB max).");
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase isn't configured.");

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
