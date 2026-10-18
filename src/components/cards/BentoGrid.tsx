import { useEffect, useRef } from 'react'
import type { ShowcaseItem } from '../../types'

interface BentoGridProps {
  items: ShowcaseItem[]
}

// Phones stack every piece at its own shape; from md up, pieces span a 3-column grid of 240px rows
const spanClasses: Record<ShowcaseItem['span'], string> = {
  normal: 'aspect-[3/2] md:aspect-auto',
  wide: 'aspect-[3/1] md:col-span-2 md:aspect-auto',
  tall: 'aspect-[18/25] md:row-span-2 md:aspect-auto',
  large: 'aspect-[36/25] md:col-span-2 md:row-span-2 md:aspect-auto',
}

/** Loops while on screen; holds on the poster frame under reduced motion. */
function ShowcaseVideo({ item }: { item: ShowcaseItem }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      aria-label={item.alt}
      className="size-full object-cover"
      loop
      muted
      playsInline
      preload="metadata"
    />
  )
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-3 md:auto-rows-[240px]">
      {items.map((item) => (
        <figure
          key={item.id}
          className={`group relative overflow-hidden rounded-xl border border-border-primary bg-bg-tertiary transition-shadow duration-[var(--transition-base)] hover:shadow-lg ${spanClasses[item.span]}`}
        >
          {item.type === 'video' ? (
            <ShowcaseVideo item={item} />
          ) : (
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="size-full object-cover" />
          )}
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/70 to-transparent px-4 py-3 text-sm font-medium text-white opacity-0 transition-opacity duration-[var(--transition-base)] group-hover:opacity-100">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
