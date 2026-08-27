"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// TIMING
// ---------------------------------------------------------------------------

const HEADING_START = 0.02;
const HEADING_END = 0.1;

const OUTLINE_START = 0.1;
const OUTLINE_END = 0.22;
const OUTLINE_HOLD_END = 0.36;

const CROSSFADE_START = 0.36;
const CROSSFADE_END = 0.46;

const DEVICE_HOLD_END = 0.58;

const REVEAL_START = 0.58;
const REVEAL_END = 0.8;

const FINAL_HOLD_START = 0.8;

// ---------------------------------------------------------------------------
// DEVICE SOURCE DIMENSIONS
// ---------------------------------------------------------------------------

const DEVICE_WIDTH = 800;
const DEVICE_HEIGHT = 588;

const DEVICE_ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;

// ---------------------------------------------------------------------------
// DISPLAY AREA
// ---------------------------------------------------------------------------

/*
 * Approximate display area inside 3d.png.
 */

const SCREEN_LEFT = 0.1325;
const SCREEN_TOP = 0.034;
const SCREEN_WIDTH = 0.735;
const SCREEN_HEIGHT = 0.67;

// ---------------------------------------------------------------------------
// DEVICE TRANSFORM ORIGIN
// ---------------------------------------------------------------------------

const DEVICE_ORIGIN_X = 0.5;
const DEVICE_ORIGIN_Y = 0.363;

// ---------------------------------------------------------------------------
// DEVICE SIZE CONFIG
// ---------------------------------------------------------------------------

/*
 * On larger/landscape screens:
 *
 *     70svh
 *
 * determines the laptop's height.
 *
 * On portrait screens:
 *
 *     92vw
 *
 * becomes the limiting factor.
 *
 * This prevents the laptop from ever being wider than the viewport while
 * preserving the height-based sizing on desktop.
 */

const DEVICE_HEIGHT_RATIO = 0.7;
const DEVICE_WIDTH_RATIO = 0.92;

