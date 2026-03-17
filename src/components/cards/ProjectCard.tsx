import { Heading } from '../typography/Heading'
import { Text } from '../typography/Text'
import { Label } from '../typography/Label'
import { Tag } from '../ui/Tag'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-border-primary bg-bg-primary p-6 text-left transition-all duration-[var(--transition-base)] hover:border-border-secondary hover:shadow-lg"
    >
      <div className="mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-bg-tertiary">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl text-text-tertiary">{project.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Label>{project.role}</Label>
        <span className="text-text-tertiary">·</span>
        <Label>{project.year}</Label>
      </div>
      <Heading level={3} className="mb-2 transition-colors group-hover:text-accent">
        {project.title}
      </Heading>
      <Text size="sm" muted className="mb-4">
        {project.description}
      </Text>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </button>
  )
}
