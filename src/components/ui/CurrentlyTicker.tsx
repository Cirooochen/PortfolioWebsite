import { useEffect, useRef, useState } from 'react'
import { gsap, SCRAMBLE_CHARS } from '../text/scramble'

const items = [
  { emoji: '📚', text: 'Read Create - Rick Rubin' },
  { emoji: '🎺', text: 'Practice Trumpet' },
  { emoji: '🎥', text: 'Watching Cowboy Bebop' },
]

const SCRAMBLE_DURATION = 1.1
// Time between switches, scramble included
const CYCLE_MS = 4200

interface CurrentlyTickerProps {
  /** Stops cycling, e.g. while the label is hidden */
  paused?: boolean
  className?: string
}

/**
 * "Currently:" label that cycles through what I'm up to. Each new entry
 * decodes out of random letters and digits; the emoji just swaps.
 */
export function CurrentlyTicker({ paused = false, className = '' }: CurrentlyTickerProps) {
  const [index, setIndex] = useState(0)
  const textRef = useRef<HTMLSpanElement>(null)
  const emojiRef = useRef<HTMLSpanElement>(null)
  const item = items[index]

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [index, paused])

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline()
    tl.fromTo(emojiRef.current, { opacity: 0, y: '0.3em' }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    if (reduced) {
      el.textContent = item.text
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
    } else {
      tl.to(
        el,
        {
          duration: SCRAMBLE_DURATION,
          ease: 'none',
          scrambleText: { text: item.text, chars: SCRAMBLE_CHARS, speed: 0.5, revealDelay: 0.25 },
        },
        0,
      )
    }
    return () => {
      tl.kill()
    }
  }, [item])

  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${className}`}>
      <span className="size-1.5 shrink-0 rounded-full bg-focus animate-pulse-dot" />
      <span className="text-text-tertiary">Currently:</span>
      <span className="font-medium text-text-primary" aria-live="polite">
        <span className="sr-only">{item.text}</span>
        <span aria-hidden>
          <span ref={emojiRef} className="mr-1.5 inline-block">
            {item.emoji}
          </span>
          {/* Filled by GSAP; React never re-renders its text */}
          <span ref={textRef} />
        </span>
      </span>
    </span>
  )
}
