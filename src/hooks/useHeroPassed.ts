import { useEffect, useState } from 'react'

/**
 * True once the bottom of the page's [data-hero] element has scrolled up to
 * `threshold` (a fraction of the viewport height) from the top. Pages without
 * a hero count as already passed.
 */
export function useHeroPassed(threshold: number, resetKey?: unknown) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-hero]')
      setPassed(!hero || hero.getBoundingClientRect().bottom <= window.innerHeight * threshold)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [threshold, resetKey])

  return passed
}
