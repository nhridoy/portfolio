"use client";

import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { div as Div, h2 as H2 } from "framer-motion/m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/constants";
import { ProjectMosaic } from "./project-mosaic";
import { SelectedWorkPanel } from "./selected-work-panel";

const DEVICE_WIDTH = 800;
const DEVICE_HEIGHT = 588;
// Bounds of the transparent display in macbook-pro.svg, including the area
// above the notch. The SVG itself masks the notch and rounded corners.
const SCREEN_LEFT = 104 / DEVICE_WIDTH;
const SCREEN_TOP = 12 / DEVICE_HEIGHT;
const SCREEN_WIDTH = (693 - 104) / DEVICE_WIDTH;
const SCREEN_HEIGHT = (413 - 12) / DEVICE_HEIGHT;

// Separate scroll beats: outline → solid device → shutters → zoom → mosaic hold.
const HEADING_START = 0.01;
const HEADING_END = 0.04;
const OUTLINE_START = 0.05;
const OUTLINE_END = 0.09;
const CROSSFADE_START = 0.12;
const CROSSFADE_END = 0.17;
const SHUTTER_START = 0.19;
const SHUTTER_END = 0.24;
const ZOOM_START = 0.26;
const ZOOM_END = 0.36;
const FRAME_EXIT_END = 0.37;
const GALLERY_REVEAL_START = 0.368;
const PROJECT_SLIDES_START = 0.372;
const PROJECT_SLIDES_END = 0.98;
const SLIDE_TRAVEL_FRACTION = 0.82;

