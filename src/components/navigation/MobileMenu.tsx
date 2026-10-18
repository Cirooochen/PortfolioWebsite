import { useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { useWaterSurface } from '../../hooks/useWaterSurface'
import { getLenis } from '../../hooks/useLenis'
import { WATER_DEFAULTS } from '../water/waterSurface'
import { contactEmail } from '../../data/contact'
import type { Page } from '../../types'

interface MobileMenuProps {
  id: string
  open: boolean
  currentPage: Page
  onNavigate: (page: Page) => void
  onClose: () => void
}

const links: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'projects', label: 'Projects' },
]

// Entrance timing (ms): links rise one after another once the panel has mostly slid in
const linkStart = 180
const linkStagger = 70

const slide = '500ms cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Slides (or, with reduced motion, fades). Visibility flips at once on open so
 * the first link can take focus right away, and only after the slide on close.
 */
function panelTransition(open: boolean) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const motion = reduced ? `opacity ${slide}` : `translate ${slide}`
  return `${motion}, visibility 0s linear ${open ? '0s' : '500ms'}`
}

/** Water ripples behind the menu: ambient drops, a trail under the finger, ripples on tap. */
function MenuWater() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { supported } = useWaterSurface({ canvasRef, stageRef, observeRef: stageRef, surface: WATER_DEFAULTS })

  return (
    <div ref={stageRef} aria-hidden className="absolute inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className={`size-full opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_45%)] ${supported ? '' : 'hidden'}`}
      />
    </div>
  )
}

/**
 * Full-screen menu for small screens. Slides in from the right over the
 * page, which is made inert and stops scrolling while it's open. Escape or
 * the nav's close button dismisses it.
 */
export function MobileMenu({ id, open, currentPage, onNavigate, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Keeps the water running through the slide-out, then tears it down
  const [rendered, setRendered] = useState(open)
  if (open && !rendered) setRendered(true)

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const main = document.querySelector('main')
    const root = document.documentElement
    main?.setAttribute('inert', '')
    root.style.overflow = 'hidden'
    getLenis()?.stop()
    panel?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      // Focus would be lost inside the now-inert panel: hand it back to the toggle
      if (panel?.contains(document.activeElement)) {
        document.querySelector<HTMLElement>(`[aria-controls="${id}"]`)?.focus({ preventScroll: true })
      }
      main?.removeAttribute('inert')
      root.style.overflow = ''
      getLenis()?.start()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, id])

  return (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === 'visibility' && !open) setRendered(false)
      }}
      style={{ transition: panelTransition(open) }}
      className={`fixed inset-0 z-[45] isolate flex flex-col overflow-hidden bg-bg-primary motion-reduce:translate-x-0 md:hidden ${
        open ? 'visible translate-x-0 motion-reduce:opacity-100' : 'invisible translate-x-full motion-reduce:opacity-0'
      }`}
    >
      {rendered && <MenuWater />}

      <Container className="flex flex-1 flex-col pb-10 pt-28">
        <ul className="space-y-3">
          {links.map(({ page, label }, i) => {
            const active = currentPage === page
            return (
              <li
                key={page}
                className={`transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${linkStart + i * linkStagger}ms` : '0ms' }}
              >
                <a
                  href={page === 'home' ? '/' : '/projects'}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate(page)
                  }}
                  className="group flex items-baseline gap-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                >
                  <span className="w-6 font-mono text-sm tabular-nums text-text-tertiary">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`text-5xl font-semibold tracking-tight underline-offset-8 ${
                      active ? 'text-text-primary underline decoration-2' : 'text-text-secondary group-active:text-text-primary'
                    }`}
                  >
                    {label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div
          className={`mt-auto border-t border-border-primary pt-6 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: open ? `${linkStart + links.length * linkStagger + 60}ms` : '0ms' }}
        >
          <p className="mb-3 text-sm text-text-tertiary">Get in touch</p>
          <a
            href={`mailto:${contactEmail}`}
            className="group inline-flex items-center gap-2 text-lg font-medium text-text-primary underline decoration-border-secondary underline-offset-[6px] transition-colors hover:decoration-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            {contactEmail}
            <span aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </Container>
    </div>
  )
}
