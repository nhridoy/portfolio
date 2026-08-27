"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import { useRef } from "react";

// ---------------------------------------------------------------------------
// TIMING CONFIG
// ---------------------------------------------------------------------------

// Heading
const HEADING_START = 0.02;
const HEADING_END = 0.1;

// Outline MacBook
const OUTLINE_START = 0.1;
const OUTLINE_END = 0.22;

// Outline hold
const OUTLINE_HOLD_END = 0.36;

// Outline → 3D crossfade
const CROSSFADE_START = 0.36;
const CROSSFADE_END = 0.46;

// 3D MacBook hold
const DEVICE_HOLD_END = 0.58;

// MacBook scale + screen split
const REVEAL_START = 0.58;
const REVEAL_END = 0.8;

// Final hold
const FINAL_HOLD_START = 0.8;

// ---------------------------------------------------------------------------
// DEVICE CONFIG
// ---------------------------------------------------------------------------

const SCREEN_LEFT = "13.25%";
const SCREEN_TOP = "3.4%";
const SCREEN_WIDTH = "73.5%";
const SCREEN_HEIGHT = "67%";

const DEVICE_TRANSFORM_ORIGIN = "50% 36.3%";

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  // -------------------------------------------------------------------------
  // SCROLL PROGRESS
  // -------------------------------------------------------------------------

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 250,
    damping: 35,
    mass: 0.8,
  });

  // -------------------------------------------------------------------------
  // HEADING
  // -------------------------------------------------------------------------

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END],
    [0, 0, 1],
  );

  const headingY = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END],
    [60, 60, 0],
  );

  // -------------------------------------------------------------------------
  // OUTLINE MACBOOK
  // -------------------------------------------------------------------------

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

  const outlineOpacity = useTransform(
    scrollYProgress,
    [0, OUTLINE_START, OUTLINE_END, CROSSFADE_START, CROSSFADE_END],
    [0, 0, 1, 1, 0],
  );

  // -------------------------------------------------------------------------
  // 3D MACBOOK
  // -------------------------------------------------------------------------

  const deviceOpacity = useTransform(
    scrollYProgress,
    [0, CROSSFADE_START, CROSSFADE_END, DEVICE_HOLD_END],
    [0, 0, 1, 1],
  );

  const deviceScale = useTransform(
    scrollYProgress,
    [CROSSFADE_START, DEVICE_HOLD_END, REVEAL_END, 1],
    [1, 1, 2.8, 2.8],
  );

  // -------------------------------------------------------------------------
  // WHITE DISPLAY
  // -------------------------------------------------------------------------

  const screenOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, DEVICE_HOLD_END, 1],
    [0, 1, 1, 1],
  );

  // -------------------------------------------------------------------------
  // CONTENT BEHIND DISPLAY
  // -------------------------------------------------------------------------

  const contentOpacity = useTransform(
    scrollYProgress,
    [REVEAL_START, 0.68, REVEAL_END, 1],
    [0, 0.4, 1, 1],
  );

  // -------------------------------------------------------------------------
  // SCREEN SPLIT
  // -------------------------------------------------------------------------

  const topPanelY = useTransform(
    scrollYProgress,
    [CROSSFADE_START, DEVICE_HOLD_END, REVEAL_END, FINAL_HOLD_START, 1],
    ["0%", "0%", "-105%", "-105%", "-105%"],
  );

  const bottomPanelY = useTransform(
    scrollYProgress,
    [CROSSFADE_START, DEVICE_HOLD_END, REVEAL_END, FINAL_HOLD_START, 1],
    ["0%", "0%", "105%", "105%", "105%"],
  );

  const panelOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, DEVICE_HOLD_END, 0.72, REVEAL_END, 1],
    [1, 1, 0.7, 0, 0],
  );

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------

  return (
    <section
      id="selected-works"
      ref={sectionRef}
      className="relative h-[600svh] w-full bg-foreground text-background"
    >
      {/* =====================================================================
          STICKY VIEWPORT

          theme-container is the actual layout boundary for all typography
          and metadata.
          ===================================================================== */}

      <div className="theme-container sticky top-0 h-screen py-12">
        <Div
          className="flex justify-between"
          style={{
            opacity: headingOpacity,
            y: headingY,
          }}
        >
          {/* ===================================================================
            HEADING
            =================================================================== */}

          <h2 className="text-4xl sm:text-6xl font-bold uppercase leading-none tracking-tight">
            Selected
            <br />
            Works
          </h2>

          {/* ===================================================================
            TOP RIGHT TEXT
            =================================================================== */}

          <Span className="text-xs uppercase tracking-[0.25rem] text-white/40 max-w-60">
            {/* Some 2-3 lines text here */}
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            efficitur.
          </Span>
        </Div>

        {/* ===================================================================
            DEVICE STAGE
            =================================================================== */}

        <Div className="absolute inset-0 flex items-center justify-center">
          {/* =================================================================
              OUTLINE MACBOOK
              ================================================================= */}

          <Div
            style={{
              opacity: outlineOpacity,
              scale: outlineScale,
              y: outlineY,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src="/outline_thick.png"
              alt=""
              draggable={false}
              className="block h-auto w-full select-none"
            />
          </Div>

          {/* =================================================================
              3D MACBOOK
              ================================================================= */}

          <Div
            style={{
              opacity: deviceOpacity,
              scale: deviceScale,
              transformOrigin: DEVICE_TRANSFORM_ORIGIN,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* ==============================================================
                CONTENT BEHIND DISPLAY
                ============================================================== */}

            <Div
              style={{
                opacity: contentOpacity,
              }}
              className="absolute left-[13.25%] top-[3.4%] h-[67%] w-[73.5%] overflow-hidden bg-[#d9ff3f]"
            >
              <Div className="flex h-full w-full items-center justify-center">
                <Span className="text-[clamp(2rem,5vw,5rem)] font-medium uppercase leading-none tracking-[-0.04em] text-black">
                  Project
                </Span>
              </Div>
            </Div>

            {/* ==============================================================
                WHITE DISPLAY
                ============================================================== */}

            <Div
              style={{
                left: SCREEN_LEFT,
                top: SCREEN_TOP,
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                opacity: screenOpacity,
              }}
              className="absolute overflow-hidden"
            >
              {/* ============================================================
                  TOP HALF
                  ============================================================ */}

              <Div
                style={{
                  y: topPanelY,
                  opacity: panelOpacity,
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-background"
              />

              {/* ============================================================
                  BOTTOM HALF
                  ============================================================ */}

              <Div
                style={{
                  y: bottomPanelY,
                  opacity: panelOpacity,
                }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
              />
            </Div>

            {/* ==============================================================
                3D MACBOOK IMAGE
                ============================================================== */}

            <img
              src="/3d.png"
              alt=""
              draggable={false}
              className="relative z-10 block h-auto w-full select-none"
            />
          </Div>
        </Div>
      </div>
    </section>
  );
}
