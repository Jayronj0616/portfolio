import { Layout, Server, Database, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const ICONS = { Layout, Server, Database, Wrench };

export default function StackSection() {
  const { stacks } = portfolioData;

  return (
    <section id="stack" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Tools &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="mt-3 text-muted">
            A versatile, master-of-all toolkit across the stack.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stacks.map((group) => {
            const Icon = ICONS[group.icon] ?? Layout;
            return (
              <div
                key={group.name}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-semibold">{group.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </span>
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
