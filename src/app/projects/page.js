import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";
import { getProjects, getSiteContent } from "@/lib/data";
import { MAINTENANCE_MODE } from "@/config/site";
import MaintenancePage from "@/components/MaintenancePage";

export async function generateMetadata() {
  const { about } = await getSiteContent();
  return {
    title: `All projects — ${about.name}`,
    description: `Every project ${about.name} has shipped, not just the homepage's top picks.`,
  };
}

// A flat catalog of every project, for the homepage's "View all" link.
// The homepage itself only shows the first few (see ProjectsSection's
// HOMEPAGE_LIMIT) -- this page is the rest of them, same card, no cap.
export default async function ProjectsPage() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  const [projects, { about }] = await Promise.all([
    getProjects(),
    getSiteContent(),
  ]);

  return (
    <>
      <PageViewTracker path="/projects" />
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-border px-5 py-3 shadow-[0_8px_30px_-16px_rgba(15,15,35,0.25)]">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm text-white">
              {about.name.slice(0, 2).toUpperCase()}
            </span>
            <span>{about.name}</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </nav>
      </header>

      <main>
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Everything I&apos;ve shipped
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              All projects
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted">
              {projects.length} projects, live SaaS products to in-house
              tools shown by screenshot only.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer about={about} />
    </>
  );
}
