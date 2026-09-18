"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { saveSiteContent } from "./actions";

const initialState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";
const labelClass = "text-xs font-medium text-muted";
const jsonClass = `${inputClass} font-mono text-xs`;

export default function SiteForm({ about, experience, education, stacks }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 space-y-10">
      <section className="space-y-5">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          About
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className={labelClass}>Name *</span>
            <input
              name="name"
              defaultValue={about.name}
              required
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>Role *</span>
            <input
              name="role"
              defaultValue={about.role}
              required
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className={labelClass}>Bio *</span>
          <textarea
            name="bio"
            defaultValue={about.bio}
            required
            rows={4}
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5">
          <span className={labelClass}>CV / resume link</span>
          <input
            name="cvLink"
            defaultValue={about.cvLink}
            placeholder="/files/CV.pdf or https://..."
            className={inputClass}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className={labelClass}>GitHub</span>
            <input
              name="github"
              defaultValue={about.socials?.github ?? ""}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>LinkedIn</span>
            <input
              name="linkedin"
              defaultValue={about.socials?.linkedin ?? ""}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>Email (mailto: link)</span>
            <input
              name="email"
              defaultValue={about.socials?.email ?? ""}
              placeholder="mailto:you@example.com"
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>WhatsApp</span>
            <input
              name="whatsapp"
              defaultValue={about.socials?.whatsapp ?? ""}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>Viber</span>
            <input
              name="viber"
              defaultValue={about.socials?.viber ?? ""}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>Facebook</span>
            <input
              name="facebook"
              defaultValue={about.socials?.facebook ?? ""}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Experience (JSON)
        </h2>
        <p className="text-xs text-muted">
          Array of {"{ company, role, period, current, description, tech[] }"}.
          The card marked <code className="text-foreground">current: true</code>{" "}
          shows the &ldquo;Current&rdquo; badge.
        </p>
        <textarea
          name="experience"
          defaultValue={JSON.stringify(experience, null, 2)}
          rows={14}
          spellCheck={false}
          className={jsonClass}
        />
      </section>

      <section className="space-y-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Education (JSON)
        </h2>
        <p className="text-xs text-muted">
          Array of {"{ title, degree, period }"}.
        </p>
        <textarea
          name="education"
          defaultValue={JSON.stringify(education, null, 2)}
          rows={8}
          spellCheck={false}
          className={jsonClass}
        />
      </section>

      <section className="space-y-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Tools &amp; stacks (JSON)
        </h2>
        <p className="text-xs text-muted">
          Array of {"{ name, icon, items[] }"}. Icon must be one of: Layout,
          Server, Database, Wrench.
        </p>
        <textarea
          name="stacks"
          defaultValue={JSON.stringify(stacks, null, 2)}
          rows={14}
          spellCheck={false}
          className={jsonClass}
        />
      </section>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={15} />
          {pending ? "Saving..." : "Save site text"}
        </button>
        {state.status === "error" && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
      </div>
    </form>
  );
}
