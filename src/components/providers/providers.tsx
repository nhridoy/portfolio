"use client";

import { CursorifyProvider } from "@cursorify/react";
import { LazyMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CustomCursor } from "@/components/ui/cursor";
import { ThemeProvider } from "./theme-provider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const loadFeatures = () =>
    import("../../lib/motion-features").then((res) => res.default);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in globalThis || navigator.maxTouchPoints > 0,
    );
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      <LazyMotion strict={true} features={loadFeatures}>
        <CursorifyProvider
          enabled={!isTouchDevice}
          cursor={<CustomCursor />}
          delay={5}
          defaultCursorVisible={false}
        >
          {children}
        </CursorifyProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
