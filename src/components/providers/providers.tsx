"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";

type ProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

const CursorifyProvider = dynamic(
  () => import("@cursorify/react").then((mod) => mod.CursorifyProvider),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("@/components/ui/cursor").then((mod) => mod.CustomCursor),
  { ssr: false },
);

export function Providers(props: Readonly<ProvidersProps>) {
  const { children } = props;
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {mounted && !isTouchDevice ? (
        <CursorifyProvider
          enabled
          cursor={<CustomCursor />}
          delay={5}
          defaultCursorVisible={false}
        >
          {children}
        </CursorifyProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
