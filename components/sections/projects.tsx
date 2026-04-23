'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useLayoutEffect, useState } from 'react'
import { PROJECTS } from '@/lib/constants'
import { BlurReveal } from '../ui/blur-reveal'
import { Container } from '../ui/container'
import { Section } from '../ui/section'
import { H2 } from '../ui/typography'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const [distance, setDistance] = useState(0)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !containerRef.current) return

      const track = trackRef.current
      const container = containerRef.current

      const totalWidth = track.scrollWidth
      const visibleWidth = container.clientWidth

      const items = track.children
      if (!items.length) return

      const firstItem = items[0] as HTMLElement
      const lastItem = items[items.length - 1] as HTMLElement

      const firstWidth = firstItem.offsetWidth
      const lastWidth = lastItem.offsetWidth

      const start = (visibleWidth - firstWidth) / 2
      const end = (visibleWidth - lastWidth) / 2

      const baseDistance = totalWidth - visibleWidth

      // ✅ IMPORTANT: include centering offsets in total scroll distance
      const totalScrollDistance = baseDistance + start + end

      setDistance(Math.max(0, baseDistance))
      setStartOffset(start)
      setEndOffset(end)

      // ✅ THIS FIXES YOUR ISSUE
      setScrollHeight(totalScrollDistance + window.innerHeight)
    }

    measure()

    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)

    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'], // back to stable mapping
  })

  const x = useTransform(scrollYProgress, [0, 1], [startOffset, -(distance + endOffset)])

  return (
    <Section id="projects">
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: scrollHeight || '200vh', // fallback
        }}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Heading */}
          <Container className="pt-6 md:pt-10">
            <BlurReveal>
              <H2 className="mb-0">Projects</H2>
            </BlurReveal>
          </Container>

          {/* Slider */}
          <div className="flex-1 flex items-center overflow-hidden mt-6 md:mt-10">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-4 md:gap-7 px-[5vw] will-change-transform"
            >
              {PROJECTS.map((item, index) => (
                <BlurReveal
                  key={item.id}
                  delay={0.01 * index}
                  className="shrink-0 w-70 md:w-100 h-87.5 md:h-125 rounded-xl relative overflow-hidden"
                >
                  <ProjectCard item={item} />
                </BlurReveal>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-linear-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-linear-to-l from-background to-transparent z-10" />
      </div>
    </Section>
  )
}
