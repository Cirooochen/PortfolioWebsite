import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Footer } from '../components/footer/Footer'
import { ProjectCard } from '../components/cards/ProjectCard'
import { ProjectList } from '../components/projects/ProjectList'
import { ViewToggle } from '../components/ui/ViewToggle'
import { FilterPills } from '../components/ui/FilterPills'
import { projectCategories, projects } from '../data/projects'
import type { NavigateFn, ProjectCategory } from '../types'

interface ProjectsPageProps {
  onNavigate: NavigateFn
}

type View = 'cards' | 'list'
type Filter = 'all' | ProjectCategory

const viewOptions: { value: View; label: string; icon: React.ReactNode }[] = [
  {
    value: 'cards',
    label: 'Cards view',
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
    label: 'List view',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 4h12M2 8h12M2 12h12" />
      </svg>
    ),
  },
]

// Every category with at least one project, after "All"; empty ones are left out
const filterOptions: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'All', count: projects.length },
  ...projectCategories
    .map(({ id, label }) => ({ value: id, label, count: projects.filter((p) => p.categories.includes(id)).length }))
    .filter((option) => option.count > 0),
]

// View and filter live in the URL so they survive reloads and back navigation from a project
const params = () => new URLSearchParams(window.location.search)
const readView = (): View => (params().get('view') === 'list' ? 'list' : 'cards')
const readFilter = (): Filter => {
  const category = params().get('category')
  return filterOptions.find((option) => option.value === category)?.value ?? 'all'
}

function writeParam(key: string, value: string | null) {
  const url = new URL(window.location.href)
  if (value) url.searchParams.set(key, value)
  else url.searchParams.delete(key)
  window.history.replaceState(null, '', url)
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [view, setView] = useState<View>(readView)
  const [filter, setFilter] = useState<Filter>(readFilter)

  const changeView = (next: View) => {
    setView(next)
    writeParam('view', next === 'list' ? 'list' : null)
  }

  const changeFilter = (next: Filter) => {
    setFilter(next)
    writeParam('category', next === 'all' ? null : next)
  }

  const shown = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  const open = (id: string) => onNavigate('project', id)

  return (
    <>
      <Section>
        <Container>
          {/* The first fold: the chat button waits until this has scrolled away */}
          <div data-first-fold>
            <h1 className="mb-12 text-[clamp(2.5rem,1.4rem+4.4vw,5rem)] font-semibold leading-[1.05] tracking-tight text-text-primary md:mb-20">
              Designing and building <br className="max-md:hidden" />
              thoughtful digital products
            </h1>

            <div className="mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 md:mb-16">
              <FilterPills label="Filter projects" options={filterOptions} value={filter} onChange={changeFilter} />
              <ViewToggle label="Project view" options={viewOptions} value={view} onChange={changeView} />
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          </p>

          {/* Remounts on each filter or view change so the results fade in fresh */}
          <div key={`${filter}-${view}`} className="animate-fade-in motion-reduce:animate-none">
            {view === 'cards' ? (
              <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
                {shown.map((project) => (
                  // Equal-sized cards here; emphasis only shapes the Home layout
                  <li key={project.id}>
                    <ProjectCard project={project} emphasis="standard" onOpen={() => open(project.id)} />
                  </li>
                ))}
              </ul>
            ) : (
              <ProjectList projects={shown} onOpen={open} />
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  )
}
