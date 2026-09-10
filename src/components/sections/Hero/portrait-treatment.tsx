"use client";

import { type MotionValue, useInView } from "framer-motion";
import { div as Div } from "framer-motion/m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const portraitClass =
  "origin-[50%_35%] scale-100 object-cover object-[50%_25%] md:object-[50%_35%] grayscale contrast-[1.08] md:scale-[1.4]";
const grain = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/></filter><path fill="#888" filter="url(#n)" d="M0 0h160v160H0z"/></svg>')}")`;

export function PortraitTreatment({
  x,
  y,
  reducedMotion,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const running = visible && !reducedMotion;
  const [glitch, setGlitch] = useState({
    id: 0,
    top: 38,
    height: 2,
    offset: 5,
    duration: 0.22,
    strength: 0.75,
    double: false,
  });

  useEffect(() => {
    if (!running) return;
    let timer: ReturnType<typeof setTimeout>;
    let burstRemaining = 0;
    function schedule() {
      // Short clusters alternate with irregular breathing room.
      const inBurst = burstRemaining > 0;
      if (inBurst) burstRemaining -= 1;
      else if (Math.random() < 0.55)
        burstRemaining = 1 + Math.floor(Math.random() * 3);
      const delay = inBurst
        ? 180 + Math.random() * 240
        : Math.random() < 0.15
          ? 1200 + Math.random() * 800
          : 400 + Math.random() * 600;
      timer = setTimeout(() => {
        if (!document.hidden) {
          setGlitch((previous) => ({
            id: previous.id + 1,
            top: 3 + Math.random() * 90,
            height: 0.4 + Math.random() ** 1.5 * 4.6,
            offset: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 7),
            duration: 0.08 + Math.random() * 0.09,
            strength: 0.5 + Math.random() * 0.35,
            double: Math.random() < 0.4,
          }));
        }
        schedule();
      }, delay);
    }
    schedule();
    return () => clearTimeout(timer);
  }, [running]);

  const copy = (offset: number) => (
    <Div style={{ x, y }} className="absolute -inset-5">
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <Image
          src="/images/hero-portrait.png"
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={portraitClass}
        />
      </div>
    </Div>
  );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <Div style={{ x, y }} className="absolute -inset-5">
        <Image
          src="/images/hero-portrait.png"
          alt="Close-up black-and-white portrait of Nahidujjaman Hridoy"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className={portraitClass}
        />
      </Div>
      <Div
        key={glitch.id}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          clipPath: `inset(${glitch.top}% 0 ${100 - glitch.top - glitch.height}% 0)`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            running && glitch.id > 0
              ? [
                  0,
                  glitch.strength,
                  0,
                  glitch.double ? glitch.strength * 0.6 : 0,
                  0,
                ]
              : 0,
        }}
        transition={{
          duration: glitch.duration,
          times: [0, 0.12, 0.42, 0.65, 1],
          ease: "linear",
        }}
      >
        {copy(glitch.offset)}
      </Div>
      <Div
        aria-hidden="true"
        animate={{
          transform: running
            ? ["translate3d(0,0,0)", "translate3d(0,4px,0)"]
            : "translate3d(0,0,0)",
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-y-1 inset-x-0 opacity-[0.16] will-change-transform bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_1px,rgba(17,17,17,0.65)_2px,transparent_4px)]"
      />
      <Div
        aria-hidden="true"
        animate={{
          x: running ? [0, -3, 2, -1, 0] : 0,
          y: running ? [0, 2, -3, 1, 0] : 0,
        }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1 opacity-[0.18] mix-blend-soft-light"
        style={{ backgroundImage: grain }}
      />
    </div>
  );
}
