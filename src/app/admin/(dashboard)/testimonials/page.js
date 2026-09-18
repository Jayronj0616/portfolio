import Link from "next/link";
import { Quote, Plus, Pencil } from "lucide-react";
import { getTestimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../AdminPageHeader";
import DeleteTestimonialButton from "./DeleteTestimonialButton";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <AdminPageHeader
        icon={Quote}
        title="Testimonials"
        count={testimonials.length}
        description="The section disappears from the site until at least one row exists here."
        action={
          <Link
            href="/admin/testimonials/new"
            className="btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add testimonial
          </Link>
        }
      />

      {testimonials.length === 0 && (
        <Reveal
          delay={0.08}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center"
        >
          <span className="glass flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted">
            <Quote size={20} />
          </span>
          <p className="text-sm text-muted">
            No testimonials yet — add one to make the section appear on the
            site.
          </p>
        </Reveal>
      )}

      <div className="mt-8 space-y-3">
        {testimonials.map((t, index) => (
          <Reveal key={t.id} delay={Math.min(index, 6) * 0.05}>
            <div className="card-hover flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border bg-surface p-5">
              <div className="min-w-0">
                <p className="font-semibold">
                  {t.name}
                  {(t.role || t.company) && (
                    <span className="ml-2 font-normal text-muted">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  aria-label={`Edit testimonial from ${t.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-accent"
                >
                  <Pencil size={15} />
                </Link>
                <DeleteTestimonialButton id={t.id} name={t.name} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
