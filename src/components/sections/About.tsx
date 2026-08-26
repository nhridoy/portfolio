"use client";

import {
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { div as Div } from "framer-motion/m";
import { useMemo, useRef } from "react";
import { SKILLS } from "@/lib/constants";
import AnimatedSmallText from "./AnimatedSmallText";

// ---------------------------------------------------------------------------
// BREATHING & ANIMATION CONFIG (PERCENTAGE-BASED)
// ---------------------------------------------------------------------------
// Percentage of scroll distance to pause at the beginning (0.15 = 15%)
const START_BREATHING_PERCENT = 0.15;

// Percentage of scroll distance where the reveal completes (0.85 = 85%)
// Remaining 15% (from 85% to 100%) acts as the ending pause buffer.
const END_BREATHING_PERCENT = 0.85;

// Extra scroll track length added at the start/end, as a multiple of 100vh
// (1.0 = one extra viewport height of "resting" scroll on each side)
const EXTRA_BREATHING_HEIGHT_PERCENT = 0.6;
// ---------------------------------------------------------------------------

function SkillCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: {
    title: string;
    description?: string;
  };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const stepSize = 1 / total;
  const start = index * stepSize;
  const end = Math.min((index + 0.8) * stepSize, 1);

  // Title animates first, over the first ~60% of the card's slot
  const titleEnd = start + (end - start) * 0.6;
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, start, titleEnd, 1],
    [0, 0, 1, 1],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, start, titleEnd, 1],
    [30, 30, 0, 0],
  );

  // Description starts a bit after the title and finishes at the card's end
  const descStart = start + (end - start) * 0.25;
  const descOpacity = useTransform(
    scrollYProgress,
    [0, descStart, end, 1],
    [0, 0, 1, 1],
  );
  const descY = useTransform(
    scrollYProgress,
    [0, descStart, end, 1],
    [30, 30, 0, 0],
  );

  return (
    <div className="flex flex-col gap-6 text-background">
      <div className="space-y-4">
        <Div style={{ opacity: titleOpacity, y: titleY }}>
          <h3 className="text-2xl font-normal leading-tight">{card.title}</h3>
        </Div>

        {card.description && (
          <Div style={{ opacity: descOpacity, y: descY }}>
            <p className="text-sm leading-relaxed font-light text-background">
              {card.description}
            </p>
          </Div>
        )}
      </div>
    </div>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-3.5 h-3.5 relative flex items-center justify-center ${className}`}
    >
      <div className="absolute w-theme-px h-full bg-background" />
      <div className="absolute w-full h-theme-px bg-background" />
    </div>
  );
}

// A "+" left behind on the track once the leading cross has scrolled past
// its position. Hidden by default, fades in right as the leading cross
// reaches (and departs from) this spot.
function TrailMarker({
  position,
  scrollYProgress,
}: {
  position: number;
  scrollYProgress: MotionValue<number>;
}) {
  const revealStart = Math.max(position - 0.001, 0);
  const opacity = useTransform(
    scrollYProgress,
    [revealStart, position + 0.001],
    [0, 1],
  );

  return (
    <Div
      style={{
        top: "50%",
        left: `${position * 100}%`,
        x: "-50%",
        y: "-50%",
        opacity,
      }}
      className="absolute pointer-events-none"
    >
      <Cross />
    </Div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalCards = Object.keys(SKILLS).length;

  // Base scroll distance needed for the card-by-card reveal itself.
  const cardsHeightVh = totalCards * 100;

  // Extra "resting" scroll distance appended at the start and end so the
  // section pauses before the reveal begins and after it finishes.
  const breathingVh = 100 * EXTRA_BREATHING_HEIGHT_PERCENT;
  const totalHeightVh = cardsHeightVh + breathingVh * 2;

  // Raw scroll progress across the ENTIRE section (breathing zones included).
  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fractions of the total track where the breathing padding lives, derived
  // from the actual vh amounts so the pause length matches real scroll
  // distance rather than an arbitrary percentage of the whole track.
  const breathingStartFraction = breathingVh / totalHeightVh;
  const breathingEndFraction = 1 - breathingVh / totalHeightVh;

  // Remap raw progress so 0 -> 1 only spans the "active" middle zone.
  // Outside that zone useTransform clamps to 0 or 1, i.e. it holds still.
  const activeProgress = useTransform(
    rawProgress,
    [breathingStartFraction, breathingEndFraction],
    [0, 1],
  );

  // Within the active zone, apply the same start/end breathing percentages
  // used in the inspiration file so the reveal itself also has a soft
  // lead-in/lead-out instead of snapping straight to motion.
  const shapedProgress = useTransform(activeProgress, (p) => {
    if (p <= START_BREATHING_PERCENT) return 0;
    if (p >= END_BREATHING_PERCENT) return 1;
    return (
      (p - START_BREATHING_PERCENT) /
      (END_BREATHING_PERCENT - START_BREATHING_PERCENT)
    );
  });

  const scrollYProgress = useSpring(shapedProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
  });

  // Trailing line grows behind the leading cross as it moves right.
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Leading cross moves left -> right along the track
  const crossPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Leading cross spins 360 degrees as you scroll
  const rotateCross = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Evenly spaced marker positions, one per card, spanning the full track
  // (0%, ..., 100%). Each one is revealed only once the leading cross has
  // scrolled past it.
  const markerPositions = useMemo(() => {
    if (totalCards <= 1) return [0];
    return Array.from({ length: totalCards }, (_, i) => i / (totalCards - 1));
  }, [totalCards]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#0A0A0A] relative"
      style={{
        height: `${totalHeightVh}vh`,
      }}
    >
      <div className="sticky top-0 theme-container py-12 px-6 md:px-12 h-screen flex flex-col justify-between overflow-hidden">
        {/* Upper Header Section */}
        <div className="border-t-[0.0625rem] border-b-[0.0625rem] border-background/20 py-8 shrink-0">
          <AnimatedSmallText text="The Narrative" />
          <h2 className="text-4xl sm:text-6xl uppercase font-bold text-background leading-none">
            <span className="block [font-size:inherit]">Skills &</span>
            <span className="block [font-size:inherit]">Interests</span>
          </h2>
        </div>

        {/* Middle Main Content - Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 my-auto mt-5 gap-5">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <SkillCard
              key={category}
              card={{
                title: category,
                description: skills.join(", "),
              }}
              index={index}
              total={totalCards}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Lower Animated Line with Moving/Rotating Cross */}
        <div className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12">
          {/* No static track by default — just the trailing line + crosses */}
          <div className="w-full h-theme-px relative">
            {/* Trailing line, grows behind the leading cross */}
            <Div
              style={{ width: lineWidth }}
              className="h-full bg-background/20"
            />

            {/* "+" marks left behind once the leading cross passes each one */}
            {markerPositions.map((position, i) => (
              <TrailMarker
                // biome-ignore lint/suspicious/noArrayIndexKey: positions are static per render
                key={i}
                position={position}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Leading cross: moves right and rotates as you scroll */}
            <Div
              style={{
                top: "50%",
                left: crossPosition,
                x: "-50%",
                y: "-50%",
                rotate: rotateCross,
              }}
              className="absolute pointer-events-none"
            >
              <Cross />
            </Div>
          </div>
        </div>
      </div>
    </section>
  );
}
