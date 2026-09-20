import { getSupabase } from "@/lib/supabase/server";
import { fallbackProjects } from "@/data/fallbackProjects";
import { fallbackSiteContent } from "@/data/fallbackSiteContent";

export async function getProjects() {
  const supabase = getSupabase();
  if (!supabase) return fallbackProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackProjects;
  return data;
}

export async function getTestimonials() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getSiteContent() {
  const supabase = getSupabase();
  if (!supabase) return fallbackSiteContent;

  // select("*") rather than naming the columns: naming a column that the
  // database does not have yet makes the whole query error, which would
  // silently drop the entire site back to the fallback content until the
  // migration in supabase/schema.sql is run. With "*", a column that is
  // not there yet is simply absent and only its own section is affected.
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data) return fallbackSiteContent;

  return {
    about: data.about ?? fallbackSiteContent.about,
    experience: data.experience?.length
      ? data.experience
      : fallbackSiteContent.experience,
    education: data.education?.length
      ? data.education
      : fallbackSiteContent.education,
    stacks: data.stacks?.length ? data.stacks : fallbackSiteContent.stacks,
  };
}
