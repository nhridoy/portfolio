"use client";

import Image from "next/image";
import { memo } from "react";
import type { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tones = [
  "bg-[#dbe5cf]",
  "bg-[#ead5ca]",
  "bg-[#d2dce7]",
  "bg-[#e6d8eb]",
  "bg-[#e9dfc4]",
];

export const SelectedWorkPanel = memo(function SelectedWorkPanel({
  project,
  index,
  active,
  preload,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  active: boolean;
  preload: boolean;
}) {
  const title =
    project.id === 3
      ? "OSSC"
      : project.id === 8
        ? "Online Streaming"
        : project.title;
  const isApp = project.category.includes("App");

  // Nextra has unlayered article display/padding rules. Keep these layout
  // utilities important so the gallery retains its original grid and spacing.
  return (
    <article
      className="grid! h-full w-screen shrink-0 grid-cols-[38%_62%] gap-0 bg-foreground px-[4vw] pt-[clamp(72px,12svh,120px)]! pb-[clamp(64px,10svh,96px)]! text-background max-[760px]:grid-cols-1 max-[760px]:grid-rows-[auto_minmax(0,1fr)] max-[760px]:gap-[22px] max-[760px]:px-[5vw] max-[760px]:pt-[74px]! max-[760px]:pb-16! min-[761px]:[@media(max-height:600px)]:pt-[70px]! min-[761px]:[@media(max-height:600px)]:pb-[60px]!"
      aria-label={project.title}
      inert={!active}
    >
      <div className="flex min-w-0 flex-col items-start pt-[3svh] pr-[3vw] max-[760px]:p-0">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-60">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </span>
        <h3 className="relative z-[2] mt-[4svh] mb-[3svh] text-[clamp(44px,5.7vw,108px)] leading-[0.98] font-medium tracking-[-0.065em] [overflow-wrap:anywhere] max-[760px]:my-3.5 max-[760px]:text-[clamp(34px,9vw,60px)] min-[761px]:[@media(max-height:600px)]:my-4 min-[761px]:[@media(max-height:600px)]:text-[44px]">
          {title}
          <span className="text-[#9ba883]">.</span>
        </h3>
        <div className="mt-auto max-w-[340px] max-[760px]:w-full max-[760px]:max-w-none">
          <p className="mt-0 mb-[22px] text-[clamp(12px,1vw,16px)] leading-[1.65] opacity-65 max-[760px]:mb-2.5 max-[760px]:text-xs max-[760px]:leading-normal min-[761px]:[@media(max-height:600px)]:mb-2 min-[761px]:[@media(max-height:600px)]:text-[11px]">
            {project.description}
          </p>
          <ul
            className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 font-mono text-[9px] tracking-[0.04em] uppercase opacity-50 max-[760px]:hidden min-[761px]:[@media(max-height:600px)]:hidden"
            aria-label="Technologies"
          >
            {project.techStack.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <a
            className="group/link inline-flex items-center gap-7 border-b border-current pt-5 pb-[7px] text-[13px] no-underline focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-current max-[760px]:gap-5 max-[760px]:pt-0 max-[760px]:pb-1 max-[760px]:text-[11px] min-[761px]:[@media(max-height:600px)]:pt-2"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore project{" "}
            <span
              className="text-2xl transition-transform duration-250 group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px] motion-reduce:transform-none motion-reduce:transition-none max-[760px]:text-lg"
              aria-hidden="true"
            >
              ↗
            </span>
            <span className="sr-only">
              {" "}
              — {project.title} (opens in a new tab)
            </span>
          </a>
        </div>
      </div>
      <div
        className={cn(
          "group/stage relative flex min-h-0 min-w-0 items-center justify-center overflow-hidden px-[6%] pt-16 pb-[62px] text-[#30362d] max-[760px]:pt-9 max-[760px]:pb-8 min-[761px]:[@media(max-height:600px)]:pt-11 min-[761px]:[@media(max-height:600px)]:pb-[42px]",
          tones[index % tones.length],
        )}
      >
        <span className="absolute top-6 left-7 font-mono text-[9px] tracking-[0.12em] uppercase opacity-65 max-[760px]:top-[13px] max-[760px]:left-4 max-[760px]:text-[8px]">
          {isApp ? "Application / Preview" : "Digital experience / Preview"}
        </span>
        <div
          className={cn(
            "relative z-[1] h-full max-h-[490px] -rotate-2 overflow-hidden rounded-[6px] bg-white shadow-[0_24px_50px_-18px_#18261755,0_2px_5px_#18261712] transition-transform duration-600 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/stage:rotate-0 motion-reduce:transform-none motion-reduce:transition-none",
            isApp ? "w-[72%]" : "w-full",
          )}
        >
          <div
            className="flex h-7 items-center justify-between border-b border-[#ddd] bg-[#f6f6f3] px-3 font-mono text-[8px] tracking-[0.02em] text-[#777]"
            aria-hidden="true"
          >
            <span className="text-[6px] tracking-[2px] text-[#b2b4ad]">
              ● ● ●
            </span>
            <span>{new URL(project.link).hostname.replace(/^www\./, "")}</span>
            <span>↗</span>
          </div>
          <div className="relative h-[calc(100%-28px)]">
            <Image
              src={project.image}
              alt={`${project.title} interface preview`}
              fill
              sizes="(max-width: 760px) 90vw, 58vw"
              priority={index === 0}
              loading={index === 0 || preload ? "eager" : "lazy"}
              className={cn(
                "object-top",
                isApp ? "object-contain" : "object-cover",
              )}
            />
          </div>
        </div>
        <span
          className="absolute right-3 -bottom-7 text-[clamp(100px,14vw,230px)] leading-none tracking-[-0.09em] opacity-[0.08]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-6 left-7 font-mono text-[8px] tracking-[0.07em] uppercase opacity-60 max-[760px]:bottom-[11px] max-[760px]:left-4 max-[760px]:text-[7px]">
          Designed for people. Built for real life.
        </span>
      </div>
    </article>
  );
});
