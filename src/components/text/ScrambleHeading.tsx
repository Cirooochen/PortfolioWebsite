import { useEffect, useRef } from 'react'
import { gsap, SCRAMBLE_CHARS_UPPER } from './scramble'

interface ScrambleHeadingProps {
  children: string
  as?: 'h2' | 'h3'
  className?: string
}

/**
 * Big section title that decodes out of random letters once, when its top
 * reaches the middle of the viewport.
 */
export function ScrambleHeading({ children, as: Tag = 'h2', className = '' }: ScrambleHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(el.querySelector('[data-scramble]'), {
        duration: 0.6,
        ease: 'none',
        // Low speed: glyphs swap less often, so the title flickers instead of churning
        scrambleText: { text: children, chars: SCRAMBLE_CHARS_UPPER, speed: 0.3, revealDelay: 0.1 },
        scrollTrigger: { trigger: el, start: 'top 50%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [children])

  return (
    <Tag
      ref={ref}
      aria-label={children}
      className={`text-5xl font-bold leading-[0.95] tracking-tighter text-text-primary md:text-7xl lg:text-8xl ${className}`}
    >
      <span data-scramble aria-hidden>
        {children}
      </span>
    </Tag>
  )
}
