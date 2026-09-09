import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { portfolioData } from "@/data/portfolioData";

export default function Hero({ projectsCount }) {
  const { about, experience } = portfolioData;

  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-grid">
      <Scene3D />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft via-transparent to-background" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {about.role} — Philippines
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            I build software that
            <br />
            <span className="text-accent">holds up in production.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {about.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black transition"
            >
              View my work
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent/60 hover:text-accent"
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
        </div>

        <div className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[4/5] w-full border-2 border-accent">
            <div className="absolute -inset-2 -z-10 border border-border" aria-hidden="true" />
            <Image
              src="/images/pogi.jpg"
              alt={about.name}
              fill
              sizes="280px"
              priority
              className="scale-[2.4] object-cover grayscale"
              style={{ transformOrigin: "41% 30%" }}
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-muted lg:text-right">
            {about.name} — {about.role}
          </p>
        </div>
      </div>
    </section>
  );
}
