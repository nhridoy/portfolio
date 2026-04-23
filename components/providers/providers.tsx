'use client'

import { CursorifyProvider } from '@cursorify/react'
import { CustomCursor } from '@/components/ui/cursor'
import { GlassCursor } from '../ui/glass-cursor'
import { ThemeProvider } from './theme-provider'
import { useState, useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in globalThis || navigator.maxTouchPoints > 0)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      <CursorifyProvider
        enabled={!isTouchDevice}
        cursor={<CustomCursor />}
        delay={5}
        defaultCursorVisible={false}
      >
        {children}
      </CursorifyProvider>
    </ThemeProvider>
  )
}
