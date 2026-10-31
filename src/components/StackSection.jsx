import { Layout, Server, Database, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";

const ICONS = { Layout, Server, Database, Wrench };

// One row per group rather than a grid of boxes: the content is a list
// of names, and a table-like layout lets the eye run down the groups and
// across the tools without four card borders in the way.
export default function StackSection({ stacks }) {
  return (
    <section id="stack" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">Tools &amp; technologies</h2>
        </Reveal>

        <Reveal>
          <dl className="mt-10 divide-y divide-border border-y border-border">
            {stacks.map((group) => {
              const Icon = ICONS[group.icon] ?? Layout;
              return (
                <div
                  key={group.name}
                  className="grid gap-3 py-6 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-8"
                >
                  <dt className="flex items-center gap-2.5 text-sm font-semibold">
                    <Icon size={16} className="shrink-0 text-accent" aria-hidden="true" />
                    {group.name}
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-foreground">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
