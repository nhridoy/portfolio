"use client";

import dynamic from "next/dynamic";

const ReactLenis = dynamic(() => import("lenis/react"), { ssr: false });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root />
      {children}
    </>
  );
}
