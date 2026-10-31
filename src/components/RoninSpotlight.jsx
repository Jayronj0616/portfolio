import { Lock, Filter, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

// RONIN is a normal `projects` row -- title, description and tags are
// edited at /admin like any other project -- but it is shown here
// instead of as a card, and the card grids leave it out by this slug.
export const RONIN_SLUG = "ronin";

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  building: "In progress",
};

// The observation -> signal -> action split is RONIN's architecture, not
// content that changes, so it lives here rather than in the database.
// The examples are illustrative ("repo-x"), never real repos or mail.
const STAGES = [
  {
    name: "Observe",
    rule: "sensors report everything, with no judgment",
    lines: [
      "repo-x · 3 unpushed commits",
      "inbox · 38 new, 2 from people",
      "site-y · up, certificate fine",
      "jobs · 3 new matches",
    ],
    gate: { icon: Filter, label: "Worth saying?" },
  },
  {
    name: "Signal",
    rule: "most of it stops here",
    quote: "Unpushed work on repo-x for 9 days.",
    note: "One line in the morning brief. Only four kinds of event may interrupt: a leaked credential, a repo left mid-merge, a site down ten minutes, an interview invite a person wrote.",
    gate: { icon: ShieldCheck, label: "Approved?" },
    strong: true,
  },
  {
    name: "Act",
    rule: "only after I say yes",
    quote: "Create a private remote for repo-x and push.",
    note: "Bulk actions ask twice, and nothing is ever deleted for good.",
  },
];

// Deliberately renders no link of any kind -- not live_url, not
// github_url -- even if the row has one. RONIN reads a private inbox, so
// it is described here and never linked.
export default function RoninSpotlight({ project }) {
  const statusLabel = STATUS_LABEL[project.status] ?? STATUS_LABEL.building;

  return (
    <Reveal className="mt-10">
      <article
        aria-labelledby="ronin-title"
        className="overflow-hidden rounded-3xl border border-border bg-surface shadow-panel"
      >
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <h3 id="ronin-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                {project.title}
              </h3>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                {statusLabel}
              </span>
            </div>

            <p className="mt-4 max-w-[34ch] text-xl font-medium leading-snug text-balance">
              Tells me what&apos;s going on before I ask, and only when
              it&apos;s worth telling.
            </p>

            <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {project.tags?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2 lg:mb-8" aria-label="Built with">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-8 flex items-start gap-2 border-t border-border pt-5 text-sm text-muted lg:mt-auto">
              <Lock size={14} className="mt-0.5 shrink-0" />
              <span>
                <span className="font-medium text-foreground">Private, read only.</span>{" "}
                It works on my own inbox, so there is no public demo or
                repository.
              </span>
            </p>
          </div>

          <div className="border-t border-border bg-surface-2/60 p-6 sm:p-10 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold">How it decides</p>
            <ol className="mt-6">
              {STAGES.map((stage, i) => {
                const isLast = i === STAGES.length - 1;
                const GateIcon = stage.gate?.icon;
                return (
                  <li
                    key={stage.name}
                    className={`relative grid grid-cols-[0.75rem_1fr] gap-x-4 ${isLast ? "" : "pb-7"}`}
                  >
                    <div className="relative flex justify-center" aria-hidden="true">
                      <span
                        className={`relative z-10 mt-1.5 h-3 w-3 rounded-full ring-4 ring-surface-2 ${
                          stage.strong ? "bg-accent" : "bg-muted/60"
                        }`}
                      />
                      {!isLast && (
                        <span className="absolute bottom-[-0.375rem] top-5 w-px bg-border" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">{stage.name}</span>
                        <span className="text-muted"> — {stage.rule}</span>
                      </p>

                      {stage.lines && (
                        <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
                          {stage.lines.map((line) => (
                            <li key={line} className="truncate">
                              {line}
                            </li>
                          ))}
                        </ul>
                      )}

                      {stage.quote && (
                        <p
                          className={`mt-3 text-[0.95rem] leading-snug ${
                            stage.strong ? "font-semibold text-accent" : "font-medium"
                          }`}
                        >
                          &ldquo;{stage.quote}&rdquo;
                        </p>
                      )}

                      {stage.note && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">{stage.note}</p>
                      )}

                      {stage.gate && (
                        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground">
                          <GateIcon size={12} className="text-accent" aria-hidden="true" />
                          {stage.gate.label}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
