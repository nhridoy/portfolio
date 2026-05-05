import { BlurReveal } from "@/components/ui/blur-reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Body, H2, Muted } from "@/components/ui/typography";
import { EXPERIENCE } from "@/lib/constants";

export default function Experience() {
  return (
    <Section id="experience">
      <Container>
        <BlurReveal>
          <H2>Experience</H2>
        </BlurReveal>

        <div className="flex flex-col gap-16">
          {EXPERIENCE.map((exp, index) => (
            <BlurReveal key={`${exp.role}-${exp.company}`} delay={index * 0.1}>
              <div className="group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8">
                <Muted className="md:text-right font-mono text-xs">
                  {exp.period}
                </Muted>
                <div>
                  <Body className="font-medium text-foreground/90 mb-1">
                    {exp.role}
                  </Body>
                  <Muted className="block mb-3">{exp.company}</Muted>
                  <Body>{exp.description}</Body>
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
