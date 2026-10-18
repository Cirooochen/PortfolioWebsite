import { Container } from '../layout/Container'
import { inAppClick, projectHref } from '../../hooks/useRouteState'
import { projects } from '../../data/projects'
import type { NavigateFn } from '../../types'

interface NextProjectProps {
  currentId: string
  onNavigate: NavigateFn
}

/** Link to the following project in the collection, wrapping around at the end. */
export function NextProject({ currentId, onNavigate }: NextProjectProps) {
  const position = projects.findIndex((p) => p.id === currentId)
  const next = projects[(position + 1) % projects.length]
  if (!next || next.id === currentId) return null

  return (
    <Container className="pb-cs-section">
      <div className="border-t border-cs-rule pt-8">
        <p className="text-cs-label font-medium uppercase text-cs-muted">Next project</p>
        <a
          href={projectHref(next.id)}
          onClick={inAppClick(() => onNavigate('project', next.id))}
          className="group mt-6 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-accent"
        >
          <span className="flex items-baseline gap-4 text-cs-section font-semibold">
            {next.title}
            <span aria-hidden className="text-cs-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          <span className="mt-3 block max-w-cs-read text-cs-body text-cs-muted">{next.subtitle}</span>
        </a>
      </div>
    </Container>
  )
}
