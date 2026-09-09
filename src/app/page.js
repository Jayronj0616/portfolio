import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProjects, getTestimonials } from "@/lib/data";
import { logAnalyticsEvent } from "@/app/actions";

export default async function Home() {
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
