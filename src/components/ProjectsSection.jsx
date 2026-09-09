import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection({ projects }) {
  return (
    <section id="work" className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
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
        </div>

        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
