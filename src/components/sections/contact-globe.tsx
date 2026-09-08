"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function ContactGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visible = useInView(canvasRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;
    let disposed = false;
    let frame = 0;
    let cleanup = () => {};
    void import("cobe").then(({ default: createGlobe }) => {
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      let phi = 4.72;
      let previous = 0;
      let globe: ReturnType<typeof createGlobe>;
      try {
        globe = createGlobe(canvas, {
          width: canvas.clientWidth * dpr,
          height: canvas.clientHeight * dpr,
          devicePixelRatio: dpr,
          phi,
          theta: 0.3,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 10000,
          mapBrightness: 5,
          baseColor: [0.72, 0.72, 0.72],
          markerColor: [1, 1, 1],
          glowColor: [0.12, 0.12, 0.12],
          markerElevation: 0,
          markers: [],
        });
      } catch {
        // The location caption remains usable if WebGL is unavailable.
        return;
      }
      const observer = new ResizeObserver(() =>
        globe.update({
          width: canvas.clientWidth * dpr,
          height: canvas.clientHeight * dpr,
        }),
      );
      observer.observe(canvas);
      function animate(time: number) {
        if (!document.hidden && previous) {
          phi += Math.min(time - previous, 50) * 0.00006;
          globe.update({ phi });
        }
        previous = time;
        frame = requestAnimationFrame(animate);
      }
      if (reducedMotion === false) frame = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        globe.destroy();
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [visible, reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden opacity-35 md:opacity-45">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Slowly rotating globe"
        className="absolute left-1/2 top-0 aspect-square w-[150%] max-w-[1200px] -translate-x-1/2 -translate-y-[8%] md:w-[90%]"
      />
    </div>
  );
}
