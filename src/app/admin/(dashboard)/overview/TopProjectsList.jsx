export default function TopProjectsList({ items }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        No project clicks logged yet — this fills in once visitors click
        &ldquo;Live site&rdquo; or &ldquo;Code&rdquo; on a project card.
      </p>
    );
  }

  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.slug}>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="truncate font-medium">{item.title}</span>
            <span className="shrink-0 font-mono text-xs text-muted">
              {item.count} click{item.count === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
