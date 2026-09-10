import { portfolioData } from "@/data/portfolioData";
import Reveal from "@/components/Reveal";

export default function ExperienceSection() {
  const { experience, education } = portfolioData;

  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Career
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Experience &amp; education
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {experience.map((job, i) => (
              <Reveal
                key={`${job.company}-${job.period}`}
                delay={Math.min(i, 4) * 0.06}
                className="card-hover relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent-2" />
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  {job.current && (
                    <span className="flex items-center gap-1.5 rounded-full bg-live/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-live">
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Education
            </h3>
            <div className="mt-4 space-y-4">
              {education.map((edu, i) => (
                <Reveal
                  key={edu.title}
                  delay={Math.min(i, 4) * 0.06}
                  className="card-hover rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="font-mono text-xs text-muted">{edu.period}</p>
                  <h4 className="mt-1 font-semibold">{edu.title}</h4>
                  <p className="text-sm text-muted">{edu.degree}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
