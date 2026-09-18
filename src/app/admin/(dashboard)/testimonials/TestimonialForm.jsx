"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

const initialState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";
const labelClass = "text-xs font-medium text-muted";

export default function TestimonialForm({ action, testimonial }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = testimonial ?? {};

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Name *</span>
          <input
            name="name"
            defaultValue={t.name}
            required
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Role</span>
          <input name="role" defaultValue={t.role ?? ""} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Company</span>
          <input
            name="company"
            defaultValue={t.company ?? ""}
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Avatar URL</span>
          <input
            name="avatar_url"
            defaultValue={t.avatar_url ?? ""}
            placeholder="https://..."
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className={labelClass}>Quote *</span>
        <textarea
          name="quote"
          defaultValue={t.quote}
          required
          rows={4}
          className={inputClass}
        />
      </label>

      <label className="block max-w-xs space-y-1.5">
        <span className={labelClass}>Sort order (lower shows first)</span>
        <input
          type="number"
          name="sort_order"
          defaultValue={t.sort_order ?? 0}
          className={inputClass}
        />
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={15} />
          {pending ? "Saving..." : "Save testimonial"}
        </button>
        {state.status === "error" && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
      </div>
    </form>
  );
}
