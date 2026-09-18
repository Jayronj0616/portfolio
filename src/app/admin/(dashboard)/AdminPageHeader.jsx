import Reveal from "@/components/Reveal";

export default function AdminPageHeader({
  icon: Icon,
  title,
  count,
  description,
  action,
}) {
  return (
    <Reveal className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-accent">
          <Icon size={16} />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">
            Admin
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {title}
          {count !== undefined && (
            <span className="ml-2 text-base font-normal text-muted">
              ({count})
            </span>
          )}
        </h1>
        {description && (
          <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
        )}
      </div>

      {action}
    </Reveal>
  );
}
