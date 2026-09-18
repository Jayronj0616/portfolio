import Link from "next/link";
import { FolderKanban, Plus, Pencil, ExternalLink, Github } from "lucide-react";
import { getProjects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../AdminPageHeader";
import DeleteProjectButton from "./DeleteProjectButton";

export const dynamic = "force-dynamic";

const STATUS_STYLE = {
  live: "text-live",
  building: "text-muted",
  archived: "text-muted",
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <AdminPageHeader
        icon={FolderKanban}
        title="Projects"
        count={projects.length}
        description={'Shown on the site under "Selected work."'}
        action={
          <Link
            href="/admin/projects/new"
            className="btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add project
          </Link>
        }
      />

      <div className="mt-8 space-y-3">
        {projects.map((project, index) => (
          <Reveal key={project.id ?? project.slug} delay={Math.min(index, 6) * 0.05}>
            <div className="card-hover flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{project.title}</p>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wide ${STATUS_STYLE[project.status] ?? "text-muted"}`}
                  >
                    {project.status}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    order {project.sort_order ?? 0}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted">
                  {project.description}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 transition hover:text-accent"
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 transition hover:text-foreground"
                    >
                      <Github size={12} /> Code
                    </a>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/projects/${project.id}`}
                  aria-label={`Edit ${project.title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-accent"
                >
                  <Pencil size={15} />
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
