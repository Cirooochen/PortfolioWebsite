import { MediaFigure } from './MediaFigure'
import type { CaseStudyMedia } from '../../types'

interface MediaOnlyProps {
  media: CaseStudyMedia[]
}

const gridStyles: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
}

/** Block type C: one media item at full content width, or a 2–3 item grid. */
export function MediaOnly({ media }: MediaOnlyProps) {
  if (media.length === 1) return <MediaFigure media={media[0]} />

  return (
    <div className={`grid gap-6 ${gridStyles[media.length]}`}>
      {media.map((item) => (
        <MediaFigure key={item.src} media={item} aspect="standard" />
      ))}
    </div>
  )
}
