"use client"

import React, { useEffect, useState } from 'react'
import { Progress } from './progress'

const ReadingProgress = () => {
   const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      setVisible(scrollTop > 50)

      if (docHeight > 0) {
        const pct = Math.min((scrollTop / docHeight) * 100, 100)
        setProgress(pct)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <Progress
      value={progress}
      className={`fixed top-0 left-0 h-1 bg-primary transition-all z-50 w-full ${visible ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

export default ReadingProgress