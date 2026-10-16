import { useEffect, useRef } from 'react'
import { gsap } from '../../hooks/useGsap'
import type { TextSegment } from '../../types'

interface SurfacingTextProps {
  segments: TextSegment[]
  as?: 'p' | 'h2' | 'h3'
  className?: string
}

/**
 * Text whose words surface as you scroll: each one rises out of a blur and
 * darkens from pale to ink, like coming up through the hero's water.
 * Emphasised phrases get an underline that turns into a drifting wave on hover.
 */
export function SurfacingText({ segments, as: Tag = 'p', className = '' }: SurfacingTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-unit]'),
        { opacity: 0.12, filter: 'blur(6px)', y: '0.3em' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 78%', scrub: 0.6 },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [segments])

  return (
    <Tag ref={ref} className={className}>
      {segments.map((segment, i) => {
        if (typeof segment !== 'string') {
          // Stays inline so long phrases can wrap; surfaces as one unit
          return (
            <span key={i} data-unit className="wave-underline text-text-primary">
              {segment.text}
            </span>
          )
        }
        return segment.split(/(\s+)/).map((word, j) =>
          /^\s*$/.test(word) ? (
            word
          ) : (
            <span key={`${i}-${j}`} data-unit className="inline-block">
              {word}
            </span>
          ),
        )
      })}
    </Tag>
  )
}
