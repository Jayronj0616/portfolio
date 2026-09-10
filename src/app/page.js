import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MaintenancePage from "@/components/MaintenancePage";
import { getProjects, getTestimonials } from "@/lib/data";
import { logAnalyticsEvent } from "@/app/actions";
import { MAINTENANCE_MODE } from "@/config/site";

export default async function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  const [projects, testimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ]);

  await logAnalyticsEvent("page_view", { path: "/" });

  return (
    <>
      <Navbar />
      <main>
        <Hero projectsCount={projects.length} />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <StackSection />
        <ExperienceSection />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
