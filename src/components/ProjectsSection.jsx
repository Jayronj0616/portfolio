import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

// Only the first HOMEPAGE_LIMIT projects (by sort_order) show here --
// the rest are one click away on /projects. Bump this to show more
// without touching the rest of the page.
const HOMEPAGE_LIMIT = 3;

export default function ProjectsSection({ projects }) {
  const featured = projects.slice(0, HOMEPAGE_LIMIT);

  return (
    <section id="work" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Selected work
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Projects</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted sm:block">
            Full-stack systems built for real operational logic, not just
            demos.
          </p>
        </Reveal>

        {/* grid-cols-1 -> sm:grid-cols-3 (no 2-column step): with exactly
            HOMEPAGE_LIMIT (3) cards, a 2-column stage strands the third
            card alone in its own row with a large empty gap next to it.
            Jumping straight to 3 columns keeps every row full. Revisit
            this if HOMEPAGE_LIMIT ever changes to something that isn't 3. */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((project, index) => (
            // No `featured` (wide) card here -- these are already a curated
            // top 3, and spanning one of them across 2 of the 3 columns
            // recreates the same orphaned-card problem the grid fix above
            // solves. The full /projects grid still uses it.
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {projects.length > HOMEPAGE_LIMIT && (
          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-accent/40 hover:text-accent"
            >
              View all {projects.length} projects <ArrowRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
