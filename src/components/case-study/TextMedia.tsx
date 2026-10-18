import { BlockTitle, Prose } from './Prose'
import { MediaFigure, type MediaAspect } from './MediaFigure'
import type { CaseStudyMedia, RichText } from '../../types'

interface TextMediaProps {
  title?: string
  description: RichText
  media: CaseStudyMedia
  layout?: 'side' | 'stacked'
  mediaFirst?: boolean
  aspect?: Extract<MediaAspect, 'portrait' | 'square'>
  headingLevel: 2 | 3 | 4
}

/** Block type A: text beside media on desktop, or above it; always stacked on mobile. */
export function TextMedia({ title, description, media, layout = 'side', mediaFirst = false, aspect, headingLevel }: TextMediaProps) {
  const text = (
    <div>
      {title && <BlockTitle level={headingLevel}>{title}</BlockTitle>}
      <Prose>{description}</Prose>
    </div>
  )

  if (layout === 'stacked') {
    return (
      <div className="space-y-8">
        {text}
        <MediaFigure media={media} />
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-5 md:items-center md:gap-12">
      {/* Tall media takes the narrow column so it doesn't tower over the text */}
      <div className={`${aspect ? 'md:col-span-3' : 'md:col-span-2'} ${mediaFirst ? 'md:order-2' : ''}`}>{text}</div>
      <MediaFigure
        media={media}
        aspect={aspect ?? 'standard'}
        className={`${aspect ? 'md:col-span-2' : 'md:col-span-3'} ${mediaFirst ? 'md:order-1' : ''}`}
      />
    </div>
  )
}
