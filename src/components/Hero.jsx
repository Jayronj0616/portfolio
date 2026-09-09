import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { portfolioData } from "@/data/portfolioData";

export default function Hero({ projectsCount }) {
  const { about, experience } = portfolioData;

  const stats = [
    { value: String(projectsCount), label: "Projects Built" },
    { value: String(experience.length), label: "Companies & Engagements" },
    { value: "AI-102", label: "Certification In Progress" },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-grid"
    >
      <Scene3D />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft via-transparent to-background" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center sm:py-36">
        <div className="h-28 w-28 rounded-full bg-gradient-to-b from-accent to-accent-2 p-1 shadow-lg shadow-accent/20">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
            <Image
              src="/images/pogi.jpg"
              alt={about.name}
              fill
              sizes="112px"
              priority
              className="scale-[2.4] object-cover"
              style={{ transformOrigin: "41% 30%" }}
            />
          </div>
        </div>

        <span className="mt-6 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted">
          {about.role} &middot; Philippines
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          <span className="text-foreground">Building Software That</span>
          <br />
          <span className="text-gradient">Actually Ships.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-lg text-muted">
          {about.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
          >
            View My Work
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent/60 hover:text-accent"
          >
            Let&apos;s Talk
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
