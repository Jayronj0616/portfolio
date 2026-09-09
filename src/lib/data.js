import { getSupabase } from "@/lib/supabase/server";
import { fallbackProjects } from "@/data/fallbackProjects";

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
