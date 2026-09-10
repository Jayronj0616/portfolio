import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function ProjectsSection({ projects }) {
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
