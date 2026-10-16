import { Container } from '../layout/Container'
import { NavLink } from './NavLink'
import { useHeroPassed } from '../../hooks/useHeroPassed'
import type { Page } from '../../types'

interface NavBarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function NavBar({ currentPage, onNavigate }: NavBarProps) {
  // Solid nav + logo once the hero's bottom edge reaches 7% of the viewport
  const scrolled = useHeroPassed(0.07, currentPage)

  return (
    <nav
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? 'border-border-primary bg-bg-primary/45 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <div className="grid items-center">
          <div
            aria-hidden={scrolled}
            className={`col-start-1 row-start-1 flex items-center gap-2 text-sm transition-all duration-500 ${
              scrolled ? 'pointer-events-none -translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <span className="size-1.5 rounded-full bg-focus animate-pulse-dot" />
            <span className="text-text-tertiary">Currently:</span>
            <span className="font-medium text-text-primary">developing an app</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
            className={`col-start-1 row-start-1 justify-self-start text-lg font-semibold tracking-tight text-text-primary transition-all duration-500 hover:opacity-70 ${
              scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            Ciro Chen
          </button>
        </div>
        <div className="flex items-center gap-1">
          <NavLink
            active={currentPage === 'home'}
            onClick={() => onNavigate('home')}
          >
            Home
          </NavLink>
          <NavLink
            active={currentPage === 'projects'}
            onClick={() => onNavigate('projects')}
          >
            Projects
          </NavLink>
        </div>
      </Container>
    </nav>
  )
}
