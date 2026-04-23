import Image from 'next/image'
import type { PROJECTS } from '@/lib/constants'
import { AnimatedLink } from '../ui/animated-link'

const ProjectCard = ({ item }: { item: (typeof PROJECTS)[0] }) => {
  return (
    <AnimatedLink href={item.link} external className="absolute size-full group">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="absolute object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent/60 via-black/20 to-black/80" />

      <div className="absolute inset-0 p-7.5 flex flex-col justify-end">
        <div className="transform transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-xs font-mono text-white/70 uppercase tracking-wider mb-1 block">
            {item.category}
          </span>
          <h2 className="text-2xl font-bold text-white! margin-0">{item.title}</h2>
        </div>

        <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300">
          <p className="text-sm text-white/80 line-clamp-2 mt-3 mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map(tech => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-md bg-white/20 font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedLink>
  )
}

export default ProjectCard
