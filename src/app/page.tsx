import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HomeSections from "@/components/sections/home-sections";
import Intro from "@/components/sections/Intro";
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
      <Intro />
      <Hero />
      <HomeSections
        shortInfo={PERSONAL_INFO.shortInfo}
        tagline={PERSONAL_INFO.tagline}
      />
    </main>
  );
}
