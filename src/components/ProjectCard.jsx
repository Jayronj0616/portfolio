"use client";

import Image from "next/image";
import { ExternalLink, Github, Code2, Lock } from "lucide-react";
import { logAnalyticsEvent } from "@/app/actions";

const BADGES = {
  live: { label: "Live", dot: "bg-live", cls: "border-live/30 bg-live/10 text-live" },
  archived: {
    label: "Archived",
    dot: "bg-muted",
    cls: "border-border bg-background/70 text-muted",
  },
  building: {
    label: "In Progress",
    dot: "bg-muted",
    cls: "border-border bg-background/70 text-muted",
  },
};

export default function ProjectCard({ project }) {
  const isLive = project.status === "live" && project.live_url;
  const isArchived = project.status === "archived";
  const badge = isLive ? BADGES.live : isArchived ? BADGES.archived : BADGES.building;

  const track = (eventType) => {
    logAnalyticsEvent(eventType, { projectSlug: project.slug });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent/40">
      <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <Code2 size={32} />
          </div>
        )}

        <span
          className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur ${badge.cls}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
          {badge.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.company && (
          <p className="mt-0.5 text-xs text-muted">
            {project.role} &middot; {project.company}
          </p>
        )}

        <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags ?? []).slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm">
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
              <Lock size={14} /> In-house project &mdash; screenshots only
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
    </article>
  );
}
