"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function readTestimonialForm(formData) {
  return {
    name: String(formData.get("name") || "").trim(),
    role: String(formData.get("role") || "").trim() || null,
    company: String(formData.get("company") || "").trim() || null,
    quote: String(formData.get("quote") || "").trim(),
    avatar_url: String(formData.get("avatar_url") || "").trim() || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  };
}

export async function createTestimonial(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return { status: "error", error: "Supabase isn't configured." };

  const testimonial = readTestimonialForm(formData);
  if (!testimonial.name || !testimonial.quote) {
    return { status: "error", error: "Name and quote are required." };
  }

  const { error } = await supabase.from("testimonials").insert(testimonial);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id, _prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return { status: "error", error: "Supabase isn't configured." };

  const testimonial = readTestimonialForm(formData);
  if (!testimonial.name || !testimonial.quote) {
    return { status: "error", error: "Name and quote are required." };
  }

  const { error } = await supabase
    .from("testimonials")
    .update(testimonial)
    .eq("id", id);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData) {
  if (!(await isAdminAuthenticated())) return;

  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const id = String(formData.get("id") || "");
  if (!id) return;

  await supabase.from("testimonials").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}
