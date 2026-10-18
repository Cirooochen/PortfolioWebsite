import { useEffect, useState } from 'react'

/**
 * True once the bottom of the page's hero (the first element matching
 * `selector`, [data-hero] by default) has scrolled up to `threshold` (a
 * fraction of the viewport height) from the top. Pages without one count as
 * already passed.
 */
export function useHeroPassed(threshold: number, resetKey?: unknown, selector = '[data-hero]') {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(selector)
      setPassed(!hero || hero.getBoundingClientRect().bottom <= window.innerHeight * threshold)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [threshold, resetKey, selector])

  return passed
}
