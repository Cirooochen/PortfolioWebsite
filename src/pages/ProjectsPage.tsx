import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Heading } from '../components/typography/Heading'
import { Text } from '../components/typography/Text'
import { ProjectCard } from '../components/cards/ProjectCard'
import { ProjectDetail } from '../components/project/ProjectDetail'
import { projects } from '../data/projects'
import type { Project } from '../types'

export function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <Section>
        <Container>
          <div className="mb-12">
            <Heading level={2} className="mb-4">Projects</Heading>
            <Text size="lg" muted className="max-w-xl">
              A selection of projects where I've led design from research through implementation.
            </Text>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </Container>
      </Section>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
