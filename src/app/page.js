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
      <Navbar about={about} />
      <main>
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