// Continuous velocity and acceleration at both ends of every movement.
function smootherstep(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10);
}

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [activeProject, setActiveProject] = useState(-1);
  const [mosaicActive, setMosaicActive] = useState(false);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const measure = () => {
      // Use the actual sticky surface, not innerHeight (which differs from svh
      // on mobile browsers with an expanding/collapsing address bar).
      setViewport({ width: element.clientWidth, height: element.clientHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.5,
  });

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, HEADING_START, HEADING_END, ZOOM_START, ZOOM_END],
    [0, 0, 1, 1, 0],
  );
  const headingY = useTransform(
    scrollYProgress,
    [HEADING_START, HEADING_END],
    [40, 0],
  );
  const outlineOpacity = useTransform(
    scrollYProgress,
    [OUTLINE_START, OUTLINE_END, CROSSFADE_START, CROSSFADE_END],
    [0, 1, 1, 0],
  );
  const outlineScale = useTransform(
    scrollYProgress,
    [OUTLINE_START, OUTLINE_END],
    [0.92, 1],
  );
  const outlineY = useTransform(
    scrollYProgress,
    [OUTLINE_START, OUTLINE_END],
    [20, 0],
  );
  const deviceOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_START, CROSSFADE_END, ZOOM_END, FRAME_EXIT_END],
    [0, 1, 1, 0],
  );

  const deviceWidth =
    viewport.width && viewport.height
      ? Math.min(
          viewport.width * 0.92,
          (viewport.height * 0.7 * DEVICE_WIDTH) / DEVICE_HEIGHT,
          1100,
        )
      : DEVICE_WIDTH;
  const deviceHeight = (deviceWidth * DEVICE_HEIGHT) / DEVICE_WIDTH;
  const screenWidth = deviceWidth * SCREEN_WIDTH;
  const screenHeight = deviceHeight * SCREEN_HEIGHT;
  const screenCenterX =
    (viewport.width - deviceWidth) / 2 +
    deviceWidth * (SCREEN_LEFT + SCREEN_WIDTH / 2);
  const screenCenterY =
    (viewport.height - deviceHeight) / 2 +
    deviceHeight * (SCREEN_TOP + SCREEN_HEIGHT / 2);
  const finalScale =
    viewport.width && viewport.height
      ? Math.max(viewport.width / screenWidth, viewport.height / screenHeight) *
        1.015
      : 1;

  const zoomLinear = useTransform(
    scrollYProgress,
    [ZOOM_START, ZOOM_END],
    [0, 1],
  );
  const zoom = useTransform(zoomLinear, smootherstep);
  const deviceScale = useTransform(
    zoom,
    (value) => 1 + (finalScale - 1) * value,
  );
  const deviceX = useTransform(
    zoom,
    (value) => (viewport.width / 2 - screenCenterX) * value,
  );
  const deviceY = useTransform(
    zoom,
    (value) => (viewport.height / 2 - screenCenterY) * value,
  );

  // The content follows the very same zoomed screen rectangle as the frame.
  // Clamp only at the viewport edges, so it fills the aperture throughout and
  // settles at exactly the user's display size without an independent zoom.
  const screenBounds = useTransform(zoom, (value) => {
    const scale = 1 + (finalScale - 1) * value;
    const centerX =
      screenCenterX + (viewport.width / 2 - screenCenterX) * value;
    const centerY =
      screenCenterY + (viewport.height / 2 - screenCenterY) * value;
    return {
      left: Math.max(0, centerX - (screenWidth * scale) / 2),
      right: Math.min(viewport.width, centerX + (screenWidth * scale) / 2),
      top: Math.max(0, centerY - (screenHeight * scale) / 2),
      bottom: Math.min(viewport.height, centerY + (screenHeight * scale) / 2),
    };
  });
  const introLeft = useTransform(screenBounds, (bounds) => bounds.left);
  const introTop = useTransform(screenBounds, (bounds) => bounds.top);
  const introWidth = useTransform(
    screenBounds,
    (bounds) => bounds.right - bounds.left,
  );
  const introHeight = useTransform(
    screenBounds,
    (bounds) => bounds.bottom - bounds.top,
  );
  const projectScaleX = useTransform(screenBounds, (bounds) =>
    viewport.width ? (bounds.right - bounds.left) / viewport.width : 1,
  );
  const projectScaleY = useTransform(screenBounds, (bounds) =>
    viewport.height ? (bounds.bottom - bounds.top) / viewport.height : 1,
  );
  const projectX = useTransform(
    screenBounds,
    (bounds) => (bounds.left + bounds.right - viewport.width) / 2,
  );
  const projectY = useTransform(
    screenBounds,
    (bounds) => (bounds.top + bounds.bottom - viewport.height) / 2,
  );
  // Prepare the content only once the device and closed shutters are opaque.
  // Otherwise the mosaic shows through while the whole device is crossfading.
  const projectOpacity = useTransform(
    scrollYProgress,
    [CROSSFADE_END, SHUTTER_START],
    [0, 1],
  );
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setMosaicActive(
      value >= CROSSFADE_END && value < PROJECT_SLIDES_START + 0.05,
    );
  });
  const topShutterY = useTransform(
    scrollYProgress,
    [SHUTTER_START, SHUTTER_END],
    ["0%", "-101%"],
  );
  const bottomShutterY = useTransform(
    scrollYProgress,
    [SHUTTER_START, SHUTTER_END],
    ["0%", "101%"],
  );

  // Preserve readable gallery pacing despite reserving more time for the intro.
  const galleryDistance =
    Math.max(viewport.width * 0.52, viewport.height * 0.65) * PROJECTS.length;
  const dynamicSectionHeight = viewport.height
    ? viewport.height +
      galleryDistance / (PROJECT_SLIDES_END - PROJECT_SLIDES_START)
    : "1600svh";
  const slideProgress = useTransform(
    scrollYProgress,
    [PROJECT_SLIDES_START, PROJECT_SLIDES_END],
    [0, PROJECTS.length],
  );
  const targetTrackX = useTransform(slideProgress, (value) => {
    const step = Math.min(Math.floor(value), PROJECTS.length - 1);
    const fraction = Math.min((value - step) / SLIDE_TRAVEL_FRACTION, 1);
    return viewport.width * (1 - step - smootherstep(fraction));
  });
  // Smooth the resulting pixel position as well as scroll input. This avoids
  // sudden starts/stops when wheel events skip over a reading hold.
  const projectTrackX = useSpring(targetTrackX, {
    stiffness: 170,
    damping: 30,
    mass: 0.5,
  });
  useMotionValueEvent(projectTrackX, "change", (value) => {
    if (!viewport.width) return;
    const index = Math.round(-value / viewport.width);
    setActiveProject(Math.max(-1, Math.min(index, PROJECTS.length - 1)));
  });
  const galleryProgress = useTransform(projectTrackX, (value) =>
    viewport.width
      ? Math.max(0, Math.min(1, (1 - value / viewport.width) / PROJECTS.length))
      : 0,
  );
  const projectSliderOpacity = useTransform(
    scrollYProgress,
    [GALLERY_REVEAL_START, PROJECT_SLIDES_START],
    [0, 1],
  );
  // Introduce gallery labels only when the first panel has covered the mosaic.
  const galleryChromeOpacity = useTransform(projectTrackX, (value) =>
    viewport.width
      ? Math.max(0, Math.min(1, 1 - value / (viewport.width * 0.08)))
      : 0,
  );

  return (
    <section
      id="selected-works"
      ref={sectionRef}
      style={{ height: dynamicSectionHeight }}
      className="relative -mt-px w-full bg-foreground text-background"
    >
      <Div
        ref={viewportRef}
        className="sticky top-0 h-svh w-full overflow-hidden"
      >
        {/* CONTENT: fitted to the MacBook aperture, then the full viewport. */}
        <Div
          style={{
            opacity: projectOpacity,
            x: projectX,
            y: projectY,
            scaleX: projectScaleX,
            scaleY: projectScaleY,
            transformOrigin: "50% 50%",
          }}
          className="absolute inset-0 z-10 overflow-hidden will-change-transform"
        >
          <Div
            style={{ opacity: projectSliderOpacity, x: projectTrackX }}
            className="absolute inset-0 z-10 flex h-full w-max will-change-transform"
          >
            {PROJECTS.map((project, index) => (
              <SelectedWorkPanel
                key={project.id}
                project={project}
                index={index}
                active={activeProject === index}
                preload={Math.abs(index - Math.max(0, activeProject)) <= 2}
              />
            ))}
          </Div>
          <Div
            style={{ opacity: galleryChromeOpacity }}
            className="pointer-events-none absolute inset-0 z-[15] px-[4vw] font-mono text-[10px] tracking-[0.12em] uppercase max-[760px]:text-[8px]"
          >
            <div className="absolute inset-x-[4vw] top-7 flex justify-between border-b border-background/20 pb-4 max-[760px]:top-[23px]">
              <span>Selected Works</span>
              <span>Design & engineering</span>
            </div>
            <div className="absolute inset-x-[4vw] bottom-[26px] flex items-center gap-6 max-[760px]:bottom-6 max-[760px]:gap-3">
              <span>
                {String(Math.max(0, activeProject) + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 overflow-hidden bg-background/20">
                <Div
                  className="h-full origin-left bg-background"
                  style={{ scaleX: galleryProgress }}
                />
              </div>
              <span>Scroll to explore →</span>
            </div>
          </Div>
        </Div>

        {/* The gallery covers the mosaic without a scroll-driven exit animation. */}
        <Div
          style={{
            opacity: projectOpacity,
            x: introLeft,
            y: introTop,
            width: introWidth,
            height: introHeight,
          }}
          inert={!mosaicActive}
          className="pointer-events-none absolute top-0 left-0 z-[9] overflow-hidden [container-type:size]"
        >
          <ProjectMosaic active={mosaicActive} />
        </Div>

        {/* DEVICE: solid before the shutters open; zooms about its screen center. */}
        <Div className="pointer-events-none absolute inset-0 z-20">
          <Div
            style={{
              opacity: outlineOpacity,
              scale: outlineScale,
              y: outlineY,
              width: deviceWidth,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/macbook-pro-outline.svg"
              alt=""
              width={DEVICE_WIDTH}
              height={DEVICE_HEIGHT}
              priority
              draggable={false}
              className="block h-auto w-full select-none"
            />
          </Div>
          <Div
            style={{
              opacity: deviceOpacity,
              scale: deviceScale,
              x: deviceX,
              y: deviceY,
              width: deviceWidth,
              transformOrigin: `${(SCREEN_LEFT + SCREEN_WIDTH / 2) * 100}% ${(SCREEN_TOP + SCREEN_HEIGHT / 2) * 100}%`,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          >
            <div
              className="absolute overflow-hidden"
              style={{
                left: `${SCREEN_LEFT * 100}%`,
                top: `${SCREEN_TOP * 100}%`,
                width: `${SCREEN_WIDTH * 100}%`,
                height: `${SCREEN_HEIGHT * 100}%`,
              }}
            >
              <Div
                style={{ y: topShutterY }}
                className="absolute inset-x-0 top-0 h-[50.2%] bg-white"
              />
              <Div
                style={{ y: bottomShutterY }}
                className="absolute inset-x-0 bottom-0 h-[50.2%] bg-white"
              />
            </div>
            <Image
              src="/macbook-pro.svg"
              alt=""
              width={DEVICE_WIDTH}
              height={DEVICE_HEIGHT}
              priority
              draggable={false}
              className="relative z-10 block h-auto w-full select-none"
            />
          </Div>
        </Div>

        {/* INTRO TEXT */}
        <Div
          style={{ opacity: headingOpacity }}
          className="theme-container pointer-events-none absolute inset-0 py-12"
        >
          <Div style={{ y: headingY }} className="flex justify-between">
            <H2 className="text-4xl leading-none font-bold tracking-tight uppercase sm:text-6xl">
              Selected <br /> Works
            </H2>
            <div className="hidden max-w-60 md:block">
              <span className="text-xs tracking-[0.25em] text-background/40 uppercase">
                A curated collection of products, interfaces, and digital
                experiences I&apos;ve helped bring to life.
              </span>
            </div>
          </Div>
          <div className="absolute bottom-8 left-0 flex items-center gap-3">
            <div className="h-px w-8 bg-background/30" />
            <span className="text-[10px] tracking-[0.25em] text-background/30 uppercase">
              Scroll to explore
            </span>
          </div>
          <div className="absolute right-0 bottom-8 font-mono text-[10px] text-background/30">
            01
          </div>
        </Div>
      </Div>
    </section>
  );
}
