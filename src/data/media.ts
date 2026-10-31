import type { CaseStudyMedia } from '../types'

/** Placeholder photo from Unsplash, sized for full content width. */
export function unsplash(id: string, alt: string, caption?: string): CaseStudyMedia {
  return {
    kind: 'image',
    src: imageUrl(id, 1600),
    alt,
    caption,
  }
}

/** Own image from `public/`. `natural` keeps its full shape, for diagrams and annotated screens. */
export function image(src: string, alt: string, caption?: string, natural?: boolean): CaseStudyMedia {
  return { kind: 'image', src, alt, caption, natural }
}

/** True for an image under `public/`, false for an Unsplash photo id. */
export function isLocalImage(ref: string) {
  return ref.startsWith('/')
}

/** Resolves a project image: local paths as they are, Unsplash ids at the given width. */
export function imageUrl(ref: string, width: number) {
  return isLocalImage(ref) ? ref : `https://images.unsplash.com/photo-${ref}?w=${width}&q=80&auto=format&fit=crop`
}
