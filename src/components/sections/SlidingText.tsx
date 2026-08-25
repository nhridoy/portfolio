"use client";

import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import { useLayoutEffect, useRef, useState } from "react";

interface SlidingTextProps {
  text: string;
}

const SlidingText = ({ text }: SlidingTextProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [fullScreenScale, setFullScreenScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !textRef.current) return;

      const container = containerRef.current;
      const text = textRef.current;

      const containerWidth = container.getBoundingClientRect().width;
      const vWidth = window.innerWidth;
      const tWidth = text.scrollWidth;

      setViewportWidth(vWidth);
      setTextWidth(tWidth);

      if (containerWidth > 0) {
        setFullScreenScale(vWidth / containerWidth);
      }

      const totalTextTravel = vWidth + tWidth;
      setScrollHeight(totalTextTravel * 1.2 + window.innerHeight);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);

    return () => ro.disconnect();
  }, []);

  // 1. SCALE SCROLL TRACK (plain, untouched)
  const { scrollYProgress: scaleProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 5%"],
  });

  const scaleX = useTransform(scaleProgress, [0, 1], [1, fullScreenScale]);
  const borderRadius = useTransform(scaleProgress, [0, 1], [32, 0]);

  // 2. TEXT SLIDE & SLIDE UP TRACK
  const { scrollYProgress: mainProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Lock the slide progress at 0 until the container has fully scaled to fullscreen.
  // This guarantees the text can't start sliding/appearing mid-scale.
  const revealProgress = useTransform(
    [scaleProgress, mainProgress],
    ([s, m]: number[]) => (s < 0.999 ? 0 : m),
  );

  const smoothProgress = useSpring(revealProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
  });

  // Base position is now `left-full` (already outside the container's right edge),
  // so travel is just 0 -> -(full sweep distance), no center-based math needed.
  const travelDistance = viewportWidth + textWidth;

  const textX = useTransform(
    smoothProgress,
    [0, 0.95],
    shouldReduceMotion ? [0, 0] : [0, -travelDistance],
  );

  const containerY = useTransform(mainProgress, [0.95, 1], ["0%", "-100%"]);

  const velocity = useVelocity(smoothProgress);
  const skewX = useTransform(
    velocity,
    [-2, 2],
    shouldReduceMotion ? [0, 0] : [8, -8],
    { clamp: true },
  );
  const skewXSpring = useSpring(skewX, { stiffness: 400, damping: 30 });

  return (
    <section
      id="short-info"
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: scrollHeight || "250vh",
      }}
    >
      <Div className="sticky top-0 h-dvh w-full overflow-hidden bg-transparent">
        <Div
          ref={containerRef}
          className="theme-container flex min-h-dvh items-center justify-center overflow-hidden bg-foreground text-background"
          style={{
            scaleX,
            borderRadius,
            y: containerY,
          }}
        >
          <Span
            ref={textRef}
            className="absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap text-10xl font-extrabold uppercase leading-none text-current select-none will-change-transform"
            style={{
              x: textX,
              skewX: skewXSpring,
            }}
          >
            {text}
          </Span>
        </Div>
      </Div>
    </section>
  );
};

export default SlidingText;
