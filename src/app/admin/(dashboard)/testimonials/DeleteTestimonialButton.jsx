"use client";

import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "./actions";

export default function DeleteTestimonialButton({ id, name }) {
  return (
    <form
      action={deleteTestimonial}
      onSubmit={(e) => {
        if (!confirm(`Delete the testimonial from "${name}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={`Delete testimonial from ${name}`}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-danger"
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
