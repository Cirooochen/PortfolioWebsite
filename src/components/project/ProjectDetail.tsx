import { useEffect } from 'react'
import { Heading } from '../typography/Heading'
import { Text } from '../typography/Text'
import { Label } from '../typography/Label'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { Container } from '../layout/Container'
import type { Project } from '../../types'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg-overlay animate-fade-in"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-3xl rounded-2xl bg-bg-primary p-8 shadow-xl animate-slide-up md:my-16 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Label>{project.role}</Label>
              <span className="text-text-tertiary">·</span>
              <Label>{project.duration}</Label>
              <span className="text-text-tertiary">·</span>
              <Label>{project.year}</Label>
            </div>
            <Heading level={2}>{project.title}</Heading>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </Button>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <Heading level={4} className="mb-3">Overview</Heading>
            <Text muted>{project.overview}</Text>
          </div>
          <div>
            <Heading level={4} className="mb-3">Challenge</Heading>
            <Text muted>{project.challenge}</Text>
          </div>
          <div>
            <Heading level={4} className="mb-3">Approach</Heading>
            <Text muted>{project.approach}</Text>
          </div>
          <div>
            <Heading level={4} className="mb-3">Outcome</Heading>
            <Text muted>{project.outcome}</Text>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div>
              <Heading level={4} className="mb-3">Key Metrics</Heading>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric} className="rounded-lg bg-bg-tertiary px-4 py-3">
                    <Text size="sm" className="font-medium">{metric}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Container className="mt-10 flex justify-center !px-0">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Container>
      </div>
    </div>
  )
}
