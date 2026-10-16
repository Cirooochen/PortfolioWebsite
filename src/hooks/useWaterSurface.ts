import { useEffect, useRef, useState } from 'react'
import { WaterSurface } from '../components/water/waterSurface'
import type { WaterSurfaceOptions } from '../components/water/waterSurface'

interface UseWaterSurfaceArgs {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  /** Element that receives pointer input (usually the canvas's container) */
  stageRef: React.RefObject<HTMLElement | null>
  /** Element whose visibility decides when to render */
  observeRef: React.RefObject<HTMLElement | null>
  /** Must be stable across renders, e.g. a module-level constant */
  surface: Omit<WaterSurfaceOptions, 'reducedMotion'>
}

/**
 * Mounts a WaterSurface on a canvas and wires up the shared interactions:
 * the light follows the pointer, movement leaves a faint trail, clicks ripple.
 * Renders only while `observeRef` is on screen.
 */
export function useWaterSurface({ canvasRef, stageRef, observeRef, surface }: UseWaterSurfaceArgs) {
  const waterRef = useRef<WaterSurface | null>(null)
  const [supported, setSupported] = useState(() => WaterSurface.isSupported())

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    const observed = observeRef.current
    if (!canvas || !stage || !observed) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let water: WaterSurface | null = null
    try {
      water = new WaterSurface(canvas, { ...surface, reducedMotion })
    } catch {
      // Shader or context setup failed: callers fall back to static content
      requestAnimationFrame(() => setSupported(false))
    }
    waterRef.current = water

    // Redraw any text once the web font is ready
    if (surface.text) {
      document.fonts?.load(`600 100px ${surface.fontFamily}`).then(() => water?.drawText()).catch(() => {})
    }

    let lastX = -1
    let lastY = -1
    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!water) return
      const { x, y } = toLocal(e)
      water.setPointer(x, y)
      if (!reducedMotion && lastX >= 0) {
        const speed = Math.hypot(x - lastX, y - lastY)
        if (speed > 0.002) water.addDrop(x, y, 0.012, Math.min(0.12, speed * 3))
      }
      lastX = x
      lastY = y
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!water || (e.target as HTMLElement).closest('button, a')) return
      const { x, y } = toLocal(e)
      water.addDrop(x, y, 0.014, 0.55)
    }
    const onPointerLeave = () => {
      lastX = -1
      lastY = -1
    }

    const resizeObserver = new ResizeObserver(() => water?.resize())
    resizeObserver.observe(canvas)

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) water?.start()
      else water?.stop()
    })
    visibility.observe(observed)

    const onContextLost = (e: Event) => {
      e.preventDefault()
      water?.stop()
      water = null
      waterRef.current = null
      setSupported(false)
    }

    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('webglcontextlost', onContextLost)

    return () => {
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      resizeObserver.disconnect()
      visibility.disconnect()
      water?.destroy()
      waterRef.current = null
    }
  }, [canvasRef, stageRef, observeRef, surface])

  return { waterRef, supported }
}
