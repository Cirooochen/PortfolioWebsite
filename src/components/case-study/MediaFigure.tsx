import type { CaseStudyMedia } from '../../types'

export type MediaAspect = 'wide' | 'standard' | 'portrait' | 'square'

const aspectStyles: Record<MediaAspect, string> = {
  wide: 'aspect-[16/9]',
  standard: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
}

interface MediaFigureProps {
  media: CaseStudyMedia
  aspect?: MediaAspect
  className?: string
}

/** Image or video at a fixed aspect ratio, or its own shape when `natural`, with an optional caption. */
export function MediaFigure({ media, aspect = 'wide', className = '' }: MediaFigureProps) {
  const frame = media.natural ? 'block h-auto w-full' : 'size-full object-cover'

  return (
    <figure className={className}>
      <div className={`overflow-hidden rounded-cs bg-cs-rule ${media.natural ? '' : aspectStyles[aspect]}`}>
        {media.kind === 'video' ? (
          <video
            src={media.src}
            poster={media.poster}
            aria-label={media.alt}
            controls
            muted
            playsInline
            preload="metadata"
            className={frame}
          />
        ) : (
          <img src={media.src} alt={media.alt} loading="lazy" decoding="async" className={frame} />
        )}
      </div>
      {media.caption && (
        <figcaption className="mt-3 max-w-cs-read text-cs-caption text-cs-muted">{media.caption}</figcaption>
      )}
    </figure>
  )
}
