"use client";

import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About"));
const SlidingText = dynamic(() => import("@/components/sections/SlidingText"));
const RevealingText = dynamic(
  () => import("@/components/sections/RevealingText"),
);
const Experience = dynamic(() => import("@/components/sections/Experience"));
const SelectedWorks = dynamic(
  () => import("@/components/sections/SelectedWorks"),
);
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomeSections({
  shortInfo,
  tagline,
}: {
  shortInfo: string;
  tagline: string;
}) {
  return (
    <>
      <RevealingText text={shortInfo} />
      <SlidingText text={tagline} />
      <About />
      <Experience />
      <SelectedWorks />
      <Contact />
    </>
  );
}
