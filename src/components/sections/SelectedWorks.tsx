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

const SCREEN_ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

// ============================================================================
// TIMELINE
// ============================================================================

const HEADING_START = 0.02;
const HEADING_END = 0.1;

const OUTLINE_START = 0.1;
const OUTLINE_END = 0.22;

const OUTLINE_HOLD_END = 0.34;

const CROSSFADE_START = 0.34;
const CROSSFADE_END = 0.46;

const DEVICE_HOLD_END = 0.56;

const REVEAL_START = 0.56;
const REVEAL_END = 0.76;

const PROJECT_SCALE_START = 0.56;
const PROJECT_SCALE_END = 0.82;

// 3D MacBook disappears here.
// Project DOES NOT disappear here.
const FRAME_EXIT_START = 0.84;
const FRAME_EXIT_END = 0.94;

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
// COMPONENT
// ============================================================================

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  // ==========================================================================
  // VIEWPORT
  // ==========================================================================

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  // ==========================================================================
  // SCROLL
  // ==========================================================================

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 250,
    damping: 35,
    mass: 0.8,
  });

  // ==========================================================================
  // HEADING
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
  // DEVICE SIZE
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

  // ==========================================================================
  // DEVICE POSITION
  // ==========================================================================

  const deviceLeft = viewport.width / 2 - deviceWidth / 2;

  const deviceTop = viewport.height / 2 - deviceHeight / 2;

  // ==========================================================================
  // DISPLAY SIZE
  // ==========================================================================

  const screenWidth = deviceWidth * SCREEN_WIDTH;

  const screenHeight = deviceHeight * SCREEN_HEIGHT;

  // ==========================================================================
  // DISPLAY POSITION
  // ==========================================================================

  const screenLeft = deviceLeft + deviceWidth * SCREEN_LEFT;

  const screenTop = deviceTop + deviceHeight * SCREEN_TOP;

  const screenCenterX = screenLeft + screenWidth / 2;

  const screenCenterY = screenTop + screenHeight / 2;

  // ==========================================================================
  // OUTLINE
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
  // 3D MACBOOK OPACITY
  // ==========================================================================

  const deviceOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, FRAME_EXIT_START, FRAME_EXIT_END],
    [0, 1, 1, 0],
  );

  // ==========================================================================
  // PROJECT OPACITY
  // ==========================================================================

  /*
   * IMPORTANT:
   *
   * Project appears only AFTER the 3D MacBook reaches 100%.
   *
   * It remains visible after the MacBook disappears.
   *
   * The project is therefore independent from the MacBook's exit animation.
   *
   *                3D
   *                 ↓
   *          ┌─────────────┐
   *          │   100%      │
   *          └─────────────┘
   *                 ↓
   *              PROJECT
   *                 ↓
   *       ┌──────────────────┐
   *       │                  │
   *       │     PROJECT      │
   *       │                  │
   *       └──────────────────┘
   *
   * The project remains visible for the remainder of this section.
   */

  const projectOpacity = useTransform(
    scrollYProgress,
    [0, CROSSFADE_END, REVEAL_START, 1],
    [0, 0, 1, 1],
  );

  // ==========================================================================
  // MACBOOK ZOOM
  // ==========================================================================

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

  // ==========================================================================
  // DEVICE Y
  // ==========================================================================

  const DEVICE_ZOOM_Y = -0.035;

  const deviceY = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [0, viewport.height * DEVICE_ZOOM_Y, viewport.height * DEVICE_ZOOM_Y],
  );

  // ==========================================================================
  // PROJECT INITIAL SCALE
  // ==========================================================================

  /*
   * Project starts as a viewport-sized element.
   *
   * It is uniformly scaled down until it covers the MacBook display.
   */

  const projectInitialScale =
    viewport.width > 0 && viewport.height > 0
      ? Math.max(screenWidth / viewport.width, screenHeight / viewport.height)
      : 1;

  const projectScale = useTransform(
    scrollYProgress,
    [PROJECT_SCALE_START, PROJECT_SCALE_END, 1],
    [projectInitialScale, 1, 1],
  );

  // ==========================================================================
  // PROJECT POSITION
  // ==========================================================================

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
  // WHITE SHUTTERS
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
  // RENDER
  // ==========================================================================

  return (
    <section
      id="selected-works"
      ref={sectionRef}
      className="relative h-[600svh] w-full bg-foreground text-background"
    >
      {/* =====================================================================
          STICKY VIEWPORT
          ===================================================================== */}

      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* ===================================================================
            PROJECT LAYER
            =================================================================== */}

        <Div
          style={{
            opacity: projectOpacity,
            x: projectX,
            y: projectY,
            scale: projectScale,
            transformOrigin: "50% 50%",
          }}
          className="absolute inset-0 z-10 h-svh w-full bg-[#d9ff3f]"
        >
          <Div className="flex h-full w-full flex-col items-center justify-center gap-5 px-8 text-center">
            <Span className="text-xs uppercase tracking-[0.3em] text-foreground/50">
              Featured Project
            </Span>

            <h3 className="text-[clamp(2.5rem,7vw,7rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-foreground">
              Digital
              <br />
              Experience
            </h3>

            <Span className="max-w-2xl text-xs leading-relaxed tracking-wide text-foreground/60 sm:text-sm">
              A digital product combining expressive visual design, fluid
              interaction, and robust engineering.
            </Span>
          </Div>
        </Div>

        {/* ===================================================================
            MACBOOK LAYER
            =================================================================== */}

        <Div className="pointer-events-none absolute inset-0 z-20">
          {/* ================================================================
              OUTLINE
              ================================================================ */}

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

          {/* ================================================================
              3D MACBOOK
              ================================================================ */}

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
            {/* ==============================================================
                DISPLAY / SHUTTERS
                ============================================================== */}

            <Div
              className="absolute overflow-hidden"
              style={{
                left: `${SCREEN_LEFT * 100}%`,
                top: `${SCREEN_TOP * 100}%`,
                width: `${SCREEN_WIDTH * 100}%`,
                height: `${SCREEN_HEIGHT * 100}%`,
              }}
            >
              {/* TOP SHUTTER */}

              <Div
                style={{
                  y: topShutterY,
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-background"
              />

              {/* BOTTOM SHUTTER */}

              <Div
                style={{
                  y: bottomShutterY,
                }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
              />
            </Div>

            {/* MACBOOK */}

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
            THEME CONTAINER
            =================================================================== */}

        <div className="theme-container pointer-events-none absolute inset-0 h-svh py-12">
          {/* HEADER */}

          <Div
            style={{
              opacity: headingOpacity,
              y: headingY,
            }}
            className="flex justify-between"
          >
            <H2 className="text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
              Selected
              <br />
              Works
            </H2>

            <Div className="hidden max-w-60 md:block">
              <Span className="text-xs uppercase tracking-[0.25em] text-background/40">
                A curated collection of products, interfaces, and digital
                experiences I&apos;ve helped bring to life.
              </Span>
            </Div>
          </Div>

          {/* BOTTOM LEFT */}

          <Div className="absolute bottom-8 left-0 flex items-center gap-3">
            <Div className="h-px w-8 bg-background/30" />

            <Span className="text-[10px] uppercase tracking-[0.25em] text-background/30">
              Scroll to explore
            </Span>
          </Div>

          {/* BOTTOM RIGHT */}

          <Div className="absolute bottom-8 right-0 font-mono text-[10px] text-background/30">
            01
          </Div>
        </div>
      </div>
    </section>
  );
}
