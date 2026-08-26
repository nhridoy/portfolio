"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { div as Div, h2 as H2 } from "framer-motion/m";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// EXPERIENCES DATA
// ---------------------------------------------------------------------------
const EXPERIENCES = [
  {
    id: "exp-1",
    role: "Lead Interactive Developer",
    company: "Studio Elevate",
    period: "2023 — Present",
    description:
      "Architecting award-winning web applications with WebGL, Framer Motion, and Next.js for high-end global brands.",
    skills: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    role: "Senior Frontend Engineer",
    company: "Aether Dynamics",
    period: "2022 — 2023",
    description:
      "Engineered high-performance design systems and micro-animation frameworks powering enterprise platforms.",
    skills: ["React", "TypeScript", "GSAP", "Design Systems"],
  },
  {
    id: "exp-3",
    role: "Creative Technologist",
    company: "Vanguard Studio",
    period: "2021 — 2022",
    description:
      "Pioneered interactive digital experiences, motion graphics, and canvas-driven UI components.",
    skills: ["Creative Coding", "WebGL", "Tailwind", "Figma"],
  },
  {
    id: "exp-4",
    role: "UI/UX Developer",
    company: "Monolith Labs",
    period: "2021",
    description:
      "Crafted fluid component libraries and responsive motion prototypes for client product launches.",
    skills: ["React", "JavaScript", "CSS Architecture", "Motion"],
  },
];

// ---------------------------------------------------------------------------
// TIMING CONFIG (Normalized scroll progress 0 -> 1)
// ---------------------------------------------------------------------------
const TEXT_REVEAL_START = 0.02;
const TEXT_REVEAL_END = 0.12;

const OUTRO_START = 0.18;
const OUTRO_END = 0.28;

const RESIZE_START = 0.28;
const RESIZE_END = 0.38;

const TIMELINE_START = 0.38;
const TIMELINE_END = 0.8;

// Phase 6: Expand line to full-screen curtain (0.80 -> 0.98)
const EXIT_EXPAND_START = 0.8;
const EXIT_EXPAND_END = 0.98;
// ---------------------------------------------------------------------------

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    scrollWidth: 0,
    windowWidth: 0,
    windowHeight: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        setDimensions({
          scrollWidth: trackRef.current.scrollWidth,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 250,
    damping: 35,
    mass: 0.8,
  });

  // Intro Text Animations
  const textOpacity = useTransform(
    scrollYProgress,
    [0, TEXT_REVEAL_START, TEXT_REVEAL_END, OUTRO_START, OUTRO_END, 1],
    [0, 0, 1, 1, 0, 0],
  );

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

  // Rotation and Resizing Transforms
  const barRotate = useTransform(
    scrollYProgress,
    [0, OUTRO_START, OUTRO_END, 1],
    [0, 0, 90, 90],
  );

  // Calculate dynamic scale factor to span exactly 100% of viewport width
  const targetScaleX =
    dimensions.windowWidth && dimensions.windowHeight
      ? dimensions.windowWidth / dimensions.windowHeight
      : 1.78;

  const barScaleX = useTransform(
    scrollYProgress,
    [0, RESIZE_START, RESIZE_END, 1],
    [1, 1, targetScaleX, targetScaleX],
  );

  // Bar expands from thin line (0.05) to full viewport curtain (12)
  const barScaleY = useTransform(
    scrollYProgress,
    [0, RESIZE_START, RESIZE_END, EXIT_EXPAND_START, EXIT_EXPAND_END, 1],
    [1, 1, 0.05, 0.05, 12, 12],
  );

  // Timeline Scroll Motion
  const startX = dimensions.windowWidth || 1000;
  const endX = dimensions.scrollWidth ? -(dimensions.scrollWidth + 100) : -3000;

  const trackX = useTransform(
    scrollYProgress,
    [TIMELINE_START, TIMELINE_END],
    [startX, endX],
  );

  const dynamicSectionHeight = dimensions.scrollWidth
    ? `calc(200vh + ${dimensions.scrollWidth + dimensions.windowWidth}px)`
    : "600vh";

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ height: dynamicSectionHeight }}
      className="relative bg-background text-foreground w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full-Screen Curtain Bar */}
        <Div
          style={{
            rotate: barRotate,
            scaleX: barScaleX,
            scaleY: barScaleY,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10vw] h-screen bg-foreground origin-center pointer-events-none z-30"
        />

        {/* Header Text */}
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

        {/* Timeline Track */}
        <Div
          ref={trackRef}
          style={{ x: trackX }}
          className="absolute top-0 left-0 h-full flex items-center gap-24 sm:gap-36 md:gap-48 px-12 z-20 pointer-events-auto"
        >
          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0;

            const RoleContent = (
              <div className="space-y-2">
                <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">
                  {exp.company}
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight">
                  {exp.role}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/75 font-light">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-foreground/15 text-foreground/80 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );

            const YearContent = (
              <div>
                <span className="text-4xl font-light tracking-tight font-cormorant text-foreground">
                  {exp.period}
                </span>
              </div>
            );

            return (
              <div
                key={exp.id}
                className="relative flex flex-col justify-center items-start w-70 sm:w-95 md:w-112.5 shrink-0 h-screen"
              >
                {/* Center Node Dot */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background z-30" />

                {/* --- ABOVE THE BAR --- */}
                <div className="absolute bottom-[calc(50%+1.5rem)] left-0 w-full pr-4">
                  {isEven ? RoleContent : YearContent}
                </div>

                {/* --- BELOW THE BAR --- */}
                <div className="absolute top-[calc(50%+1.5rem)] left-0 w-full pr-4">
                  {isEven ? YearContent : RoleContent}
                </div>
              </div>
            );
          })}
        </Div>
      </div>
    </section>
  );
}
