import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../../AdminPageHeader";
import TestimonialForm from "../TestimonialForm";
import { updateTestimonial } from "../actions";

async function getTestimonial(id) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const testimonial = await getTestimonial(id);
  if (!testimonial) notFound();

  const boundUpdate = updateTestimonial.bind(null, id);

  return (
    <div>
      <Reveal>
        <Link
          href="/admin/testimonials"
          className="flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to testimonials
        </Link>
      </Reveal>

      <div className="mt-4">
        <AdminPageHeader icon={Quote} title={`Edit ${testimonial.name}`} />
      </div>

      <TestimonialForm action={boundUpdate} testimonial={testimonial} />
    </div>
  );
}
