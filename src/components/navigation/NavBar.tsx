import { Container } from '../layout/Container'
import { NavLink } from './NavLink'
import type { Page } from '../../types'

interface NavBarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function NavBar({ currentPage, onNavigate }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border-primary bg-bg-primary/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-70"
        >
          Ciro Chen
        </button>
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
