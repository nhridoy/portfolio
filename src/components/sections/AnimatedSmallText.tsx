"use client";

import { useInView } from "framer-motion";
import { div as Div } from "framer-motion/m";
import { useRef } from "react";

const AnimatedSmallText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="flex items-center overflow-hidden">
      <Div
        className="h-0.25 bg-background shrink-0"
        initial={{ width: 0 }}
        animate={{ width: isInView ? "2rem" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <span className="ml-2 text-sm font-light uppercase whitespace-nowrap text-background">
        {text}
      </span>
    </div>
  );
};

export default AnimatedSmallText;