const DEVICE_MIN_WIDTH = 280;
const DEVICE_MAX_WIDTH = 1100;

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  // -------------------------------------------------------------------------
  // VIEWPORT
  // -------------------------------------------------------------------------

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
    [0, HEADING_START, HEADING_END, FINAL_HOLD_START, 0.9],
    [0, 0, 1, 1, 0],
  );

  const headingY = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END],
    [60, 60, 0],
  );

  // -------------------------------------------------------------------------
  // INTRO TEXT
  // -------------------------------------------------------------------------

  const introTextOpacity = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END, FINAL_HOLD_START, 0.9],
    [0, 0, 1, 1, 0],
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
  // 3D DEVICE OPACITY
  // -------------------------------------------------------------------------

  const deviceOpacity = useTransform(
    scrollYProgress,
    [0, CROSSFADE_START, CROSSFADE_END, DEVICE_HOLD_END],
    [0, 0, 1, 1],
  );

  // -------------------------------------------------------------------------
  // RESPONSIVE DEVICE WIDTH
  // -------------------------------------------------------------------------

  /*
   * Two independent constraints:
   *
   * 1. Width constraint
   *    --------------------------------
   *    The laptop cannot exceed 92% of
   *    the viewport width.
   *
   * 2. Height constraint
   *    --------------------------------
   *    The laptop's height is capped at
   *    70% of viewport height.
   *
   * Since DEVICE_WIDTH / DEVICE_HEIGHT is
   * the source image aspect ratio, converting
   * the height constraint into width gives:
   *
   * viewportHeight × 0.70 × aspectRatio
   *
   * Then we take the smaller of the two.
   */

  const widthBasedDeviceWidth = viewport.width * DEVICE_WIDTH_RATIO;

  const heightBasedDeviceWidth =
    viewport.height * DEVICE_HEIGHT_RATIO * DEVICE_ASPECT_RATIO;

  const calculatedDeviceWidth =
    viewport.width > 0 && viewport.height > 0
      ? Math.min(widthBasedDeviceWidth, heightBasedDeviceWidth)
      : 800;

  const deviceWidth = Math.min(
    Math.max(calculatedDeviceWidth, DEVICE_MIN_WIDTH),
    DEVICE_MAX_WIDTH,
  );

  const deviceHeight = deviceWidth / DEVICE_ASPECT_RATIO;

  // -------------------------------------------------------------------------
  // DISPLAY SIZE AT SCALE 1
  // -------------------------------------------------------------------------

  const screenWidthAtScaleOne = deviceWidth * SCREEN_WIDTH;

  const screenHeightAtScaleOne = deviceHeight * SCREEN_HEIGHT;

  // -------------------------------------------------------------------------
  // TARGET SCALE
  // -------------------------------------------------------------------------

  /*
   * We don't calculate the zoom from the MacBook itself.
   *
   * We calculate the scale required for the DISPLAY to cover the entire
   * viewport.
   *
   * This means the final zoom works correctly regardless of:
   *
   * - mobile
   * - portrait tablet
   * - laptop
   * - desktop
   * - ultrawide
   * - 4K
   */

  const scaleForWidth =
    viewport.width > 0 ? viewport.width / screenWidthAtScaleOne : 1;

  const scaleForHeight =
    viewport.height > 0 ? viewport.height / screenHeightAtScaleOne : 1;

  const targetDeviceScale = Math.max(scaleForWidth, scaleForHeight);

  // -------------------------------------------------------------------------
  // DEVICE SCALE
  // -------------------------------------------------------------------------

  const deviceScale = useTransform(
    scrollYProgress,
    [CROSSFADE_START, DEVICE_HOLD_END, REVEAL_END, FINAL_HOLD_START, 1],
    [1, 1, targetDeviceScale, targetDeviceScale, targetDeviceScale],
  );

  // -------------------------------------------------------------------------
  // PROJECT CONTENT
  // -------------------------------------------------------------------------

  const projectOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, 1],
    [0, 1, 1],
  );

  // -------------------------------------------------------------------------
  // SCREEN SHUTTERS
  // -------------------------------------------------------------------------

  /*
   * No opacity animation.
   *
   * The white screen simply splits apart.
   */

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

  // -------------------------------------------------------------------------
  // MACBOOK IMAGE VISIBILITY
  // -------------------------------------------------------------------------

  /*
   * Once the screen has taken over the viewport, the MacBook itself
   * disappears so the project can continue as a full-screen experience.
   */

  const deviceImageOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, REVEAL_END, FINAL_HOLD_START],
    [0, 1, 1, 0],
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
          ===================================================================== */}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ===================================================================
            FULL VIEWPORT DEVICE STAGE

            NOT inside theme-container.
            =================================================================== */}

        <Div className="absolute inset-0 z-20 flex items-center justify-center">
          {/* =================================================================
              OUTLINE MACBOOK
              ================================================================= */}

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

          {/* =================================================================
              3D MACBOOK
              ================================================================= */}

          <Div
            style={{
              opacity: deviceOpacity,
              scale: deviceScale,
              width: deviceWidth,
              transformOrigin: `${DEVICE_ORIGIN_X * 100}% ${
                DEVICE_ORIGIN_Y * 100
              }%`,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* ==============================================================
                PROJECT CONTENT
                ============================================================== */}

            <Div
              style={{
                opacity: projectOpacity,
                left: `${SCREEN_LEFT * 100}%`,
                top: `${SCREEN_TOP * 100}%`,
                width: `${SCREEN_WIDTH * 100}%`,
                height: `${SCREEN_HEIGHT * 100}%`,
              }}
              className="absolute overflow-hidden bg-[#d9ff3f]"
            >
              <Div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
                <Span className="text-xs uppercase tracking-[0.3em] text-black/50">
                  Featured Project
                </Span>

                <Span className="text-[clamp(2rem,5vw,5rem)] font-medium uppercase leading-none tracking-[-0.04em] text-black">
                  Digital Experience
                </Span>

                <Span className="max-w-xl text-xs leading-relaxed tracking-wide text-black/60 sm:text-sm">
                  A thoughtful digital product combining expressive visual
                  design, fluid interaction, and robust engineering.
                </Span>
              </Div>
            </Div>

            {/* ==============================================================
                WHITE SCREEN SHUTTERS
                ============================================================== */}

            <Div
              style={{
                left: `${SCREEN_LEFT * 100}%`,
                top: `${SCREEN_TOP * 100}%`,
                width: `${SCREEN_WIDTH * 100}%`,
                height: `${SCREEN_HEIGHT * 100}%`,
              }}
              className="absolute overflow-hidden"
            >
              {/* ============================================================
                  TOP SHUTTER
                  ============================================================ */}

              <Div
                style={{
                  y: topPanelY,
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-background"
              />

              {/* ============================================================
                  BOTTOM SHUTTER
                  ============================================================ */}

              <Div
                style={{
                  y: bottomPanelY,
                }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
              />
            </Div>

            {/* ==============================================================
                3D MACBOOK IMAGE
                ============================================================== */}

            <Div
              style={{
                opacity: deviceImageOpacity,
              }}
              className="relative z-10"
            >
              <Image
                src="/3d.png"
                alt=""
                width={DEVICE_WIDTH}
                height={DEVICE_HEIGHT}
                priority
                draggable={false}
                className="block h-auto w-full select-none"
              />
            </Div>
          </Div>
        </Div>

        {/* ===================================================================
            THEME CONTAINER

            BELOW DEVICE LAYER.

            The MacBook/project can therefore cover this content as it zooms.
            =================================================================== */}

        <div className="theme-container pointer-events-none absolute inset-0 z-10 h-screen py-12">
          {/* =================================================================
              HEADER
              ================================================================= */}

          <Div
            className="flex justify-between"
            style={{
              opacity: headingOpacity,
              y: headingY,
            }}
          >
            <h2 className="text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
              Selected
              <br />
              Works
            </h2>

            <Span
              style={{
                opacity: introTextOpacity,
              }}
              className="max-w-60 text-xs uppercase tracking-[0.25em] text-white/40"
            >
              A curated collection of products, interfaces, and digital
              experiences I&apos;ve helped bring to life.
            </Span>
          </Div>

          {/* =================================================================
              BOTTOM LEFT
              ================================================================= */}

          <Div className="absolute bottom-8 left-0 flex items-center gap-3">
            <Div className="h-px w-8 bg-white/30" />

            <Span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Scroll to explore
            </Span>
          </Div>

          {/* =================================================================
              BOTTOM RIGHT
              ================================================================= */}

          <Div className="absolute bottom-8 right-0 font-mono text-[10px] text-white/30">
            01
          </Div>
        </div>
      </div>
    </section>
  );
}
