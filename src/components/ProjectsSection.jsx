import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection({ projects }) {
  return (
    <section id="work" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            Selected Work
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-muted">
            A glimpse into what I build &mdash; full-stack systems built for
            real operational logic, not just demos.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
