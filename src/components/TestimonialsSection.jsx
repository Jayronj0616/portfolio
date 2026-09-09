export default function TestimonialsSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            What People <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <blockquote className="flex-1 text-sm text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                {(t.role || t.company) && (
                  <span className="text-muted">
                    {" "}
                    &middot; {[t.role, t.company].filter(Boolean).join(", ")}
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
