'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { Button } from '@/components/ui/button'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme as Theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const getIcon = () => {
    if (theme === 'system') return Monitor
    return theme === 'dark' ? Moon : Sun
  }

  const Icon = getIcon()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="w-9 h-9"
      aria-label={`Theme: ${theme}`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Theme: {theme}</span>
    </Button>
  )
}
