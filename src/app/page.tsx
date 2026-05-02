import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Footer } from "@/components/ui/footer";
import { SectionDots } from "@/components/ui/section-dots";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nahidujjaman Hridoy",
    url: "https://nhridoy.github.io",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "SELISE Bangladesh",
    },
    alumniOf: "Nexis Ltd",
    sameAs: [
      "https://github.com/nhridoy",
      "https://linkedin.com/in/nahidujjaman-hridoy",
      "https://nhridoy.github.io",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Django",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "Full-Stack Development",
      "DevOps",
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionDots />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
