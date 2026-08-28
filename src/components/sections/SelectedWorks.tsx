"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { div as Div, h2 as H2, span as Span } from "framer-motion/m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ============================================================================
// SOURCE IMAGE
// ============================================================================

const DEVICE_WIDTH = 800;
const DEVICE_HEIGHT = 588;

const DEVICE_ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;

// ============================================================================
// MACBOOK DISPLAY
// ============================================================================

const SCREEN_LEFT = 105 / DEVICE_WIDTH;
const SCREEN_TOP = 23 / DEVICE_HEIGHT;

const SCREEN_WIDTH = (691 - 105) / DEVICE_WIDTH;
const SCREEN_HEIGHT = (412 - 23) / DEVICE_HEIGHT;

const SCREEN_ASPECT_RATIO = 16 / 10;

// ============================================================================
// TIMELINE
// ============================================================================

const HEADING_START = 0.01;
const HEADING_END = 0.05;

const OUTLINE_START = 0.05;
const OUTLINE_END = 0.12;

const OUTLINE_HOLD_END = 0.18;

const CROSSFADE_START = 0.18;
const CROSSFADE_END = 0.25;

const DEVICE_HOLD_END = 0.28;

const REVEAL_START = 0.28;
const REVEAL_END = 0.38;

const PROJECT_SCALE_START = 0.28;
const PROJECT_SCALE_END = 0.4;

const FRAME_EXIT_START = 0.36;
const FRAME_EXIT_END = 0.4;

// Slides start at 0.40 and finish at 0.92 for a punchier scroll pace
const PROJECT_SLIDES_START = 0.4;
const PROJECT_SLIDES_END = 0.92;

// ============================================================================
// DEVICE SIZE
// ============================================================================

const DEVICE_WIDTH_RATIO = 0.92;
const DEVICE_HEIGHT_RATIO = 0.7;

const DEVICE_MIN_WIDTH = 280;
const DEVICE_MAX_WIDTH = 1100;

const FINAL_OVERSCAN = 1.001;

// ============================================================================
// MACBOOK ZOOM ORIGIN
// ============================================================================

const DEVICE_ZOOM_ORIGIN_X = 50;
const DEVICE_ZOOM_ORIGIN_Y = 34;

// ============================================================================
// PROJECTS
// ============================================================================

interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Digital Product",
    title: "Learning Platform",
    description:
      "A scalable learning experience combining thoughtful visual design, fluid interaction, and robust engineering.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=90",
  },
  {
    number: "02",
    category: "Web Experience",
    title: "Digital Commerce",
    description:
      "A refined commerce experience designed around clear navigation, expressive visuals, and effortless interaction.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2400&q=90",
  },
  {
    number: "03",
    category: "Product Interface",
    title: "Connected Experience",
    description:
      "A modern product interface built around clarity, purposeful motion, and a seamless relationship between content and interaction.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2400&q=90",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  const [projectTrackWidth, setProjectTrackWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (projectTrackRef.current) {
        setProjectTrackWidth(projectTrackRef.current.scrollWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.5,
  });

  // ==========================================================================
  // HEADING TRANSFORMS
  // ==========================================================================

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END, FRAME_EXIT_START, FRAME_EXIT_END],
    [0, 0, 1, 1, 0],
  );

  const headingY = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END],
    [60, 60, 0],
  );

  // ==========================================================================
  // DEVICE DIMENSIONS
  // ==========================================================================

  const widthBasedDeviceWidth = viewport.width * DEVICE_WIDTH_RATIO;
  const heightBasedDeviceWidth =
    viewport.height * DEVICE_HEIGHT_RATIO * DEVICE_ASPECT_RATIO;

  const calculatedDeviceWidth =
    viewport.width > 0 && viewport.height > 0
      ? Math.min(widthBasedDeviceWidth, heightBasedDeviceWidth)
      : DEVICE_WIDTH;

  const deviceWidth = Math.min(
    Math.max(calculatedDeviceWidth, DEVICE_MIN_WIDTH),
    DEVICE_MAX_WIDTH,
  );

  const deviceHeight = deviceWidth / DEVICE_ASPECT_RATIO;

  const deviceLeft = viewport.width / 2 - deviceWidth / 2;
  const deviceTop = viewport.height / 2 - deviceHeight / 2;

  const screenWidth = deviceWidth * SCREEN_WIDTH;
  const screenHeight = deviceHeight * SCREEN_HEIGHT;

  const screenLeft = deviceLeft + deviceWidth * SCREEN_LEFT;
  const screenTop = deviceTop + deviceHeight * SCREEN_TOP;

  const screenCenterX = screenLeft + screenWidth / 2;
  const screenCenterY = screenTop + screenHeight / 2;

  // ==========================================================================
  // OUTLINE TRANSFORMS
  // ==========================================================================

  const outlineOpacity = useTransform(
    scrollYProgress,
    [0, OUTLINE_START, OUTLINE_END, CROSSFADE_START, CROSSFADE_END],
    [0, 0, 1, 1, 0],
  );

  const outlineScale = useTransform(
    scrollYProgress,
    [OUTLINE_START, OUTLINE_END, OUTLINE_HOLD_END, CROSSFADE_END],
    [0.88, 1, 1, 1],
  );

  const outlineY = useTransform(
    scrollYProgress,
    [OUTLINE_START, OUTLINE_END, OUTLINE_HOLD_END, CROSSFADE_END],
    [35, 0, 0, 0],
  );

  // ==========================================================================
  // 3D MACBOOK OPACITY & ZOOM
  // ==========================================================================

  const deviceOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, FRAME_EXIT_START, FRAME_EXIT_END],
    [0, 1, 1, 0],
  );

  const scaleForWidth = viewport.width > 0 ? viewport.width / screenWidth : 1;
  const scaleForHeight =
    viewport.height > 0 ? viewport.height / screenHeight : 1;

  const finalDeviceScale =
    Math.max(scaleForWidth, scaleForHeight) * FINAL_OVERSCAN;

  const deviceScale = useTransform(
    scrollYProgress,
    [
      CROSSFADE_START,
      DEVICE_HOLD_END,
      PROJECT_SCALE_START,
      PROJECT_SCALE_END,
      1,
    ],
    [1, 1, 1, finalDeviceScale, finalDeviceScale],
  );

  const DEVICE_ZOOM_Y = -0.035;

  const deviceY = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [0, viewport.height * DEVICE_ZOOM_Y, viewport.height * DEVICE_ZOOM_Y],
  );

  // ==========================================================================
  // PROJECT LAYER TRANSFORMS
  // ==========================================================================

  const projectOpacity = useTransform(
    scrollYProgress,
    [0, CROSSFADE_END, REVEAL_START, 1],
    [0, 0, 1, 1],
  );

  const projectIntroOpacity = useTransform(
    scrollYProgress,
    [
      PROJECT_SCALE_START,
      PROJECT_SCALE_END,
      PROJECT_SLIDES_START - 0.02,
      PROJECT_SLIDES_START,
    ],
    [1, 1, 1, 0],
  );

  const initialProjectWidth = screenWidth;
  const initialProjectHeight = initialProjectWidth / SCREEN_ASPECT_RATIO;

  const projectScaleX = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [viewport.width > 0 ? initialProjectWidth / viewport.width : 1, 1, 1],
  );

  const projectScaleY = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [viewport.height > 0 ? initialProjectHeight / viewport.height : 1, 1, 1],
  );

  const projectInitialX = screenCenterX - viewport.width / 2;
  const projectInitialY = screenCenterY - viewport.height / 2;

  const projectX = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [projectInitialX, 0, 0],
  );

  const projectY = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [projectInitialY, 0, 0],
  );

  // ==========================================================================
  // SHUTTERS TRANSFORMS
  // ==========================================================================

  const topShutterY = useTransform(
    scrollYProgress,
    [REVEAL_START, REVEAL_END, 1],
    ["0%", "-105%", "-105%"],
  );

  const bottomShutterY = useTransform(
    scrollYProgress,
    [REVEAL_START, REVEAL_END, 1],
    ["0%", "105%", "105%"],
  );

  // ==========================================================================
  // DYNAMIC SECTION HEIGHT & HORIZONTAL SLIDER
  // ==========================================================================

  const projectTravelDistance =
    projectTrackWidth > 0 && viewport.width > 0
      ? projectTrackWidth
      : viewport.width * PROJECTS.length;

  // Reduced multiplier to speed up horizontal traversal per pixel scrolled
  const PROJECT_SCROLL_MULTIPLIER = 1.35;

  const BREATHING_SPACE = viewport.height * 0.2;

  const dynamicSectionHeight =
    viewport.width > 0 && viewport.height > 0 && projectTravelDistance > 0
      ? `calc(100vh + ${projectTravelDistance * PROJECT_SCROLL_MULTIPLIER + BREATHING_SPACE}px)`
      : "500vh";

  const projectTrackStartX = viewport.width;

  const projectTrackEndX =
    projectTrackWidth > 0 && viewport.width > 0
      ? -(projectTrackWidth - viewport.width)
      : -(viewport.width * (PROJECTS.length - 1));

  const projectTrackX = useTransform(
    scrollYProgress,
    [PROJECT_SLIDES_START, PROJECT_SLIDES_END, 1],
    [projectTrackStartX, projectTrackEndX, projectTrackEndX],
  );

  const projectSliderOpacity = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_END, PROJECT_SLIDES_START, PROJECT_SLIDES_START + 0.01],
    [0, 0, 1],
  );

  return (
    <section
      id="selected-works"
      ref={sectionRef}
      style={{ height: dynamicSectionHeight }}
      className="relative w-full bg-foreground text-background"
    >
      <Div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* ===================================================================
        PROJECT LAYER
        =================================================================== */}
        <Div
          style={{
            opacity: projectOpacity,
            x: projectX,
            y: projectY,
            scaleX: projectScaleX,
            scaleY: projectScaleY,
            transformOrigin: "50% 50%",
          }}
          className="absolute inset-0 z-10 h-svh w-full overflow-hidden bg-foreground"
        >
          {/* INTRO TEXT */}
          <Div
            style={{
              opacity: projectIntroOpacity,
            }}
            className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center gap-5 px-8 text-center"
          >
            <Span className="text-xs uppercase tracking-[0.3em] text-background/50">
              Featured Project
            </Span>

            <h3 className="text-[clamp(2.5rem,7vw,7rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-background">
              Digital <br /> Experience
            </h3>

            <Span className="max-w-2xl text-xs leading-relaxed tracking-wide text-background/60 sm:text-sm">
              A digital product combining expressive visual design, fluid
              interaction, and robust engineering.
            </Span>
          </Div>

          {/* PROJECT TRACK SLIDER */}
          <Div
            ref={projectTrackRef}
            style={{
              opacity: projectSliderOpacity,
              x: projectTrackX,
            }}
            className="absolute inset-0 z-10 flex h-full w-max"
          >
            {PROJECTS.map((project) => (
              <Div
                key={project.number}
                className="relative h-full w-screen shrink-0 overflow-hidden bg-foreground"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />

                <Div className="absolute inset-0 bg-foreground/65" />

                <Div className="theme-container relative z-10 flex h-full flex-col justify-between py-12">
                  <Div className="flex items-start justify-between">
                    <Span className="text-xs uppercase tracking-[0.3em] text-background/80">
                      {project.category}
                    </Span>

                    <Span className="font-mono text-xs text-background/80">
                      {project.number}
                    </Span>
                  </Div>

                  <Div className="flex flex-col gap-8 pb-4">
                    <h3 className="max-w-6xl text-6xl font-medium uppercase leading-[0.82] tracking-none text-background">
                      {project.title}
                    </h3>

                    <Div className="flex max-w-4xl items-end justify-between gap-8">
                      <Span className="max-w-xl text-xs leading-relaxed tracking-wide text-background/80 sm:text-sm">
                        {project.description}
                      </Span>

                      <Span className="hidden shrink-0 text-[10px] uppercase tracking-[0.25em] text-background/70 sm:block">
                        Selected Work
                      </Span>
                    </Div>
                  </Div>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>

        {/* ===================================================================
        MACBOOK LAYER
        =================================================================== */}
        <Div className="pointer-events-none absolute inset-0 z-20">
          {/* OUTLINE */}
          <Div
            style={{
              opacity: outlineOpacity,
              scale: outlineScale,
              y: outlineY,
              width: deviceWidth,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/outline_thick.png"
              alt=""
              width={DEVICE_WIDTH}
              height={DEVICE_HEIGHT}
              priority
              draggable={false}
              className="block h-auto w-full select-none"
            />
          </Div>

          {/* 3D MACBOOK FRAME */}
          <Div
            style={{
              opacity: deviceOpacity,
              scale: deviceScale,
              y: deviceY,
              width: deviceWidth,
              transformOrigin: `${DEVICE_ZOOM_ORIGIN_X}% ${DEVICE_ZOOM_ORIGIN_Y}%`,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Div
              className="absolute overflow-hidden"
              style={{
                left: `${SCREEN_LEFT * 100}%`,
                top: `${SCREEN_TOP * 100}%`,
                width: `${SCREEN_WIDTH * 100}%`,
                height: `${SCREEN_HEIGHT * 100}%`,
              }}
            >
              <Div
                style={{
                  y: topShutterY,
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-background"
              />

              <Div
                style={{
                  y: bottomShutterY,
                }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
              />
            </Div>

            <Image
              src="/3d.png"
              alt=""
              width={DEVICE_WIDTH}
              height={DEVICE_HEIGHT}
              priority
              draggable={false}
              className="relative z-10 block h-auto w-full select-none"
            />
          </Div>
        </Div>

        {/* ===================================================================
        THEME CONTAINER / OVERLAY HEADINGS
        =================================================================== */}
        <Div className="theme-container pointer-events-none absolute inset-0 h-svh py-12">
          <Div
            style={{
              opacity: headingOpacity,
              y: headingY,
            }}
            className="flex justify-between"
          >
            <H2 className="text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
              Selected <br /> Works
            </H2>

            <Div className="hidden max-w-60 md:block">
              <Span className="text-xs uppercase tracking-[0.25em] text-background/40">
                A curated collection of products, interfaces, and digital
                experiences I&apos;ve helped bring to life.
              </Span>
            </Div>
          </Div>

          <Div className="absolute bottom-8 left-0 flex items-center gap-3">
            <Div className="h-px w-8 bg-background/30" />

            <Span className="text-[10px] uppercase tracking-[0.25em] text-background/30">
              Scroll to explore
            </Span>
          </Div>

          <Div className="absolute bottom-8 right-0 font-mono text-[10px] text-background/30">
            01
          </Div>
        </Div>
      </Div>
    </section>
  );
}
