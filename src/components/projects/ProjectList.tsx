import { useEffect, useRef, useState } from 'react'
import { inAppClick, projectHref } from '../../hooks/useRouteState'
import { imageUrl } from '../../data/media'
import type { Project } from '../../types'

interface ProjectListProps {
  projects: Project[]
  onOpen: (id: string) => void
}

/** Time each preview image stays up, in ms */
const slideInterval = 500
/** How far the preview closes in on the pointer each frame (0–1); lower trails more */
const followEase = 0.2
/** Gap between the pointer and the preview's left edge, in px */
const pointerGap = 28
const viewportMargin = 16

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])
  return matches
}

interface PreviewCarouselProps {
  images: string[]
  width: number
  /** Cycles through the images; off shows the first one only */
  playing: boolean
}

/**
 * The project's images stacked in one frame, cutting to the next every
 * `slideInterval` ms in a loop. Remount (via `key`) to restart from the first.
 */
function PreviewCarousel({ images, width, playing }: PreviewCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!playing || images.length < 2) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % images.length), slideInterval)
    return () => window.clearInterval(timer)
  }, [playing, images.length])

  return (
    <>
      {images.map((ref, i) => (
        <img
          key={ref}
          src={imageUrl(ref, width)}
          alt=""
          decoding="async"
          className={`absolute inset-0 size-full object-cover ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </>
  )
}

/**
 * Interactive index of all projects: each row shows its title; the active row also
 * reveals a one-line description.
 *
 * - Pointer: hovering a row shows its image carousel, which trails the cursor and hides on leave.
 * - Keyboard: focusing a row's link shows the carousel beside that row; Escape hides it.
 * - Touch and narrow screens: each row has a Preview button that opens the carousel inline;
 *   tapping the row itself always opens the project.
 * - Reduced motion: the preview sits still beside the row and shows one image.
 */
export function ProjectList({ projects, onOpen }: ProjectListProps) {
  const [previewId, setPreviewId] = useState<string | null>(null)
  // Last previewed project, kept on screen while the preview fades out
  const [shownId, setShownId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const listRef = useRef<HTMLUListElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  // Where the preview is heading and where it is now, in viewport px
  const target = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  const shownProject = projects.find((p) => p.id === shownId)
  const followCursor = finePointer && !reducedMotion

  const place = (x: number, y: number) => {
    position.current = { x, y }
    if (floatRef.current) floatRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  // Beside the pointer, vertically centred on it; flips to the pointer's left when there's no room on the right
  const clampedTarget = (pointerX: number, y: number) => {
    const float = floatRef.current
    const w = float?.offsetWidth ?? 0
    const h = float?.offsetHeight ?? 0
    const right = pointerX + pointerGap
    const x = right + w > window.innerWidth - viewportMargin ? pointerX - pointerGap - w : right
    return {
      x: Math.max(viewportMargin, x),
      y: Math.max(viewportMargin, Math.min(y - h / 2, window.innerHeight - h - viewportMargin)),
    }
  }

  const follow = () => {
    const { x, y } = position.current
    const dx = target.current.x - x
    const dy = target.current.y - y
    place(x + dx * followEase, y + dy * followEase)
    frame.current = Math.abs(dx) + Math.abs(dy) > 0.5 ? requestAnimationFrame(follow) : 0
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onPointerMove = (e: React.PointerEvent) => {
    if (!followCursor || e.pointerType !== 'mouse') return
    target.current = clampedTarget(e.clientX, e.clientY)
    if (!frame.current) frame.current = requestAnimationFrame(follow)
  }

  // Right half of the row, clear of the title on the left and the year and arrow on the right
  const besideRow = (row: HTMLElement) => {
    const rect = row.getBoundingClientRect()
    return clampedTarget(rect.left + rect.width * 0.5 - pointerGap, rect.top + rect.height / 2)
  }

  const showForPointer = (id: string, e: React.PointerEvent<HTMLElement>) => {
    if (!finePointer || e.pointerType !== 'mouse') return
    if (!previewId) {
      // Appear right at the pointer instead of sliding in from the last spot
      const anchor = followCursor ? clampedTarget(e.clientX, e.clientY) : besideRow(e.currentTarget)
      target.current = anchor
      place(anchor.x, anchor.y)
    } else if (!followCursor) {
      const anchor = besideRow(e.currentTarget)
      place(anchor.x, anchor.y)
    }
    setPreviewId(id)
    setShownId(id)
  }

  const showForFocus = (id: string, e: React.FocusEvent<HTMLElement>) => {
    if (!finePointer || !(e.target as HTMLElement).matches(':focus-visible')) return
    const anchor = besideRow(e.currentTarget)
    target.current = anchor
    place(anchor.x, anchor.y)
    setPreviewId(id)
    setShownId(id)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Escape') return
    setPreviewId(null)
    if (expandedId) {
      const id = expandedId
      setExpandedId(null)
      listRef.current?.querySelector<HTMLElement>(`[data-preview-toggle="${id}"]`)?.focus()
    }
  }

  return (
    <>
      <ul
        ref={listRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setPreviewId(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPreviewId(null)
        }}
        onKeyDown={onKeyDown}
        className="group/list border-b border-border-primary"
      >
        {projects.map((project, i) => {
          const expanded = expandedId === project.id
          return (
            <li
              key={project.id}
              onPointerEnter={(e) => showForPointer(project.id, e)}
              onFocus={(e) => showForFocus(project.id, e)}
              className="group relative border-t border-border-primary transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-has-[li:hover]/list:opacity-45 [@media(hover:hover)]:hover:opacity-100!"
            >
              <div className="relative py-5 md:py-6">
                <a
                  href={projectHref(project.id)}
                  onClick={inAppClick(() => onOpen(project.id))}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[2.5rem_1fr_auto]"
                >
                  <span className="hidden font-mono text-sm tabular-nums text-text-tertiary sm:block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                    {project.title}
                  </span>
                  {/* Leaves room for the Preview button, which sits on the title line */}
                  <span className="mr-24 flex items-baseline gap-3 [@media(hover:hover)_and_(min-width:64rem)]:mr-0">
                    <span className="hidden font-mono text-sm tabular-nums text-text-tertiary sm:inline">{project.year}</span>
                    <span
                      aria-hidden
                      className="text-lg text-text-tertiary transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-text-primary group-has-focus-visible:text-text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </span>
                  {/* Description opens under the title while the row is hovered, keyboard-focused or previewed.
                      Full row width on phones; under the title from sm up */}
                  <span
                    className={`col-span-2 grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none sm:col-span-1 sm:col-start-2 ${
                      expanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 group-has-focus-visible:grid-rows-[1fr] group-has-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-xl pt-2 text-base leading-relaxed text-text-secondary">{project.subtitle}</span>
                    </span>
                  </span>
                </a>

                {/* Explicit preview for touch and narrow screens; hover and focus cover wide pointer screens */}
                <button
                  type="button"
                  data-preview-toggle={project.id}
                  aria-expanded={expanded}
                  aria-controls={`preview-${project.id}`}
                  onClick={() => setExpandedId(expanded ? null : project.id)}
                  className="absolute right-0 top-[15px] rounded-full border border-border-primary px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:top-[19px] [@media(hover:hover)_and_(min-width:64rem)]:hidden"
                >
                  {expanded ? 'Hide' : 'Preview'}
                  <span className="sr-only"> {project.title}</span>
                </button>
              </div>

              {/* Inline preview below the row */}
              <div id={`preview-${project.id}`} hidden={!expanded} aria-label={`${project.title} preview`} role="img">
                {expanded && (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-tertiary">
                    <PreviewCarousel images={project.previewImages} width={960} playing={!reducedMotion} />
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {/* Floating preview: trails the pointer, never takes clicks, hidden when no row is hovered */}
      {finePointer && (
        <div ref={floatRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 w-[min(22rem,40vw)] will-change-transform">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-tertiary shadow-xl transition-[opacity,scale] duration-200 ease-out motion-reduce:transition-none ${
              previewId ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {shownProject && (
              <PreviewCarousel
                key={shownProject.id}
                images={shownProject.previewImages}
                width={720}
                playing={!reducedMotion && previewId !== null}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
