const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatShort(date) {
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

function formatFull(date) {
  return `${WEEKDAY[date.getUTCDay()]} ${formatShort(date)}`;
}

export default function ViewsChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div>
      <div className="flex h-36 items-end gap-1.5 sm:gap-2">
        {data.map((d, i) => {
          const hasViews = d.count > 0;
          const heightPct = hasViews ? Math.max((d.count / max) * 100, 6) : 3;
          return (
            <div
              key={d.date.toISOString()}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
            >
              <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-foreground px-2 py-1 font-mono text-[10px] text-background opacity-0 transition group-hover:opacity-100">
                {d.count} · {formatFull(d.date)}
              </span>
              <div
                className={`w-full rounded-t-[4px] transition ${
                  hasViews ? "bg-accent group-hover:bg-accent-2" : "bg-border"
                }`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {data.map((d, i) => (
          <div key={d.date.toISOString()} className="flex-1 text-center">
            {i % 2 === 0 && (
              <span className="font-mono text-[10px] text-muted">
                {formatShort(d.date)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
