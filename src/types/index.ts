export interface Project {
  id: string
  title: string
  description: string
  role: string
  duration: string
  year: string
  tags: string[]
  thumbnail: string
  overview: string
  challenge: string
  approach: string
  outcome: string
  metrics?: string[]
  images?: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ShowcaseItem {
  id: string
  title: string
  src: string
  type: 'image' | 'video' | 'gif'
  span: 'normal' | 'wide' | 'tall' | 'large'
}

export type Page = 'home' | 'projects'

/** How strongly a case study is featured; drives its card size. */
export type CaseStudyEmphasis = 'feature' | 'standard' | 'compact'

export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  year: string
  emphasis: CaseStudyEmphasis
  tags: string[]
  /** Shows a live "Currently working" tag */
  current?: boolean
  image: {
    /** Unsplash photo id, e.g. "1532601224476-15c79f2f7a51" */
    unsplashId: string
    alt: string
  }
}

/** Plain text, or a phrase highlighted with an interactive underline. */
export type TextSegment = string | { text: string; emphasis: true }
