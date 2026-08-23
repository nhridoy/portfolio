"use client";

import { div as Div } from "framer-motion/m";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PERSONAL_INFO } from "@/lib/constants";
import Watermark from "../../assets/watermark.webp";
import { AnimatedLink } from "../ui/animated-link";
import { Button } from "../ui/button";
import Header from "../ui/header";
import { Section } from "../ui/section";
import { TypingText } from "../ui/typing-text";

export function Hero() {
  return (
    <Section id="hero" className="relative py-0 md:py-0 first:pt-0">
      <Container className="z-10 relative min-h-screen flex flex-col justify-center">
        <Header className="absolute top-0 left-0 w-full" />
        <div className="flex flex-col gap-5 md:gap-0">
          <div className="flex flex-col @container">
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
              <span className="text-[clamp(1rem,2.5cqw,10rem)]">
                Available for hire
              </span>
            </div>
            <h1 className="text-[clamp(2rem,13.4cqw,20.3rem)] uppercase md:-ml-2.5 leading-none text-black font-extrabold block text-left">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          <div className="md:absolute md:bottom-5 md:left-0 w-full flex gap-20 flex-col-reverse md:flex-row items-start md:justify-between mt-auto md:mt-0">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="interactive"
                className="uppercase font-bold"
              >
                Discuss Your Project
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
              className="text-3xl font-cormorant font-bold"
              text={PERSONAL_INFO.tagline}
              delay={0.5}
            />
          </div>
        </div>
      </Container>
      <div className="absolute inset-0">
        <span className="absolute z-10 uppercase left-5 bottom-0 origin-top-left -translate-yfull -rotate-90">
          Portfolio {new Date().getFullYear()}
        </span>
        <Image
          src={Watermark}
          alt="Background Hero Watermark"
          className="absolute px-5 md:px-0 bottom-0 left-0 md:left-15 w-full md:w-md"
        />
        {/* <span className="absolute text-gray-200 origin-bottom-left bottom-0 leading-none -my-13.5 left-10 text-[60vw] md:text-[30vw] font-extrabold">
          NH
        </span> */}
      </div>
    </Section>
  );
}
