"use client";

import { useInView } from "framer-motion";
import { div as Div } from "framer-motion/m";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
}: Readonly<BlurRevealProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </Div>
  );
}
