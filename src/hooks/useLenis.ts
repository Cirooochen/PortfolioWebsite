import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** The page's Lenis instance, e.g. to pause scrolling under an overlay. */
export const getLenis = () => instance

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    instance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      instance = null
    }
  }, [])
}
