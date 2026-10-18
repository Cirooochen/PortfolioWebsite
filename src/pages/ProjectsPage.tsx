import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Heading } from '../components/typography/Heading'
import { Text } from '../components/typography/Text'
import { ProjectCard } from '../components/cards/ProjectCard'
import { ProjectList } from '../components/projects/ProjectList'
import { ViewToggle } from '../components/ui/ViewToggle'
import { projects } from '../data/projects'
import type { NavigateFn } from '../types'

interface ProjectsPageProps {
  onNavigate: NavigateFn
}

type View = 'cards' | 'list'

const viewOptions: { value: View; label: string; icon: React.ReactNode }[] = [
  {
    value: 'cards',
    label: 'Cards',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    value: 'list',
    label: 'List',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 4h12M2 8h12M2 12h12" />
      </svg>
    ),
  },
]

// The view lives in the URL so it survives reloads and back navigation from a project
const readView = (): View => (new URLSearchParams(window.location.search).get('view') === 'list' ? 'list' : 'cards')

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [view, setView] = useState<View>(readView)

  const changeView = (next: View) => {
    setView(next)
    const url = new URL(window.location.href)
    if (next === 'list') url.searchParams.set('view', 'list')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
  }

  const open = (id: string) => onNavigate('project', id)

  return (
    <>
      <Section>
        <Container>
          <div className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <Heading level={1} className="mb-4">Projects</Heading>
              <Text size="lg" muted className="max-w-xl">
                All my work: in-depth case studies and shorter visual projects.
              </Text>
            </div>
            <div className="flex items-center justify-between gap-6 md:justify-end">
              <p className="text-sm text-text-tertiary">{projects.length} projects</p>
              <ViewToggle label="Project view" options={viewOptions} value={view} onChange={changeView} />
            </div>
          </div>

          {view === 'cards' ? (
            <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
              {projects.map((project) => (
                // Equal-sized cards here; emphasis only shapes the Home layout
                <li key={project.id}>
                  <ProjectCard project={project} emphasis="standard" onOpen={() => open(project.id)} />
                </li>
              ))}
            </ul>
          ) : (
            <ProjectList projects={projects} onOpen={open} />
          )}
        </Container>
      </Section>

      <Footer onNavigate={onNavigate} />
    </>
  )
}
