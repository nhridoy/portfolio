"use client";

import { div as Div } from "framer-motion/m";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";
import Watermark from "../../assets/watermark.webp";
import { AnimatedLink } from "../ui/animated-link";
import { Button } from "../ui/button";
import Header from "../ui/header";
import { TypingText } from "../ui/typing-text";

export function Hero() {
  return (
    <section id="hero" className="relative bg-background">
      <div className="theme-container z-10 relative min-h-dvh flex flex-col justify-center">
        <Header className="absolute top-0 left-0 w-full" />
        <div className="flex flex-col gap-5 md:gap-0">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Div
                className="bg-green-600 rounded-full size-2"
                animate={{
                  scale: [1, 1.5, 1],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(360deg)",
                    "blur(1px)",
                    "blur(0px)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span>Available for hire</span>
            </div>
            <h1 className="text-10xl uppercase -ml-2.5 leading-none text-black font-extrabold block">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          <div className="absolute top-2/3 lg:top-auto lg:bottom-5 left-0 w-full flex gap-20 flex-col-reverse lg:flex-row items-start lg:justify-between mt-auto lg:mt-0">
            <div className="flex flex-col md:flex-row md:gap-8">
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="interactive"
                className="uppercase font-bold"
              >
                Contact Me
              </Button>
              <Button
                nativeButton={false}
                variant="interactive"
                className="uppercase font-bold"
                render={
                  <AnimatedLink
                    href="https://drive.google.com/file/d/1u9o56taT9Q2C36u9kl1Lx950gYRVWN3V/view?usp=sharing"
                    external
                    className="hover:no-underline"
                  />
                }
              >
                Download CV
              </Button>
            </div>
            <TypingText
              className="text-2xl font-cormorant font-bold"
              text={PERSONAL_INFO.tagline}
              delay={0.5}
            />
          </div>
        </div>
      </div>

      <div className="theme-container relative">
        <Image
          src={Watermark}
          loading="eager"
          fetchPriority="high"
          alt="Background Hero Watermark"
          className="absolute bottom-0 left-0 w-full md:w-md"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <span className="absolute z-10 uppercase left-5 bottom-0 origin-top-left -rotate-90">
          Portfolio {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}
