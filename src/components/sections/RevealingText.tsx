"use client";

import {
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import { Fragment, useLayoutEffect, useMemo, useRef, useState } from "react";
import { buildTextChars } from "@/lib/utils";
import { Button } from "../ui/button";

// ---------------------------------------------------------------------------
// BREATHING & ANIMATION CONFIG (PERCENTAGE-BASED)
// ---------------------------------------------------------------------------
// Percentage of scroll distance to pause at the beginning (0.20 = 20%)
const START_BREATHING_PERCENT = 0.1;

// Percentage of scroll distance where the reveal completes (0.80 = 80%)
// Remaining 20% (from 80% to 100%) acts as the ending pause buffer.
const END_BREATHING_PERCENT = 0.9;

// Extra scroll track length as a percentage of viewport height (1.0 = 100vh)
const EXTRA_BREATHING_HEIGHT_PERCENT = 1.0;
// ---------------------------------------------------------------------------

interface RevealingTextProps {
  text: string;
}

interface CharacterProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

// Individual Character component handles its own opacity mapping
const Character = ({ char, index, totalChars, progress }: CharacterProps) => {
  const step = 1 / totalChars;
  const start = index * step;
  const end = start + step;

  // Map progress range to opacity range (dim to full bright)
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <Span style={{ opacity }} className="[font-size:inherit] inline-block">
      {char}
    </Span>
  );
};

const RevealingText = ({ text }: RevealingTextProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [scrollHeight, setScrollHeight] = useState(0);

  // Structure text structure and count total characters
  const wordsData = useMemo(() => buildTextChars(text), [text]);
  const totalChars = useMemo(() => {
    return wordsData.reduce((acc, word) => acc + word.chars.length, 0);
  }, [wordsData]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!textRef.current) return;

      const vWidth = window.innerWidth;
      const vHeight = window.innerHeight;
      const tWidth = textRef.current.scrollWidth;

      const totalTextTravel = vWidth + tWidth;

      // Calculate breathing padding strictly using percentages of viewport height
      const startBreathingPadding = vHeight * EXTRA_BREATHING_HEIGHT_PERCENT;
      const endBreathingPadding = vHeight * EXTRA_BREATHING_HEIGHT_PERCENT;

      setScrollHeight(
        totalTextTravel * 1.2 +
          vHeight +
          startBreathingPadding +
          endBreathingPadding,
      );
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (textRef.current) ro.observe(textRef.current);

    return () => ro.disconnect();
  }, []);

  // 1. SCALE SCROLL TRACK
  const { scrollYProgress: scaleProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 5%"],
  });

  // 2. TEXT SLIDE & REVEAL TRACK
  const { scrollYProgress: mainProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate reveal progress based strictly on configured percentage bounds
  const revealProgress = useTransform(
    [scaleProgress, mainProgress],
    ([s, m]: number[]) => {
      if (s < 0.999) return 0;

      // 1. Initial breathing zone (locked at dim opacity)
      if (m <= START_BREATHING_PERCENT) return 0;

      // 2. Ending breathing zone (locked at full brightness)
      if (m >= END_BREATHING_PERCENT) return 1;

      // 3. Active character reveal zone
      return (
        (m - START_BREATHING_PERCENT) /
        (END_BREATHING_PERCENT - START_BREATHING_PERCENT)
      );
    },
  );

  const smoothProgress = useSpring(revealProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
  });

  const progressWidth = useTransform(smoothProgress, (p) => `${p * 100}%`);

  // Helper index tracker across nested mapping loops
  let charCounter = 0;

  return (
    <section
      id="short-info"
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: scrollHeight || "250vh",
      }}
    >
      <Div
        ref={containerRef}
        className="sticky top-0 h-dvh theme-container flex flex-col items-center justify-center"
      >
        <Span
          className="h-theme-px bg-foreground/30"
          style={{
            width: progressWidth,
          }}
        />
        <p className="font-cormorant text-5xl py-12" ref={textRef}>
          {wordsData.map(({ word, chars }, wordIndex, words) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Not a bug>
            <Fragment key={`${word}-${wordIndex}`}>
              <span className="inline-flex [font-size:inherit]">
                {chars.map(({ char, id }) => {
                  const currentIndex = charCounter++;
                  return (
                    <Character
                      key={id}
                      char={char}
                      index={currentIndex}
                      totalChars={totalChars}
                      progress={smoothProgress}
                    />
                  );
                })}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
        <Span
          className="h-theme-px bg-foreground/30"
          style={{
            width: progressWidth,
          }}
        />
        <Button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          variant="interactive"
          className="uppercase font-bold absolute bottom-5 right-0"
        >
          Discuss Your Project
        </Button>
      </Div>
    </section>
  );
};

export default RevealingText;
