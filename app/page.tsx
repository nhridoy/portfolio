import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Footer } from '@/components/ui/footer'

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
