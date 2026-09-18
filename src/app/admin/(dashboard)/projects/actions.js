"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { uploadPublicImage } from "@/lib/storage";

const STATUSES = ["live", "building", "archived"];

function splitList(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitTags(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function readProjectForm(formData) {
  const status = String(formData.get("status") || "building");
  const images = splitList(formData.get("images"));
  const coverImage = images[0] ?? null;

  return {
    slug: String(formData.get("slug") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    tags: splitTags(formData.get("tags")),
    live_url: String(formData.get("live_url") || "").trim() || null,
    github_url: String(formData.get("github_url") || "").trim() || null,
    cover_image: coverImage,
    images,
    company: String(formData.get("company") || "").trim() || null,
    role: String(formData.get("role") || "").trim() || null,
    status: STATUSES.includes(status) ? status : "building",
    sort_order: Number(formData.get("sort_order")) || 0,
  };
}

export async function createProject(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { status: "error", error: "Supabase isn't configured." };
  }

  const project = readProjectForm(formData);
  if (!project.slug || !project.title || !project.description) {
    return {
      status: "error",
      error: "Slug, title, and description are required.",
    };
  }

  const { error } = await supabase.from("projects").insert(project);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id, _prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { status: "error", error: "Supabase isn't configured." };
  }

  const project = readProjectForm(formData);
  if (!project.slug || !project.title || !project.description) {
    return {
      status: "error",
      error: "Slug, title, and description are required.",
    };
  }

  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData) {
  if (!(await isAdminAuthenticated())) return;

  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const id = String(formData.get("id") || "");
  if (!id) return;

  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function uploadProjectImage(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { status: "error", error: "Not authenticated." };
  }

  try {
    const url = await uploadPublicImage(formData.get("file"), "projects");
    return { status: "success", url };
  } catch (err) {
    return { status: "error", error: err.message };
  }
}
