import { portfolioData } from "@/data/portfolioData";

export default function ExperienceSection() {
  const { experience, education } = portfolioData;

  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Career
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Experience &amp; education
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="divide-y divide-border border-t border-border">
            {experience.map((job) => (
              <div key={`${job.company}-${job.period}`} className="py-8 first:pt-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  {job.current && (
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-live">
                      <span className="h-1.5 w-1.5 rounded-full bg-live" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{job.role}</h3>
                <p className="text-sm text-accent">{job.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {job.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted">
                  {job.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Education
            </h3>
            <div className="mt-4 divide-y divide-border border-t border-border">
              {education.map((edu) => (
                <div key={edu.title} className="py-6 first:pt-6">
                  <p className="font-mono text-xs text-muted">{edu.period}</p>
                  <h4 className="mt-1 font-semibold">{edu.title}</h4>
                  <p className="text-sm text-muted">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
