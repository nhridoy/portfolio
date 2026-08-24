"use client";

import { animate, type Easing, useReducedMotion } from "framer-motion";
import { div as Div, span as Span } from "framer-motion/m";
import { Fragment, useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants";

const COUNTER_DURATION = 2;
const HOLD_AT_100 = 0.35;
const CURVE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const CURTAIN_DURATION = 3.0;
const CURTAIN_EASE: Easing[] = ["easeIn", "linear", "easeOut"];

const CURTAINS = [
  { color: "bg-black", z: 10, times: [0, 0.2, 0.666, 0.933] },
  { color: "bg-white", z: 20, times: [0.066, 0.266, 0.566, 0.833] },
  { color: "bg-black", z: 30, times: [0.133, 0.333, 0.466, 0.733] },
];

function buildNameChars(name: string) {
  let id = 0;
  return name.split(" ").map((word) => ({
    word,
    chars: [...word].map((char) => ({ char, id: id++ })),
  }));
}

export default function Intro() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const hasFinished = useRef(false);

  // Bulletproof Scroll Lock
  useEffect(() => {
    if (!show) return;

    const html = document.documentElement;
    const body = document.body;

    // 1. Hide overflow on both html and body
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // 2. Aggressively intercept and cancel scroll events at Window and Document levels
    const preventScroll = (e: Event) => {
      // Allow keyboard events that aren't scroll-related to pass through
      if (e instanceof KeyboardEvent) {
        // Modern equivalent of keyCode using e.key
        const scrollKeys = [
          " ",
          "PageUp",
          "PageDown",
          "End",
          "Home",
          "ArrowLeft",
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
        ];
        if (!scrollKeys.includes(e.key)) return;
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // { passive: false } is REQUIRED to allow e.preventDefault() to work
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScroll, { passive: false });

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", preventScroll, { passive: false });

    // 3. Failsafe: If any scroll slips through, instantly snap back to top
    const lockScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", lockScroll, { passive: true });

    return () => {
      // Restore everything when intro unmounts
      html.style.overflow = "";
      body.style.overflow = "";

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScroll);

      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventScroll);

      window.removeEventListener("scroll", lockScroll);
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const markLoaded = () => setPageLoaded(true);
    if (document.readyState === "complete") markLoaded();
    else window.addEventListener("load", markLoaded);
    return () => window.removeEventListener("load", markLoaded);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const controls = animate(0, 100, {
      duration: reduceMotion ? 0 : COUNTER_DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [show, reduceMotion]);

  useEffect(() => {
    if (count < 100 || !pageLoaded || exiting) return;
    const timeout = setTimeout(
      () => setExiting(true),
      reduceMotion ? 0 : HOLD_AT_100 * 1000,
    );
    return () => clearTimeout(timeout);
  }, [count, pageLoaded, exiting, reduceMotion]);

  const finishExit = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden touch-none overscroll-none">
      <Div
        className="absolute inset-0 bg-background"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeIn", delay: 0.6 }}
        style={{ zIndex: 0 }}
      />

      <div
        className="theme-container relative flex h-full flex-col justify-between py-6 md:py-8"
        style={{ zIndex: 1 }}
      >
        <Div
          className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-foreground/60"
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn", delay: 0.6 }}
        >
          <Span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Portfolio ©{new Date().getFullYear()}
          </Span>
          <Span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            aria-live="polite"
          >
            {count < 100 ? "Loading experience" : "Ready"}
          </Span>
        </Div>

        <Div
          className="absolute top-1/2 -translate-y-1/2"
          animate={exiting ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeIn", delay: 0.6 }}
        >
          <h1 className="text-10xl uppercase -ml-2.5 text-black font-extrabold block">
            {buildNameChars(PERSONAL_INFO.name).map(
              ({ word, chars }, wordIndex, words) => (
                <Fragment key={word}>
                  <span className="inline-flex overflow-hidden [font-size:inherit]">
                    {chars.map(({ char, id }) => (
                      <Span
                        key={id}
                        className="[font-size:inherit]"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.7,
                          ease: CURVE,
                          delay: 0.1 + id * 0.035,
                        }}
                      >
                        {char}
                      </Span>
                    ))}
                  </span>
                  {wordIndex < words.length - 1 ? " " : null}
                </Fragment>
              ),
            )}
          </h1>
        </Div>

        <Div
          className="flex items-end justify-between"
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn", delay: 0.6 }}
        >
          <Span className="mb-3 max-w-40 text-xs font-semibold uppercase tracking-widest text-foreground/60 md:max-w-none">
            {PERSONAL_INFO.tagline}
          </Span>
          <Span className="leading-none font-extrabold tabular-nums text-foreground text-[clamp(4rem,14vw,12rem)]">
            {count}
            <Span className="text-[0.35em] align-top">%</Span>
          </Span>
        </Div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.75 w-full bg-foreground/10"
        style={{ zIndex: 1 }}
      >
        <div
          className="h-full bg-foreground transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>

      {CURTAINS.map((curtain, i) => {
        return (
          <Div
            // biome-ignore lint/suspicious/noArrayIndexKey: <Not a bug>
            key={`curtain-${i}`} //NOSONAR
            className={`absolute inset-0 ${curtain.color}`}
            style={{ zIndex: curtain.z, willChange: "transform" }}
            initial={{ y: "100%" }}
            animate={{ y: exiting ? ["100%", "0%", "0%", "-100%"] : "100%" }}
            transition={{
              duration: reduceMotion ? 0 : CURTAIN_DURATION,
              times: curtain.times,
              ease: CURTAIN_EASE,
            }}
            onAnimationComplete={() => {
              if (i === 0 && exiting) finishExit();
            }}
          />
        );
      })}
    </div>
  );
}
