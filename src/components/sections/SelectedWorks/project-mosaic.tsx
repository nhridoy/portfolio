"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { div as Div } from "framer-motion/m";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants";

// Six tiles make an asymmetric block: a feature, two landscapes, three portraits.
const layouts = [
  "col-span-3 row-span-2 max-[760px]:col-span-2",
  "col-span-3 max-[760px]:col-span-2",
  "col-span-3 max-[760px]:col-span-2",
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
];

export function ProjectMosaic({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const drift = useMotionValue(0);
  const y = useTransform(drift, (value) => `${-value}%`);

  // Time-driven drift, independent of scroll. Identical halves loop seamlessly.
  // Pause when covered and honor reduced motion without resetting the position.
  useAnimationFrame((_, delta) => {
    if (!active || reduceMotion) return;
    drift.set((drift.get() + (Math.min(delta, 64) / 90000) * 50) % 50);
  });

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-foreground">
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        aria-hidden="true"
      >
        <Div style={{ y }} className="w-full will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="grid grid-flow-dense auto-rows-[14cqw] grid-cols-6 gap-[2px] pb-[2px] max-[760px]:auto-rows-[25cqw] max-[760px]:grid-cols-4"
            >
              {PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className={`relative min-h-0 min-w-0 overflow-hidden ${layouts[index % layouts.length]}`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="50vw"
                    loading={index < 6 ? "eager" : "lazy"}
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          ))}
        </Div>
      </div>
    </div>
  );
}
