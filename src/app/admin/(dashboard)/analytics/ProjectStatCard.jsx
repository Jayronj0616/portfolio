import { ExternalLink } from "lucide-react";

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  building: "In progress",
};

const CHANGE_STYLE = {
  up: { arrow: "▲", className: "text-live" },
  down: { arrow: "▼", className: "text-danger" },
  flat: { arrow: "", className: "text-muted" },
};

/** "▲ 22%" / "▼ 5%" / "No change", coloured by direction. */
export function ChangeLabel({ change }) {
  if (!change) return null;
  const { arrow, className } = CHANGE_STYLE[change.direction];
  return (
    <span className={`font-mono text-xs ${className}`}>
      {arrow && `${arrow} `}
      {change.label}
    </span>
  );
}

function Sparkline({ daily }) {
  const max = Math.max(...daily, 1);
  return (
    <div className="flex h-10 items-end gap-1" aria-hidden="true">
      {daily.map((count, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-[3px] ${count > 0 ? "bg-accent" : "bg-border"}`}
          style={{ height: `${count > 0 ? Math.max((count / max) * 100, 8) : 6}%` }}
        />
      ))}
    </div>
  );
}

export default function ProjectStatCard({ card }) {
  const { name, status, week, change, keyEventLabel, dashboardUrl } = card;
  const isLive = status === "live";

  let footer = null;
  if (week && keyEventLabel && week.keyEventCount !== null) {
    footer = `${keyEventLabel}: ${week.keyEventCount}`;
  } else if (week?.topSource) {
    footer = `Top source: ${week.topSource}`;
  }

  return (
    <div className="card-hover flex flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold">{name}</h2>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
            isLive ? "text-live" : "text-muted"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-live" : "bg-muted"}`} />
          {STATUS_LABEL[status] ?? STATUS_LABEL.building}
        </span>
      </div>

      {week ? (
        <>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            Visitors 7d
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{week.visitors}</span>
            <ChangeLabel change={change} />
          </div>
          <div className="mt-3">
            <Sparkline daily={week.daily} />
          </div>
          {footer && <p className="mt-3 truncate text-sm text-muted">{footer}</p>}
        </>
      ) : (
        <p className="mt-4 flex-1 text-sm text-muted">No data yet</p>
      )}

      {dashboardUrl && (
        <a
          href={dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-fit items-center gap-1 text-sm text-accent transition hover:brightness-125"
        >
          Open in OpenPanel <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}
