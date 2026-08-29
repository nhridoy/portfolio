"use client";

import { useScroll, useTransform } from "framer-motion";
import { div as Div } from "framer-motion/m";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  // Scroll tracking for the bottom-up name reveal
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Moves the signature up from below the viewport (100%) to half-way (0%)
  const signatureY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  // Fades in from 0 to 1 as it enters, then stays clamped at 1
  const signatureOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    [0, 1, 1],
    { clamp: true },
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white border-t border-white/10 pt-16 pb-0 relative overflow-hidden font-sans select-none"
    >
      <div className="theme-container flex flex-col justify-between">
        {/* Top Minimal Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="text-center">© {currentYear} NAHIDUJJAMAN HRIDOY</div>
          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nhridoy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nahidujjaman-hridoy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hi@iamnahid.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span className="uppercase tracking-widest">TOP</span>
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
      {/* Cinematic Bottom-Up Name Popup */}
      <div className="relative w-full overflow-hidden pointer-events-none">
        <Div
          style={{ y: signatureY, opacity: signatureOpacity }}
          className="w-full flex justify-center items-end"
        >
          <h2 className="text-[14vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white/80 via-white/20 to-transparent whitespace-nowrap translate-y-1/3">
            NAHIDUJJAMAN
          </h2>
        </Div>
      </div>
    </footer>
  );
}
