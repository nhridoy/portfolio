'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypingText({ text, className, speed = 50, delay = 0 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <motion.span
      className={cn('font-sans', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-px h-[1em] bg-foreground ml-0.5 align-middle"
      />
    </motion.span>
  )
}
