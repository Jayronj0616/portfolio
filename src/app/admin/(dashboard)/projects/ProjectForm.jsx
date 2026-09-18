"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import ImageListEditor from "./ImageListEditor";

const initialState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";
const labelClass = "text-xs font-medium text-muted";

export default function ProjectForm({ action, project }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const p = project ?? {};

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Title *</span>
          <input
            name="title"
            defaultValue={p.title}
            required
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Slug *</span>
          <input
            name="slug"
            defaultValue={p.slug}
            required
            placeholder="my-project"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className={labelClass}>Description *</span>
        <textarea
          name="description"
          defaultValue={p.description}
          required
          rows={4}
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className={labelClass}>Tags (comma separated)</span>
        <input
          name="tags"
          defaultValue={(p.tags ?? []).join(", ")}
          placeholder="React, Next.js, Supabase"
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Live URL</span>
          <input
            name="live_url"
            defaultValue={p.live_url ?? ""}
            placeholder="https://..."
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>GitHub URL</span>
          <input
            name="github_url"
            defaultValue={p.github_url ?? ""}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Company (if freelance/employer work)</span>
          <input
            name="company"
            defaultValue={p.company ?? ""}
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Role</span>
          <input name="role" defaultValue={p.role ?? ""} className={inputClass} />
        </label>
      </div>

      <div className="space-y-1.5">
        <span className={labelClass}>Screenshots</span>
        <ImageListEditor name="images" initial={p.images ?? []} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelClass}>Status</span>
          <select
            name="status"
            defaultValue={p.status ?? "building"}
            className={inputClass}
          >
            <option value="live">Live</option>
            <option value="building">Building</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Sort order (lower shows first)</span>
          <input
            type="number"
            name="sort_order"
            defaultValue={p.sort_order ?? 0}
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={15} />
          {pending ? "Saving..." : "Save project"}
        </button>
        {state.status === "error" && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
      </div>
    </form>
  );
}
