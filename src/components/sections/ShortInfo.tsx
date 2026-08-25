"use client";

import { useScroll, useTransform } from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import { useLayoutEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants";

const ShortInfo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [fullScreenScale, setFullScreenScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

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

      // Replaced your scale formula to ensure scaleX triggers properly
      if (containerWidth > 0) {
        setFullScreenScale(vWidth / containerWidth);
      }

      // Calculate vertical height based on text distance
      const totalTextTravel = vWidth + tWidth;
      setScrollHeight(totalTextTravel * 1.2 + window.innerHeight);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);

    return () => ro.disconnect();
  }, []);

  // 1. SCALE SCROLL TRACK (Your original working setup)
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

  const startX = viewportWidth / 2 + textWidth / 2;
  const endX = -(viewportWidth / 2 + textWidth / 2);

  // 1. TEXT: Slides from startX (off-screen right) to endX (off-screen left) immediately from 0% scroll progress
  const textX = useTransform(mainProgress, [0, 0.95], [startX, endX]);

  // 2. CONTAINER EXIT: Stays pinned until 95%, then slides up vertically
  const containerY = useTransform(mainProgress, [0.95, 1], ["0%", "-100%"]);

  return (
    <section
      id="short-info"
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: scrollHeight || "250vh",
      }}
    >
      <Div className="sticky top-0 h-svh w-full overflow-hidden bg-transparent">
        <Div
          ref={containerRef}
          className="theme-container flex min-h-svh items-center justify-center overflow-hidden bg-foreground text-background"
          style={{
            scaleX,
            borderRadius,
            y: containerY,
          }}
        >
          <Span
            ref={textRef}
            className="absolute whitespace-nowrap text-10xl font-extrabold uppercase leading-none text-current select-none -ml-2.5 will-change-transform"
            style={{
              x: textX,
            }}
          >
            {PERSONAL_INFO.shortInfo}
          </Span>
        </Div>
      </Div>
    </section>
  );
};

export default ShortInfo;
