import { useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { inAppClick, projectHref } from '../../hooks/useRouteState'
import { projects } from '../../data/projects'
import type { NavigateFn } from '../../types'

interface NextCaseProps {
  currentId: string
  onNavigate: NavigateFn
}

/** How far the cursor pill closes in on the pointer each frame (0–1); lower trails more */
const followEase = 0.22

function coverUrl(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`
}

/**
 * Dark closing section on project pages: the following project (wrapping at the
 * end) as a large title and cover, then a link to all projects. With a mouse,
 * hovering grows the cover and swaps the cursor for a "View project" pill.
 */
export function NextCase({ currentId, onNavigate }: NextCaseProps) {
  const position = projects.findIndex((p) => p.id === currentId)
  const next = projects[(position + 1) % projects.length]

  const [hovering, setHovering] = useState(false)
  const [followCursor, setFollowCursor] = useState(false)
  const pillRef = useRef<HTMLSpanElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  // The pill replaces the cursor only for a mouse, and not under reduced motion
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setFollowCursor(query.matches)
    update()
    query.addEventListener('change', update)
    return () => {
      query.removeEventListener('change', update)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  if (!next || next.id === currentId) return null

  const place = (x: number, y: number) => {
    current.current = { x, y }
    if (pillRef.current) pillRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
  }

  const follow = () => {
    const { x, y } = current.current
    const dx = target.current.x - x
    const dy = target.current.y - y
    place(x + dx * followEase, y + dy * followEase)
    frame.current = Math.abs(dx) + Math.abs(dy) > 0.5 ? requestAnimationFrame(follow) : 0
  }

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    target.current = { x: e.clientX, y: e.clientY }
    place(e.clientX, e.clientY)
    setHovering(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!followCursor || e.pointerType !== 'mouse') return
    target.current = { x: e.clientX, y: e.clientY }
    if (!frame.current) frame.current = requestAnimationFrame(follow)
  }

  const goToProjects = inAppClick(() => onNavigate('projects'))

  return (
    <section aria-labelledby="next-case-label" className="relative isolate mt-cs-section overflow-x-clip bg-bg-inverse text-text-inverse">
      {/* Soft curved top edge, like a rising surface */}
      <div aria-hidden className="absolute -left-[10%] -top-12 -z-10 h-24 w-[120%] rounded-[50%] bg-bg-inverse md:-top-20 md:h-40" />

      {/* 80% of the viewport on desktop, with a floor for short screens; phones stack and size to content */}
      <Container className="flex flex-col pb-10 pt-8 md:h-[80svh] md:min-h-[34rem] md:pb-12 md:pt-4">
        <a
          href={projectHref(next.id)}
          onClick={inAppClick(() => onNavigate('project', next.id))}
          onPointerEnter={onPointerEnter}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHovering(false)}
          className={`group grid flex-1 items-center gap-10 rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-2 md:gap-16 ${followCursor ? 'cursor-none' : ''}`}
        >
          <span className="block">
            <span id="next-case-label" className="block text-sm text-white/55">Next project</span>
            <h2 className="mt-4 text-[clamp(2.5rem,1.6rem+3.2vw,4.5rem)] font-semibold leading-[1.05] tracking-tight transition-opacity duration-300 group-hover:opacity-60 motion-reduce:transition-none">
              {next.title}
            </h2>
            <span className="mt-5 block max-w-md text-base leading-relaxed text-white/60">{next.subtitle}</span>
          </span>

          <span className="block overflow-hidden rounded-2xl bg-white/5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <img
              src={coverUrl(next.image.unsplashId)}
              alt={next.image.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:max-h-[calc(80svh-14rem)]"
            />
          </span>
        </a>

        <div className="mt-10 flex border-t border-white/15 pt-8 md:mt-8">
          <a
            href="/projects"
            onClick={goToProjects}
            className="inline-flex h-12 items-center rounded-full border border-white/25 pl-7 pr-6 text-base font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          >
            All projects
            <sup aria-hidden className="-mt-3 ml-1 text-xs font-normal tabular-nums opacity-60">{projects.length}</sup>
          </a>
        </div>
      </Container>

      {/* Cursor pill: follows the pointer over the next project, never takes clicks */}
      {followCursor && (
        <span
          ref={pillRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
        >
          <span
            className={`flex size-28 items-center justify-center rounded-full bg-white text-sm font-medium text-text-primary shadow-xl transition-[opacity,scale] duration-300 ease-out ${
              hovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            View project
          </span>
        </span>
      )}
    </section>
  )
}
