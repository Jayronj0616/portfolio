import { portfolioData } from "@/data/portfolioData";

export default function ExperienceSection() {
  const { experience, education } = portfolioData;

  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="relative rounded-2xl border border-border bg-surface p-6"
              >
                {job.current && (
                  <span className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full border border-live/30 bg-live/10 px-3 py-1 text-xs font-medium text-live">
                    <span className="h-1.5 w-1.5 rounded-full bg-live" />
                    Current
                  </span>
                )}
                <p className="text-xs font-medium text-muted">{job.period}</p>
                <h3 className="mt-1 text-lg font-semibold">{job.role}</h3>
                <p className="text-sm text-accent">{job.company}</p>
                <p className="mt-3 text-sm text-muted">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Education
            </h3>
            {education.map((edu) => (
              <div
                key={edu.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <p className="text-xs text-muted">{edu.period}</p>
                <h4 className="mt-1 font-semibold">{edu.title}</h4>
                <p className="text-sm text-muted">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
