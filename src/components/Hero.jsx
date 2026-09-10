import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import HeroReveal from "@/components/HeroReveal";
import { portfolioData } from "@/data/portfolioData";

export default function Hero({ projectsCount }) {
  const { about, experience } = portfolioData;

  return (
    <section id="top" className="relative overflow-hidden bg-mesh">
      <Scene3D />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 sm:py-36 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <HeroReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            {about.role} — Philippines
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            I build software that{" "}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              holds up in production.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {about.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              View my work
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent/40 hover:text-accent"
            >
              Let&apos;s talk
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted">
            <span>{projectsCount} projects</span>
            <span aria-hidden="true">/</span>
            <span>{experience.length} companies</span>
            <span aria-hidden="true">/</span>
            <span className="flex items-center gap-1.5 text-live">
              <span className="h-1.5 w-1.5 rounded-full bg-live" />
              open to work
            </span>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.15} className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-[0_24px_60px_-24px_rgba(79,70,229,0.35)]">
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 to-accent-2/25 blur-2xl"
              aria-hidden="true"
            />
            <Image
              src="/images/pogi.jpg"
              alt={about.name}
              fill
              sizes="280px"
              priority
              className="scale-[2.4] object-cover"
              style={{ transformOrigin: "41% 30%" }}
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-muted lg:text-right">
            {about.name} — {about.role}
          </p>
        </HeroReveal>
      </div>
    </section>
  );
}
