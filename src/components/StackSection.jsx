import { Layout, Server, Database, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const ICONS = { Layout, Server, Database, Wrench };

export default function StackSection() {
  const { stacks } = portfolioData;

  return (
    <section id="stack" className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Toolkit
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Tools &amp; technologies
        </h2>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {stacks.map((group) => {
            const Icon = ICONS[group.icon] ?? Layout;
            return (
              <div
                key={group.name}
                className="grid gap-3 py-6 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-8"
              >
                <div className="flex items-center gap-2 text-accent">
                  <Icon size={16} />
                  <h3 className="font-mono text-xs uppercase tracking-wide">
                    {group.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
