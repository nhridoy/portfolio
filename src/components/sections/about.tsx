import { BlurReveal } from "@/components/ui/blur-reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Body, H2 } from "@/components/ui/typography";
import { PERSONAL_INFO } from "@/lib/constants";

export default function About() {
  return (
    <Section id="about">
      <Container>
        <BlurReveal>
          <H2>About</H2>
        </BlurReveal>

        <BlurReveal delay={0.1}>
          <Body className="max-w-3xl leading-8">{PERSONAL_INFO.bio}</Body>
        </BlurReveal>
      </Container>
    </Section>
  );
}
