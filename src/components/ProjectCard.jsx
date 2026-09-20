"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  // Multi-image swipe gallery is disabled for now -- only show the cover
  // image. project.images still holds the full set in the DB; switch
  // this back to `project.images?.length ? project.images : ...` to
  // re-enable the gallery.
  const gallery = project.cover_image ? [project.cover_image] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

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
      if (e.key === "Escape") {
        setIsImageOpen(false);
        return;
      }
      // Keep Tab inside the overlay. Without this the focus ring walks
      // out into the page behind it, which is invisible to a sighted
      // keyboard user and incomprehensible to a screen reader one.
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.key === "ArrowLeft" && gallery.length > 1) showPrev();
      if (e.key === "ArrowRight" && gallery.length > 1) showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageOpen, gallery.length, showPrev, showNext]);

  // Move focus into the overlay on open and hand it back to whatever
  // opened it on close, and stop the page behind from scrolling while
  // it is up.
  useEffect(() => {
    if (!isImageOpen) return;
    const previouslyFocused = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isImageOpen]);

  // Keep the scroll position in sync when activeIndex changes via the
  // arrow buttons or a thumbnail click (jumps instantly on open, then
  // animates for later changes).
  useEffect(() => {
    if (!isImageOpen) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({
      left: activeIndex * el.clientWidth,
      behavior: "smooth",
    });
  }, [isImageOpen, activeIndex]);

  // Swiping/scrolling the track by hand should update activeIndex too,
  // so the counter and thumbnail strip stay accurate.
  useEffect(() => {
    if (!isImageOpen) return;
    const el = scrollerRef.current;
    if (!el) return;
    let timeout;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const nextIndex = Math.round(el.scrollLeft / el.clientWidth);
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      }, 100);
    };
    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [isImageOpen]);

  return (
    <Reveal
      delay={Math.min(index, 4) * 0.06}
      className={featured ? "sm:col-span-2" : undefined}
    >
      <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
        <div className={`relative w-full ${featured ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
          {project.cover_image ? (
            <button
              ref={triggerRef}
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
                <span className="glass absolute bottom-2 right-2 rounded-full border border-border px-2 py-0.5 font-mono text-xs text-foreground">
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
            className={`glass absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs uppercase tracking-wide ${
              isLive ? "text-live" : "text-muted"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-live" : "bg-muted"}`} />
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="break-words text-lg font-semibold">{project.title}</h3>

          {project.company && (
            <p className="mt-1 break-words text-xs text-muted">
              {project.role} · {project.company}
            </p>
          )}

          <p className="mt-3 flex-1 break-words text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(project.tags ?? []).slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="max-w-full break-all rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
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
              <span className="flex min-w-0 items-center gap-1.5 text-muted">
                <Lock size={14} className="shrink-0" /> In-house project — screenshots only
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Screenshots of ${project.title}`}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-6 outline-none"
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

              <div
                ref={scrollerRef}
                className="flex h-full max-h-[75vh] w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                {gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot ${i + 1} of ${gallery.length}`}
                    className="h-full w-full shrink-0 snap-center rounded-lg object-contain shadow-2xl"
                  />
                ))}
              </div>

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
