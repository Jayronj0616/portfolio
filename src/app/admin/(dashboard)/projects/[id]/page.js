import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../../AdminPageHeader";
import ProjectForm from "../ProjectForm";
import { updateProject } from "../actions";

async function getProject(id) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, id);

  return (
    <div>
      <Reveal>
        <Link
          href="/admin/projects"
          className="flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>
      </Reveal>

      <div className="mt-4">
        <AdminPageHeader icon={FolderKanban} title={`Edit ${project.title}`} />
      </div>

      <ProjectForm action={boundUpdate} project={project} />
    </div>
  );
}
