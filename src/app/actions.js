"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form submission. Used with useActionState, so the first
 * argument is the previous state, not form data.
 */
export async function submitContactMessage(_prevState, formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", error: "Please fill in every field." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", error: "That email address doesn't look right." };
  }
  if (message.length > 4000) {
    return { status: "error", error: "Message is too long (4000 characters max)." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Supabase isn't configured yet -- fail loudly rather than
    // silently pretending the message was saved.
    return {
      status: "error",
      error: "The contact form isn't connected to a database yet. Please email me directly instead.",
    };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) {
    return { status: "error", error: "Something went wrong sending your message. Please try again." };
  }

  return { status: "success" };
}

/**
 * Fire-and-forget analytics event (page view, outbound click, CV
 * download). Never throws -- a missing/misconfigured Supabase project
 * should never break the page for a visitor.
 */
export async function logAnalyticsEvent(eventType, { projectSlug, path } = {}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    await supabase.from("analytics_events").insert({
      event_type: eventType,
      project_slug: projectSlug ?? null,
      path: path ?? null,
    });
  } catch {
    // Swallow -- analytics must never break the UI.
  }
}
