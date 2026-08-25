import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SectionDots } from "@/components/ui/section-dots";
import { PERSONAL_INFO } from "@/lib/constants";

const About = dynamic(() => import("@/components/sections/About"), {
  ssr: true,
});

const SlidingText = dynamic(() => import("@/components/sections/SlidingText"), {
  ssr: true,
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: true,
});

const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: true,
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: true,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: true,
});

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
      <SlidingText text={PERSONAL_INFO.tagline} />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
