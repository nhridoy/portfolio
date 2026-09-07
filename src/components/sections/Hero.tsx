"use client";

import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { div as Div } from "framer-motion/m";
import { Plus } from "lucide-react";
import Image from "next/image";
import { type PointerEvent, useState } from "react";
import { AnimatedLink } from "../ui/animated-link";
import { Button } from "../ui/button";
import Header from "../ui/header";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 80, damping: 25 });
  const y = useSpring(pointerY, { stiffness: 80, damping: 25 });
  const cursorX = useSpring(lensX, { stiffness: 280, damping: 30 });
  const cursorY = useSpring(lensY, { stiffness: 280, damping: 30 });

  function movePortrait(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    lensX.set(localX - 70);
    lensY.set(localY - 70);
    pointerX.set((localX / bounds.width - 0.5) * -30);
    pointerY.set((localY / bounds.height - 0.5) * -24);
    setHovered(true);
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate h-svh overflow-hidden bg-background text-background md:text-foreground"
    >
      {/* Navbar */}
      <div className="theme-container absolute inset-x-0 top-0 z-30 max-md:[&_a]:text-background max-md:[&_span]:text-background max-md:[&_button]:text-background">
        <Header />
      </div>

      {/* Text */}
      <div className="theme-container pointer-events-none relative z-20 flex h-full items-end pb-24 pt-24 md:items-center md:py-0">
        <div className="pointer-events-auto w-full md:w-[52%] flex flex-col gap-4">
          <p className="text-xs font-medium">
            NAHIDUJJAMAN HRIDOY / SOFTWARE ENGINEER
          </p>
          <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl font-medium leading-none">
            Thoughtfully
            <br />
            designed.
            <br />
            <span className="text-white/70 md:text-current/45 text-[1em]">
              Precisely built.
            </span>
          </h1>
          <p className="max-w-84 text-sm leading-relaxed text-current/65 lg:text-base">
            Expressive interfaces. Dependable systems.
            <br />I build the connection between them.
          </p>
          <div className="flex items-center gap-6">
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="default"
              className="uppercase font-bold flex-1 max-md:bg-white max-md:text-black"
            >
              Explore work
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="outline"
              className="uppercase font-bold flex-1 max-md:bg-white max-md:text-black"
            >
              Let's talk
            </Button>
          </div>
        </div>
      </div>

      {/* Avaialble for hire and cv */}
      <div className="theme-container pointer-events-none absolute inset-x-0 bottom-5 z-20 flex items-center justify-between gap-3">
        <div className="pointer-events-auto flex gap-2 items-center">
          <Div
            className="bg-green-600 rounded-full size-2"
            animate={{
              scale: [1, 1.5, 1],
              filter: [
                "hue-rotate(0deg)",
                "hue-rotate(360deg)",
                "blur(1px)",
                "blur(0px)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-xs md:text-base">Available for hire</span>
        </div>
        <Button
          nativeButton={false}
          variant="interactive"
          className="pointer-events-auto uppercase font-bold text-background max-md:w-32 max-md:text-xs max-md:[&_span]:text-xs"
          render={
            <AnimatedLink
              href="https://drive.google.com/file/d/1u9o56taT9Q2C36u9kl1Lx950gYRVWN3V/view?usp=sharing"
              external
              className="hover:no-underline"
            />
          }
        >
          Download CV
        </Button>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/35 to-black/20 md:hidden"
      />

      {/* Image */}
      <div
        onPointerMove={movePortrait}
        onPointerLeave={() => {
          setHovered(false);
          pointerX.set(0);
          pointerY.set(0);
        }}
        className="absolute inset-0 h-full overflow-hidden md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:w-[46%]"
        style={{ cursor: hovered ? "none" : "auto" }}
      >
        <Div style={{ x, y }} className="absolute -inset-5">
          <Image
            src="/images/hero-portrait.png"
            alt="Close-up black-and-white portrait of Nahidujjaman Hridoy"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="origin-[50%_35%] scale-100 object-cover object-[50%_25%] md:object-[50%_35%] grayscale contrast-[1.08] md:scale-[1.4]"
          />
        </Div>
        <Div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-0 top-0 flex size-35 items-center justify-center rounded-full border border-white/80 text-white backdrop-invert shadow-[0_0_0_8px_rgba(255,255,255,0.08)]"
        >
          <Plus className="size-5" strokeWidth={1} />
        </Div>
      </div>
    </section>
  );
}
