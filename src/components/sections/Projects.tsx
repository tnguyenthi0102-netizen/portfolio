import { projectsData } from '@/data/portfolio'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import Tag from '@/components/ui/Tag'

type Project = {
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  liveSite?: string
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28 mb-28 max-w-[60rem] mx-auto">
      <h2 className="text-3xl font-medium capitalize mb-8 text-center">My projects</h2>
      <div className="flex flex-col gap-6">
        {(projectsData as Project[]).map((project: Project, index: number) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

type ProjectCardProps = {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const reverse = index % 2 === 1
  return (
    <Card className="relative bg-[var(--color-card-bg)] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <div className={cn('flex flex-col', reverse ? 'sm:flex-row-reverse' : 'sm:flex-row')}>
        {/* Left Section - Text Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-fg)] uppercase mb-4">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed flex-1 p-5">
            {project.description}
          </p>
          
          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, i: number) => (
              <Tag
                key={i}
                text={tag}
                size="sm"
                className="bg-[var(--color-border)] text-[var(--color-fg)] tracking-wider rounded-xl py-1.5"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Image */}
        <div className={cn('relative sm:w-96 sm:min-w-96 h-64 sm:max-h-96 mt-4 sm:mt-0 flex items-center justify-center overflow-hidden rounded-lg', reverse ? 'sm:mr-6' : 'sm:ml-6')}>
          <div className="relative w-full h-full max-h-64 sm:max-h-96 flex items-center justify-center rounded-lg">
            <img
              src={project.imageUrl || 'https://via.placeholder.com/600x400'}
              alt={`${project.title} project`}
              className="w-full h-full max-w-full max-h-64 sm:max-h-96 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProjectsSection
