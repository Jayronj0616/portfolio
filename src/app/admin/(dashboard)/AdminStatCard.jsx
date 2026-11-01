export default function AdminStatCard({ label, value, icon: Icon, hint }) {
  return (
    <div className="glass card-hover rounded-2xl border border-border p-4">
      <div className="flex items-center gap-1.5 text-muted">
        <Icon size={14} />
        <span className="font-mono text-[11px] uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <div className="mt-1">{hint}</div>}
    </div>
  );
}
