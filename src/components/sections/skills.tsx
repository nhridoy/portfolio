'use client'

import { BlurReveal } from '@/components/ui/blur-reveal'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Body, H2, Muted } from '@/components/ui/typography'
import { SKILLS } from '@/lib/constants'

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <BlurReveal>
          <H2>Skills</H2>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <BlurReveal key={category} delay={index * 0.1}>
              <Muted className="block mb-4 text-xs uppercase tracking-widest font-mono">
                {category}
              </Muted>
              <Body className="text-foreground/80">{skills.join(', ')}</Body>
            </BlurReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
