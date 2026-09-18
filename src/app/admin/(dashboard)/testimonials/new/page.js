import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../../AdminPageHeader";
import TestimonialForm from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
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
        <AdminPageHeader icon={Quote} title="Add testimonial" />
      </div>

      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
