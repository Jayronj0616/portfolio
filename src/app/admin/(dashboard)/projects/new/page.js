import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../../AdminPageHeader";
import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
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
        <AdminPageHeader icon={FolderKanban} title="Add project" />
      </div>

      <ProjectForm action={createProject} />
    </div>
  );
}
