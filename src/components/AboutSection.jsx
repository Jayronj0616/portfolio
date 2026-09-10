import Reveal from "@/components/Reveal";
import { portfolioData } from "@/data/portfolioData";

export default function AboutSection() {
  const { about, experience } = portfolioData;
  const current = experience.find((job) => job.current) ?? experience[0];

  return (
    <section id="about" className="border-b border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            About
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            The short version
          </h2>
        </Reveal>

        <Reveal className="card-hover mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {about.bio}
          </p>
          {current && (
            <p className="mt-4 font-mono text-xs text-muted">
              Currently{" "}
              <span className="text-foreground">{current.role}</span> at{" "}
              <span className="text-accent">{current.company}</span>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
