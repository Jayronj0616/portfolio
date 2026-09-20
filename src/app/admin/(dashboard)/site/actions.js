"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { uploadPublicImage } from "@/lib/storage";

function parseJsonArray(raw, fieldLabel) {
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(`${fieldLabel} isn't valid JSON.`);
  }
  if (!Array.isArray(value)) {
    throw new Error(`${fieldLabel} must be a JSON array.`);
  }
  return value;
}

export async function saveSiteContent(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { status: "error", error: "Supabase isn't configured." };
  }

  const about = {
    name: String(formData.get("name") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    bio: String(formData.get("bio") || "").trim(),
    cvLink: String(formData.get("cvLink") || "").trim(),
    socials: {
      github: String(formData.get("github") || "").trim(),
      linkedin: String(formData.get("linkedin") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      whatsapp: String(formData.get("whatsapp") || "").trim(),
      viber: String(formData.get("viber") || "").trim(),
      facebook: String(formData.get("facebook") || "").trim(),
    },
  };

  if (!about.name || !about.role || !about.bio) {
    return {
      status: "error",
      error: "Name, role, and bio are required.",
    };
  }

  let experience;
  let education;
  let stacks;
  let certifications;
  try {
    experience = parseJsonArray(formData.get("experience"), "Experience");
    education = parseJsonArray(formData.get("education"), "Education");
    stacks = parseJsonArray(formData.get("stacks"), "Stacks");
    certifications = parseJsonArray(
      formData.get("certifications"),
      "Certifications"
    );
  } catch (err) {
    return { status: "error", error: err.message };
  }

  const { error } = await supabase.from("site_settings").upsert({
    id: "main",
    about,
    experience,
    education,
    stacks,
    certifications,
    updated_at: new Date().toISOString(),
  });
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/site");
  redirect("/admin/site");
}

export async function uploadAvatar(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { status: "error", error: "Supabase isn't configured." };
  }

  let url;
  try {
    url = await uploadPublicImage(formData.get("file"), "avatar");
  } catch (err) {
    return { status: "error", error: err.message };
  }

  const { data: existing } = await supabase
    .from("site_settings")
    .select("about")
    .eq("id", "main")
    .maybeSingle();

  const about = { ...(existing?.about ?? {}), avatar: url };

  const { error } = await supabase
    .from("site_settings")
    .update({ about, updated_at: new Date().toISOString() })
    .eq("id", "main");
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/site");
  return { status: "success", url };
}
