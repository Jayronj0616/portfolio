"use client";

import Image from "next/image";
import { ExternalLink, Github, Code2, Lock } from "lucide-react";
import { logAnalyticsEvent } from "@/app/actions";

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  building: "In progress",
};

export default function ProjectCard({ project, index }) {
  const isLive = project.status === "live" && project.live_url;
  const isArchived = project.status === "archived";
  const statusLabel = isLive ? STATUS_LABEL.live : STATUS_LABEL[project.status] ?? STATUS_LABEL.building;

  const track = (eventType) => {
    logAnalyticsEvent(eventType, { projectSlug: project.slug });
  };

  return (
    <article className="group grid gap-6 border-b border-border py-10 first:pt-0 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8">
      <span className="font-mono text-sm text-accent sm:pt-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="order-3 sm:order-2">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span
            className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide ${
              isLive ? "text-live" : "text-muted"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-live" : "bg-muted"}`} />
            {statusLabel}
          </span>
        </div>

        {project.company && (
          <p className="mt-1 text-xs text-muted">
            {project.role} · {project.company}
          </p>
        )}

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted">
          {(project.tags ?? []).slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5 text-sm">
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("project_live_click")}
              className="flex items-center gap-1.5 font-medium text-accent transition hover:brightness-125"
            >
              Live site <ExternalLink size={14} />
            </a>
          ) : isArchived ? (
            <span className="flex items-center gap-1.5 text-muted">
              <Lock size={14} /> In-house project — screenshots only
            </span>
          ) : (
            <span className="text-muted">Not deployed yet</span>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("project_github_click")}
              className="flex items-center gap-1.5 text-muted transition hover:text-foreground"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>

      <div className="relative order-2 aspect-[4/3] w-full overflow-hidden border border-border bg-surface-2 sm:order-3 sm:w-40">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="(min-width: 640px) 160px, 100vw"
            className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <Code2 size={24} />
          </div>
        )}
      </div>
    </article>
  );
}
