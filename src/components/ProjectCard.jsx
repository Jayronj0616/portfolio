"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ExternalLink, Github, Code2, Lock, X, Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { logAnalyticsEvent } from "@/app/actions";
import Reveal from "@/components/Reveal";

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  building: "In progress",
};

export default function ProjectCard({ project, index, featured = false }) {
  const isLive = project.status === "live" && project.live_url;
  const isArchived = project.status === "archived";
  const statusLabel = isLive ? STATUS_LABEL.live : STATUS_LABEL[project.status] ?? STATUS_LABEL.building;
  const [isImageOpen, setIsImageOpen] = useState(false);
  const gallery = project.images?.length ? project.images : project.cover_image ? [project.cover_image] : [];
  const [activeIndex, setActiveIndex] = useState(0);

  const track = (eventType) => {
    logAnalyticsEvent(eventType, { projectSlug: project.slug });
  };

  const openGallery = (index = 0) => {
    setActiveIndex(index);
    setIsImageOpen(true);
  };
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % gallery.length),
    [gallery.length]
  );

  useEffect(() => {
    if (!isImageOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsImageOpen(false);
      if (e.key === "ArrowLeft" && gallery.length > 1) showPrev();
      if (e.key === "ArrowRight" && gallery.length > 1) showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageOpen, gallery.length, showPrev, showNext]);

  return (
    <Reveal
      delay={Math.min(index, 4) * 0.06}
      className={featured ? "sm:col-span-2" : undefined}
    >
      <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
        <div className={`relative w-full ${featured ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
          {project.cover_image ? (
            <button
              type="button"
              onClick={() => openGallery(0)}
              aria-label={`View screenshots of ${project.title}`}
              className="group/img relative block h-full w-full cursor-zoom-in bg-surface-2"
            >
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                sizes={featured ? "(min-width: 640px) 680px, 100vw" : "(min-width: 640px) 340px, 100vw"}
                className="object-cover object-top"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover/img:bg-black/30 group-hover/img:opacity-100">
                <Expand className="text-white" size={20} />
              </span>
              {gallery.length > 1 && (
                <span className="glass absolute bottom-2 right-2 rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-foreground">
                  1/{gallery.length}
                </span>
              )}
            </button>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-2 text-muted">
              <Code2 size={24} />
            </div>
          )}

          <span
            className={`glass absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
              isLive ? "text-live" : "text-muted"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-live" : "bg-muted"}`} />
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold">{project.title}</h3>

          {project.company && (
            <p className="mt-1 text-xs text-muted">
              {project.role} · {project.company}
            </p>
          )}

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(project.tags ?? []).slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-sm">
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
      </article>

      {isImageOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-6"
            onClick={() => setIsImageOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close screenshot viewer"
              className="absolute right-6 top-6 text-white/70 transition hover:text-white"
            >
              <X size={28} />
            </button>

            {gallery.length > 1 && (
              <span className="absolute left-6 top-6 font-mono text-sm text-white/70">
                {activeIndex + 1} / {gallery.length}
              </span>
            )}

            <div className="relative flex w-full max-w-[90vw] flex-1 items-center justify-center">
              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-0 z-10 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white sm:-left-4"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[activeIndex]}
                alt={`${project.title} screenshot ${activeIndex + 1} of ${gallery.length}`}
                className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-0 z-10 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white sm:-right-4"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {gallery.length > 1 && (
              <div
                className="flex max-w-full gap-2 overflow-x-auto pb-1"
                onClick={(e) => e.stopPropagation()}
              >
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    aria-current={i === activeIndex}
                    className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                      i === activeIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
    </Reveal>
  );
}
