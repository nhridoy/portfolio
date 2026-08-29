"use client";

import React, { Suspense } from "react";

const Analytics = React.lazy(() =>
  import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
);
const SpeedInsights = React.lazy(() =>
  import("@vercel/speed-insights/next").then((m) => ({
    default: m.SpeedInsights,
  })),
);
const SmoothScroll = React.lazy(() =>
  import("@/components/providers/smooth-scroll").then((m) => ({
    default: m.SmoothScroll,
  })),
);
const LazyMotion = React.lazy(() =>
  import("framer-motion").then((m) => ({
    default: m.LazyMotion,
  })),
);

export function DeferredProviders({ children }: { children: React.ReactNode }) {
  const loadFeatures = () =>
    import("../../lib/motion-features").then((res) => res.default);
  return (
    <Suspense fallback={null}>
      <SmoothScroll>
        <Analytics />
        <SpeedInsights />
        <LazyMotion strict={true} features={loadFeatures}>
          {children}
        </LazyMotion>
      </SmoothScroll>
    </Suspense>
  );
}
