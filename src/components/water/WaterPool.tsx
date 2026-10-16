import { useRef } from 'react'
import { useWaterSurface } from '../../hooks/useWaterSurface'
import { WATER_DEFAULTS } from './waterSurface'

interface WaterPoolProps {
  children: React.ReactNode
}

/**
 * Plain water surface (no text) behind its children: a call-back to the hero.
 * The top edge fades into the page so the water seems to rise into view.
 */
export function WaterPool({ children }: WaterPoolProps) {
  const poolRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { supported } = useWaterSurface({
    canvasRef,
    stageRef: poolRef,
    observeRef: poolRef,
    surface: WATER_DEFAULTS,
  })

  return (
    <div ref={poolRef} className="relative isolate">
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_bottom,transparent,black_35%)] ${supported ? '' : 'hidden'}`}
      />
      {children}
    </div>
  )
}
