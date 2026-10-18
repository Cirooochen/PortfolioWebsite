import type { CaseStudyMedia } from '../types'

/** Placeholder photo from Unsplash, sized for full content width. */
export function unsplash(id: string, alt: string, caption?: string): CaseStudyMedia {
  return {
    kind: 'image',
    src: `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`,
    alt,
    caption,
  }
}
