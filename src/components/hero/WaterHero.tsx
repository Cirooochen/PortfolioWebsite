import { useEffect, useRef } from 'react'
import { Container } from '../layout/Container'
import { GlobeIcon } from '../icons/GlobeIcon'
import { Eyebrow } from '../typography/Eyebrow'
import { Text } from '../typography/Text'
import { Button } from '../ui/Button'
import { useWaterSurface } from '../../hooks/useWaterSurface'
import { WATER_DEFAULTS } from '../water/waterSurface'

const NAME = 'Ciro Chen'
const HERO_SURFACE = { ...WATER_DEFAULTS, text: NAME }

interface WaterHeroProps {
  onOpenChat: () => void
}

/**
 * Full-screen WebGL water surface with the name refracting underneath.
 * The hero is pinned until the water level reaches half the viewport, then
 * scrolls away as the water keeps rising and the name sinks out of view.
 * Marked with data-hero so the NavBar can track where it ends.
 */
export function WaterHero({ onOpenChat }: WaterHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const fallbackRef = useRef<HTMLHeadingElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const { waterRef, supported } = useWaterSurface({
    canvasRef,
    stageRef,
    observeRef: sectionRef,
    surface: HERO_SURFACE,
  })

  // Scroll progress drives the water level and fades the overlay copy
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      // One viewport of scroll fills the water. The section is pinned for the
      // first half, then scrolls away while the water keeps rising.
      const progress = Math.min(1, Math.max(0, -rect.top / window.innerHeight))
      waterRef.current?.setFill(progress)
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.2))
        overlayRef.current.style.transform = `translateY(${progress * 24}px)`
      }
      // The work note surfaces once the water has covered the name
      if (workRef.current) {
        const reveal = Math.min(1, Math.max(0, (progress - 0.55) / 0.25))
        workRef.current.style.opacity = String(reveal)
        workRef.current.style.transform = `translateY(${(1 - reveal) * 16}px)`
      }
      if (fallbackRef.current) {
        fallbackRef.current.style.opacity = String(1 - progress)
        fallbackRef.current.style.filter = `blur(${progress * 12}px)`
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [waterRef])

  return (
    <section ref={sectionRef} data-hero className="relative -mt-16 h-[150vh]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden bg-bg-secondary">
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`absolute inset-0 h-full w-full cursor-crosshair ${supported ? '' : 'hidden'}`}
        />

        <h1
          ref={fallbackRef}
          style={supported ? undefined : { color: WATER_DEFAULTS.ink }}
          className={
            supported
              ? 'sr-only'
              : 'absolute inset-x-0 top-[46%] -translate-y-1/2 text-center text-[clamp(2.8rem,11.2vw,9.8rem)] font-semibold leading-none tracking-[-0.04em]'
          }
        >
          {NAME}
        </h1>

        <div ref={overlayRef} className="pointer-events-none absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-3 py-1 text-xs font-medium text-text-primary">
                <GlobeIcon className="size-3.5" />
                Based in Berlin
              </span>
              <Eyebrow className="mb-3">Senior Product Designer</Eyebrow>
              <Text muted>
                Design systems, AI products, and interfaces that respect people's time.
              </Text>
            </div>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Button variant="link" size="lg" onClick={onOpenChat}>
                Talk to my AI
              </Button>
            </div>
          </Container>
        </div>

        <div
          ref={workRef}
          className="pointer-events-none absolute inset-x-0 top-[70%] -translate-y-1/2 opacity-0"
        >
          <Container className="flex justify-center">
            <div className="flex max-w-2xl items-start gap-3 md:gap-4">
              <span className="mt-0.5 shrink-0 text-text-primary md:mt-1">
                <svg
                  aria-hidden
                  className="size-6 md:size-8"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2.5" />
                  <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
                  <path d="M3 12.5h18" />
                  <path d="M12 11.5v2" />
                </svg>
              </span>
              <p className="text-xl leading-snug tracking-tight text-text-primary md:text-3xl">
                Currently working at <span className="font-semibold">SIV.AG</span>, crafting
                AI&#8209;powered B2B software for energy companies in the DACH region.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
