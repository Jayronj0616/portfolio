export default function TestimonialsSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Feedback
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What people say</h2>

        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col bg-background p-6">
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
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
