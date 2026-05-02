'use client'

import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28 first:pt-28', className)}>
      {children}
    </section>
  )
}
