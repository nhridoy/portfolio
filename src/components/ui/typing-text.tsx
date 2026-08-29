"use client";

import { span as Span } from "framer-motion/m";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingText({
  text,
  className,
  speed = 50,
  delay = 0,
}: Readonly<TypingTextProps>) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    let lastTime = 0;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const elapsed = currentTime - lastTime;

      if (elapsed >= speed) {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
          lastTime = currentTime;
        }
      }

      if (index <= text.length) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, speed, started]);

  return (
    <Span
      className={cn("font-sans", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      <Span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-px h-[1em] bg-foreground ml-0.5 align-middle"
      />
    </Span>
  );
}
