import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Refreshes ScrollTrigger after layout changes.
 * Call this in pages/components that change the scroll height.
 */
export function useScrollTriggerRefresh(deps: unknown[] = []) {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, deps)
}
