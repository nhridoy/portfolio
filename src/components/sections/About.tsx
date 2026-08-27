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
// Percentage of scroll distance to pause at the beginning (0.05 = 05%)
const START_BREATHING_PERCENT = 0.05;

// Percentage of scroll distance where the reveal completes (0.85 = 85%)
// Remaining 15% (from 85% to 100%) acts as the ending pause buffer.
const END_BREATHING_PERCENT = 0.85;

// Extra scroll track length added at the start, as a multiple of 100vh
const START_BREATHING_HEIGHT_PERCENT = 0.6;

// Extra scroll track length added at the end, as a multiple of 100vh.
const END_BREATHING_HEIGHT_PERCENT = 1.6;

// ---------------------------------------------------------------------------
// OUTRO TRANSITION CONFIG
// ---------------------------------------------------------------------------
// All values below are fractions of outroProgress (0 -> 1).
const OUTRO_CONTENT_FADE_START = 0.05; // content starts fading out
const OUTRO_CONTENT_FADE_END = 0.3; // content fully faded out by here
const OUTRO_BAR_GROW_START = 0.08; // white bars start growing inward
const OUTRO_BAR_GROW_END = 0.85; // white bars reach their resting inset
// Each bar grows to 45% of screen width, leaving 10% of screen as black gap
const OUTRO_BAR_INSET = "45%";
const OUTRO_BLACKEN_START = 0.08; // gap starts turning solid black
const OUTRO_BLACKEN_END = 0.35; // gap is fully solid black
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

  const cardsHeightVh = totalCards * 100;
  const startBreathingVh = 100 * START_BREATHING_HEIGHT_PERCENT;
  const endBreathingVh = 100 * END_BREATHING_HEIGHT_PERCENT;
  const totalHeightVh = cardsHeightVh + startBreathingVh + endBreathingVh;

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const breathingStartFraction = startBreathingVh / totalHeightVh;
  const breathingEndFraction = 1 - endBreathingVh / totalHeightVh;

  const activeProgress = useTransform(
    rawProgress,
    [breathingStartFraction, breathingEndFraction],
    [0, 1],
  );

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

  // --------------------------------------------------------------------- //
  // OUTRO PROGRESS
  //
  // To ensure a resting pause after cards finish revealing, `outroRaw`
  // starts at `breathingEndFraction` rather than `rawFractionAtRevealComplete`.
  // --------------------------------------------------------------------- //
  const rawFractionAtOutroStart = breathingEndFraction;

  const outroRaw = useTransform(
    rawProgress,
    [rawFractionAtOutroStart, 1],
    [0, 1],
  );

  const outroProgress = useSpring(outroRaw, {
    stiffness: 300,
    damping: 40,
    mass: 1,
  });

  // Stage 1: content fades out as curtain starts coming in
  const contentOpacity = useTransform(
    outroProgress,
    [0, OUTRO_CONTENT_FADE_START, OUTRO_CONTENT_FADE_END, 1],
    [1, 1, 0, 0],
  );

  // Stage 1: white bars grow inward from each edge
  const barInset = useTransform(
    outroProgress,
    [0, OUTRO_BAR_GROW_START, OUTRO_BAR_GROW_END, 1],
    ["0%", "0%", OUTRO_BAR_INSET, OUTRO_BAR_INSET],
  );

  // Stage 1: gap between bars turns solid black
  const gapOpacity = useTransform(
    outroProgress,
    [0, OUTRO_BLACKEN_START, OUTRO_BLACKEN_END, 1],
    [0, 0, 1, 1],
  );

  const outroOverlayOpacity = useTransform(
    outroProgress,
    [0, OUTRO_BAR_GROW_START],
    [0, 1],
  );

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const crossPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rotateCross = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const markerPositions = useMemo(() => {
    if (totalCards <= 1) return [0];
    return Array.from({ length: totalCards }, (_, i) => i / (totalCards - 1));
  }, [totalCards]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-foreground relative"
      style={{
        height: `${totalHeightVh}vh`,
      }}
    >
      <div className="sticky top-0 theme-container py-12 h-screen flex flex-col justify-between overflow-hidden">
        {/* Main content layer */}
        <Div
          style={{ opacity: contentOpacity }}
          className="flex flex-col justify-between h-full"
        >
          {/* Header */}
          <div className="border-t-[0.0625rem] border-b-[0.0625rem] border-background/20 py-8 shrink-0">
            <AnimatedSmallText text="The Narrative" />
            <h2 className="text-4xl sm:text-6xl uppercase font-bold text-background leading-none">
              <span className="block [font-size:inherit]">Skills &</span>
              <span className="block [font-size:inherit]">Interests</span>
            </h2>
          </div>

          {/* Cards */}
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

          {/* Animated Line & Track Crosses */}
          <div className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12">
            <div className="w-full h-theme-px relative">
              <Div
                style={{ width: lineWidth }}
                className="h-full bg-background/20"
              />

              {markerPositions.map((position, i) => (
                <TrailMarker
                  // biome-ignore lint/suspicious/noArrayIndexKey: positions are static per render
                  key={i}
                  position={position}
                  scrollYProgress={scrollYProgress}
                />
              ))}

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
        </Div>
      </div>

      {/* Outro Transition Overlay */}
      <Div
        style={{ opacity: outroOverlayOpacity }}
        className="sticky top-0 h-screen w-full pointer-events-none"
      >
        <Div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: barInset,
          }}
          className="bg-background"
        />

        <Div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: barInset,
          }}
          className="bg-background"
        />

        <Div
          style={{
            position: "absolute",
            top: 0,
            left: barInset,
            right: barInset,
            height: "100%",
            opacity: gapOpacity,
          }}
          className="bg-foreground"
        />
      </Div>
    </section>
  );
}
