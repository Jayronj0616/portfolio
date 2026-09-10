import Reveal from "@/components/Reveal";

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Feedback
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What people say</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.id}
              delay={Math.min(i, 4) * 0.06}
              className="card-hover flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs">
                <span className="text-foreground">{t.name}</span>
                {(t.role || t.company) && (
                  <span className="text-muted">
                    {" "}
                    — {[t.role, t.company].filter(Boolean).join(", ")}
                  </span>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
