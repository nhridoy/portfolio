'use client'

import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

interface SectionDotsProps {
  className?: string
}

export function SectionDots({ className }: SectionDotsProps) {
  const [activeSection, setActiveSection] = useState('hero')

  const getSectionBounds = useCallback(() => {
    const bounds: { id: string; top: number; bottom: number }[] = []
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        bounds.push({
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        })
      }
    })
    return bounds
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2
      const bounds = getSectionBounds()

      for (let i = bounds.length - 1; i >= 0; i--) {
        if (scrollPos >= bounds[i].top) {
          setActiveSection(bounds[i].id)
          break
        }
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [getSectionBounds])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-6 group',
        'mix-blend-difference',
        className,
      )}
    >
      {sections.map(({ id, label }) => (
        <button
          type="button"
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Scroll to ${label}`}
          className="relative flex items-center"
        >
          <span
            className={cn(
              'opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground whitespace-nowrap mr-2',
              activeSection === id ? 'opacity-100' : '',
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              'size-3 rounded-full border border-white transition-all',
              activeSection === id
                ? 'bg-white scale-125 ring ring-white ring-offset-1 ring-offset-black'
                : 'bg-transparent group-hover:bg-white/30',
            )}
          />
        </button>
      ))}
    </div>
  )
}
