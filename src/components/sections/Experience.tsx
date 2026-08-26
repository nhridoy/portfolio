"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { div as Div, h2 as H2 } from "framer-motion/m";
import { useRef } from "react";

// ---------------------------------------------------------------------------
// ANIMATION TIMING CONFIG (Fractions of total scroll track 0 -> 1)
// ---------------------------------------------------------------------------
// Phase 1: Text reveal phase (0.05 -> 0.25)
const TEXT_REVEAL_START = 0.05;
const TEXT_REVEAL_END = 0.25;

// Phase 2: Breathing window (0.25 -> 0.40) — text rests fully visible

// Phase 3: Outro transition phase (0.40 -> 0.60) — Text fades & bar rotates 90deg
const OUTRO_START = 0.4;
const OUTRO_END = 0.6;

// Phase 4: Bar Resize phase (0.60 -> 0.85) — STRICTLY AFTER 90deg rotation finishes
const RESIZE_START = 0.6;
const RESIZE_END = 0.85;
// ---------------------------------------------------------------------------

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
  });

  // Text Opacity: Fade in -> Hold -> Fade out during rotation
  const textOpacity = useTransform(
    scrollYProgress,
    [0, TEXT_REVEAL_START, TEXT_REVEAL_END, OUTRO_START, OUTRO_END, 1],
    [0, 0, 1, 1, 0, 0],
  );

  // Left & Right Text Slide-in
  const leftTextX = useTransform(
    scrollYProgress,
    [0, TEXT_REVEAL_START, TEXT_REVEAL_END, OUTRO_START, OUTRO_END, 1],
    [-50, -50, 0, 0, -30, -30],
  );

  const rightTextX = useTransform(
    scrollYProgress,
    [0, TEXT_REVEAL_START, TEXT_REVEAL_END, OUTRO_START, OUTRO_END, 1],
    [50, 50, 0, 0, 30, 30],
  );

  // Phase 3: Rotation finishes at OUTRO_END (0.60)
  const barRotate = useTransform(
    scrollYProgress,
    [0, OUTRO_START, OUTRO_END, 1],
    [0, 0, 90, 90],
  );

  // Phase 4: Corrected Scale Mappings
  // barScaleX controls Visual Width (Horizontal Screen Length): Expands edge-to-edge
  const barScaleX = useTransform(
    scrollYProgress,
    [0, RESIZE_START, RESIZE_END, 1],
    [1, 1, 2.5, 2.5],
  );

  // barScaleY controls Visual Height (Vertical Screen Thickness): Shrinks down to ~2px line
  const barScaleY = useTransform(
    scrollYProgress,
    [0, RESIZE_START, RESIZE_END, 1],
    [1, 1, 0.05, 0.05],
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-background text-foreground h-[300vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Central Bar */}
        <Div
          style={{
            rotate: barRotate,
            scaleX: barScaleX,
            scaleY: barScaleY,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10vw] h-screen bg-foreground origin-center pointer-events-none z-10"
        />

        {/* Content Container */}
        <div className="theme-container w-full h-full relative flex items-center justify-between px-6 md:px-12 z-0">
          <H2
            style={{ opacity: textOpacity, x: leftTextX }}
            className="text-4xl sm:text-6xl md:text-7xl uppercase font-bold leading-none tracking-tight"
          >
            <span className="block [font-size:inherit]">Working</span>
            <span className="block [font-size:inherit]">Expertly</span>
          </H2>

          <H2
            style={{ opacity: textOpacity, x: rightTextX }}
            className="text-4xl sm:text-6xl md:text-7xl uppercase font-bold leading-none tracking-tight"
          >
            <span className="block [font-size:inherit]">Since</span>
            <span className="block [font-size:inherit]">2021</span>
          </H2>
        </div>
      </div>
    </section>
  );
}
