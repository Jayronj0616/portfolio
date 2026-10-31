import Reveal from "@/components/Reveal";

// The bio already leads the hero, so this section deliberately does not
// repeat it. It answers the next question instead: what working with
// Jayron is like. The list is `about.approach`, edited at /admin/site.
export default function AboutSection({ about, experience }) {
  const current = experience.filter((job) => job.current);
  // The list is free-form JSON from /admin, so an entry without a title
  // (or a stray null) is skipped rather than allowed to break the page.
  const approach = (about.approach ?? []).filter((item) => item?.title);

  return (
    <section id="about" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">How I work</h2>
          {current.length > 0 && (
            <ul className="space-y-1 text-sm sm:text-right">
              {current.map((job) => (
                <li key={`${job.company}-${job.role}`}>
                  <span className="text-foreground">{job.role}</span>
                  <span className="text-muted"> · {job.company}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {approach.length > 0 && (
          <Reveal>
            <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {approach.map((item, i) => (
                <li key={`${i}-${item.title}`} className="border-t-2 border-foreground pt-5">
                  <h3 className="text-lg font-semibold leading-snug text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
