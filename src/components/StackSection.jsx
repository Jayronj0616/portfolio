import { Layout, Server, Database, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import Reveal from "@/components/Reveal";

const ICONS = { Layout, Server, Database, Wrench };

export default function StackSection() {
  const { stacks } = portfolioData;

  return (
    <section id="stack" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Toolkit
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Tools &amp; technologies
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {stacks.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Layout;
            return (
              <Reveal
                key={group.name}
                delay={Math.min(i, 4) * 0.06}
                className="card-hover rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={17} />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                    {group.name}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
