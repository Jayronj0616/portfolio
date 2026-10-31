import Reveal from "@/components/Reveal";

// A timeline rather than a stack of cards: the order is the information
// here, and the rail carries it. Current roles get the accent dot.
export default function ExperienceSection({ experience, education }) {
  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">Experience &amp; education</h2>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal>
            <ol>
              {experience.map((job, i) => {
                const isLast = i === experience.length - 1;
                return (
                  <li
                    key={`${job.company}-${job.period}`}
                    className={`relative grid grid-cols-[0.75rem_1fr] gap-x-5 ${isLast ? "" : "pb-10"}`}
                  >
                    <div className="relative flex justify-center" aria-hidden="true">
                      <span
                        className={`relative z-10 mt-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                          job.current ? "bg-accent" : "bg-muted/50"
                        }`}
                      />
                      {!isLast && <span className="absolute bottom-0 top-5 w-px bg-border" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-mono text-xs text-muted">{job.period}</p>
                        {job.current && (
                          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-live">
                            <span className="h-1.5 w-1.5 rounded-full bg-live" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 break-words text-lg font-semibold">{job.role}</h3>
                      <p className="break-words text-sm text-accent">{job.company}</p>
                      <p className="mt-3 max-w-[65ch] break-words text-sm leading-relaxed text-muted">
                        {job.description}
                      </p>
                      {job.tech?.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used">
                          {job.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal>
            <h3 className="text-sm font-semibold">Education</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {education.map((edu) => (
                <li key={edu.title} className="py-5">
                  <p className="font-mono text-xs text-muted">{edu.period}</p>
                  <p className="mt-1 break-words font-semibold">{edu.title}</p>
                  <p className="break-words text-sm text-muted">{edu.degree}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
