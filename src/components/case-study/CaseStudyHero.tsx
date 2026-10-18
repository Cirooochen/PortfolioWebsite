import { useEffect, useRef } from 'react'

interface CaseStudyHeroProps {
  title: string
  oneLiner: string
  year: string
  /** Shows a live "In progress" status next to the year */
  current?: boolean
  onBack: () => void
  /** Where the back link leads, e.g. "Selected work" */
  backLabel?: string
  /** Kicker before the year */
  kind?: string
  /** Shorter hero that lets the work start on the first screen */
  compact?: boolean
  /** Project metadata, pinned to the bottom of the hero */
  children?: React.ReactNode
}

// Entrance timing (ms): words rise one after another, then the rest settles in
const wordStagger = 70
const titleStart = 150

/**
 * Typography-only hero that fills the first screen: the title rises in word
 * by word, an accent rule draws beneath it, and the summary follows. While
 * scrolling away, the title block drifts up and fades slightly.
 */
export function CaseStudyHero({
  title,
  oneLiner,
  year,
  current = false,
  onBack,
  backLabel = 'Selected work',
  kind = 'Case study',
  compact = false,
  children,
}: CaseStudyHeroProps) {
  const introRef = useRef<HTMLDivElement>(null)
  const words = title.split(' ')
  const afterTitle = titleStart + words.length * wordStagger + 250

  useEffect(() => {
    const intro = introRef.current
    if (!intro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)))
      intro.style.transform = `translateY(${progress * -40}px)`
      intro.style.opacity = String(1 - progress * 0.5)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={`flex flex-col pb-12 pt-10 md:pb-16 md:pt-14 ${compact ? '' : 'min-h-[calc(100svh-4rem)]'}`}>
      <button
        type="button"
        onClick={onBack}
        className="cs-intro group inline-flex items-center gap-2 self-start text-cs-label font-medium uppercase text-cs-muted transition-colors duration-200 hover:text-cs-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-accent"
      >
        <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
        {backLabel}
      </button>

      <div ref={introRef} className={`flex flex-1 flex-col justify-center will-change-transform ${compact ? 'py-14 md:py-16' : 'py-20 md:py-24'}`}>
        <p className="cs-intro mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-cs-label font-medium uppercase text-cs-muted">
          <span>{kind} · {year}</span>
          {current && (
            <span className="flex items-center gap-2 text-cs-accent">
              <span className="size-1.5 rounded-full bg-cs-accent animate-pulse-dot" />
              In progress
            </span>
          )}
        </p>

        <h1 aria-label={title} className="max-w-[16ch] text-cs-display font-semibold text-cs-ink">
          {words.map((word, i) => (
            <span key={i} aria-hidden>
              {/* Each word slides up from behind its own mask */}
              <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                <span className="cs-word" style={{ '--delay': `${titleStart + i * wordStagger}ms` } as React.CSSProperties}>
                  {word}
                </span>
              </span>
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <span
          aria-hidden
          className="cs-draw mt-10 block h-px w-16 bg-cs-accent"
          style={{ '--delay': `${afterTitle}ms` } as React.CSSProperties}
        />

        <p
          className="cs-intro mt-10 max-w-[30ch] text-cs-lead text-cs-ink"
          style={{ '--delay': `${afterTitle + 80}ms` } as React.CSSProperties}
        >
          {oneLiner}
        </p>
      </div>

      {children && (
        <div className="cs-intro" style={{ '--delay': `${afterTitle + 250}ms` } as React.CSSProperties}>
          {children}
        </div>
      )}
    </header>
  )
}
