"use client";

import dynamic from "next/dynamic";
import { PERSONAL_INFO } from "@/lib/constants";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const Intro = dynamic(() => import("@/components/sections/Intro"));

const HomeSections = dynamic(
  () => import("@/components/sections/home-sections"),
  { ssr: false },
);

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
      {/* <Intro /> */}
      <Hero />
      <HomeSections
        shortInfo={PERSONAL_INFO.shortInfo}
        tagline={PERSONAL_INFO.tagline}
      />
    </main>
  );
}
