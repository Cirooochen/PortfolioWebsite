import { useEffect } from 'react'

/**
 * Fades in `[data-reveal]` elements inside `root` as they scroll into view.
 * Only elements that start below the fold are hidden, so nothing flashes on
 * load and content stays visible if the observer never runs.
 */
export function useRevealOnScroll(root: React.RefObject<HTMLElement | null>, resetKey?: unknown) {
  useEffect(() => {
    const container = root.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'shown')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    container.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.dataset.reveal = 'hidden'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [root, resetKey])
}
