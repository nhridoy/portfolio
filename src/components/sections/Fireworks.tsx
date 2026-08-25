'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { H2, Serif } from '@/components/ui/typography'
import { SKILLS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { BlurReveal } from '../ui/blur-reveal'
import { Container } from '../ui/container'
import { Section } from '../ui/section'

const allItems = Object.values(SKILLS).flat()
const MAX_RADIUS = 280

interface ItemPosition {
  item: string
  angle: number
  distance: number
  targetX: number
  targetY: number
}

interface FireworkItemProps {
  item: string
  targetX: number
  targetY: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function FireworkItem({ item, targetX, targetY, scrollYProgress }: FireworkItemProps) {
  const x = useTransform(scrollYProgress, [-0.3, 1], [0, targetX], { clamp: true })
  const y = useTransform(scrollYProgress, [-0.3, 1], [0, targetY], { clamp: true })

  return (
    <motion.div
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        // 'px-3 py-1.5 rounded-full bg-foreground/10 border border-foreground/20',
        'text-sm font-medium whitespace-nowrap',
      )}
      style={{
        x,
        y,
        // opacity: useTransform([x, y], ([latestX, latestY]) => {
        //   const currentX = Number(latestX)
        //   const currentY = Number(latestY)
        //   const traveled = Math.hypot(currentX, currentY)
        //   const total = Math.hypot(targetX, targetY) || 1
        //   return Math.min(1, traveled / total)
        // }),
        // scale: useTransform([x, y], ([latestX, latestY]) => {
        //   const currentX = Number(latestX)
        //   const currentY = Number(latestY)
        //   const traveled = Math.hypot(currentX, currentY)
        //   const total = Math.hypot(targetX, targetY) || 1
        //   return 0.5 + 0.5 * Math.min(1, traveled / total)
        // }),
      }}
    >
      <Serif>{item}</Serif>
    </motion.div>
  )
}

export function Fireworks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const itemPositions = useMemo<ItemPosition[]>(() => {
    return allItems.map((item, index) => {
      const angle = (index / allItems.length) * 360 + (Math.random() - 0.5) * 60
      const distance = 80 + Math.random() * MAX_RADIUS
      const rad = (angle * Math.PI) / 180
      return {
        item,
        angle,
        distance,
        targetX: Math.cos(rad) * distance,
        targetY: Math.sin(rad) * distance,
      }
    })
  }, [])

  return (
    <Section id="fireworks-skills">
      <Container>
        <BlurReveal>
          <H2>Skills (Scroll)</H2>
        </BlurReveal>
        <BlurReveal delay={0.1} className="text-muted-foreground max-w-md">
          As you scroll, watch the skills explode like fireworks!
        </BlurReveal>
      </Container>

      <div ref={containerRef} className="relative h-[400vh] motion-reduce:h-auto">
        <div className="sticky top-0 h-screen w-70 md:w-100 m-auto flex items-center justify-start overflow-visible motion-reduce:relative motion-reduce:h-auto motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:py-12.5">
          {itemPositions.map(pos => (
            <FireworkItem
              key={pos.item}
              item={pos.item}
              targetX={pos.targetX}
              targetY={pos.targetY}
              scrollYProgress={scrollYProgress}
            />
          ))}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background size-70 md:size-100 rounded-full blur-3xl" /> */}
        </div>
      </div>
    </Section>
  )
}
