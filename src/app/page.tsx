import type { Metadata } from "next";
import About from "@/components/sections/About/About";
import Contact from "@/components/sections/Contact/Contact";
import Experience from "@/components/sections/Experience/Experience";
import Hero from "@/components/sections/Hero/Hero";
import Intro from "@/components/sections/Intro";
import SelectedWorks from "@/components/sections/SelectedWorks/SelectedWorks";
import Skills from "@/components/sections/Skills/Skills";
import TagLine from "@/components/sections/TagLine/TagLine";
import { JsonLd } from "@/components/seo/json-ld";
import { PERSONAL_INFO } from "@/lib/constants";
import {
  homeGraph,
  pageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";

const homeMetadata = pageMetadata(
  `${SITE_NAME} | Software Engineer`,
  SITE_DESCRIPTION,
  "/",
);

export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: `${SITE_NAME} | Software Engineer` },
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd data={homeGraph} />
      {/* <Intro /> */}
      <Hero />
      <About text={PERSONAL_INFO.shortInfo} />
      <TagLine text={PERSONAL_INFO.tagline} />
      <Skills />
      <Experience />
      <SelectedWorks />
      <Contact />
    </main>
  );
}
