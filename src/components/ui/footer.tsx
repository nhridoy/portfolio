'use client'

import { Container } from '@/components/ui/container'
import { Muted } from '@/components/ui/typography'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Muted className="text-xs">
            © {currentYear} Nahidujjaman Hridoy. All rights reserved.
          </Muted>
          <Muted className="text-xs">Built with Next.js & Tailwind CSS</Muted>
        </div>
      </Container>
    </footer>
  )
}
