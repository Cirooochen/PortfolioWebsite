import { useCallback, useEffect, useState } from 'react'
import { Container } from '../layout/Container'
import { NavLink } from './NavLink'
import { MobileMenu } from './MobileMenu'
import { useHeroPassed } from '../../hooks/useHeroPassed'
import type { Page } from '../../types'

interface NavBarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function NavBar({ currentPage, onNavigate }: NavBarProps) {
  // Solid nav + logo once the hero's bottom edge reaches 7% of the viewport
  const passedHero = useHeroPassed(0.07, currentPage)
  const [menuOpen, setMenuOpen] = useState(false)
  // The open menu shows the name, over its own background
  const scrolled = passedHero || menuOpen
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // The menu only exists below md; close it if the screen grows past that
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 48rem)')
    const onChange = () => wide.matches && setMenuOpen(false)
    wide.addEventListener('change', onChange)
    return () => wide.removeEventListener('change', onChange)
  }, [])

  const go = (page: Page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  return (
    <>
      <nav
        className={`sticky top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          menuOpen
            ? 'z-50 border-transparent bg-transparent'
            : passedHero
              ? 'z-40 border-border-primary bg-bg-primary/45 backdrop-blur-md'
              : 'z-40 border-transparent bg-transparent'
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
              onClick={() => go('home')}
              aria-hidden={!scrolled}
              tabIndex={scrolled ? 0 : -1}
              className={`col-start-1 row-start-1 justify-self-start text-lg font-semibold tracking-tight text-text-primary transition-all duration-500 hover:opacity-70 ${
                scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              Ciro Chen
            </button>
          </div>
          <div className="hidden items-center gap-1 md:flex">
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

          {/* Small screens: two lines that turn into a cross */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2.5 flex size-11 items-center justify-center rounded-full text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  menuOpen ? 'top-[5.25px] rotate-45' : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  menuOpen ? 'top-[5.25px] -rotate-45' : 'top-[10.5px] rotate-0'
                }`}
              />
            </span>
          </button>
        </Container>
      </nav>

      <MobileMenu id="mobile-menu" open={menuOpen} currentPage={currentPage} onNavigate={go} onClose={closeMenu} />
    </>
  )
}
