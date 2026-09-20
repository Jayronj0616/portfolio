import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import CertificationsSection from "@/components/CertificationsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MaintenancePage from "@/components/MaintenancePage";
import PageViewTracker from "@/components/PageViewTracker";
import { getProjects, getTestimonials, getSiteContent } from "@/lib/data";
import { MAINTENANCE_MODE } from "@/config/site";

export default async function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  const [projects, testimonials, site] = await Promise.all([
    getProjects(),
    getTestimonials(),
    getSiteContent(),
  ]);
  const { about, experience, education, stacks, certifications } = site;

  return (
    <>
      <PageViewTracker path="/" />
      {/* Hidden until focused. The navbar is the first thing in the tab
          order, so without this a keyboard user walks every nav link
          before reaching any content. */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent">
        Skip to content
      </a>
      <Navbar about={about} />
      {/* tabIndex -1 so the skip target can actually receive focus --
          a bare id moves the scroll position but not the caret. */}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero about={about} experience={experience} projectsCount={projects.length} />
        <AboutSection about={about} experience={experience} />
        <ProjectsSection projects={projects} />
        <StackSection stacks={stacks} />
        <CertificationsSection certifications={certifications} />
        <ExperienceSection experience={experience} education={education} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection about={about} />
      </main>
      <Footer about={about} />
    </>
  );
}
