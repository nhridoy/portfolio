"use client";

import { ChevronDownIcon } from "lucide-react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TypingText } from "@/components/ui/typing-text";
import { Caption } from "@/components/ui/typography";
import { PERSONAL_INFO } from "@/lib/constants";
import Header from "../ui/header";
import { Section } from "../ui/section";

export function Hero() {
  return (
    <Section id="hero" className="relative py-0 md:py-0 first:pt-0">
      <Container className="min-h-screen flex flex-col justify-center">
        {/* <nav className="flex justify-between items-start mb-20">
          <BlurReveal>
            <Caption>Portfolio</Caption>
          </BlurReveal>
          <BlurReveal delay={0.3}>
            <ThemeToggle />
          </BlurReveal>
        </nav> */}

        <Header />

        <BlurReveal>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-6">
            {PERSONAL_INFO.name}
          </h1>
        </BlurReveal>

        <BlurReveal delay={0.15}>
          <TypingText
            text={PERSONAL_INFO.tagline}
            className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground block max-w-2xl"
            speed={40}
            delay={0.5}
          />
        </BlurReveal>

        <BlurReveal delay={0.4}>
          <Caption className="text-muted-foreground/40">
            {PERSONAL_INFO.title}
          </Caption>
        </BlurReveal>

        <BlurReveal delay={0.45}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
            <Button variant="secondary">
              <a
                href="https://drive.google.com/file/d/1u9o56taT9Q2C36u9kl1Lx950gYRVWN3V/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          </div>
        </BlurReveal>

        <BlurReveal
          delay={0.6}
          className="absolute bottom-15 left-1/2 -translate-x-1/2"
        >
          <ChevronDownIcon className="animate-bounce" />
        </BlurReveal>
      </Container>
    </Section>
  );
}
