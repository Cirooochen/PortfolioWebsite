export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ShowcaseItem {
  id: string
  title: string
  /** Describes what the image or video shows */
  alt: string
  src: string
  /** Still frame for videos, shown before playback and under reduced motion */
  poster?: string
  type: 'image' | 'video'
  /** 'large' is the one highlighted piece; the rest mix sizes around it */
  span: 'normal' | 'wide' | 'tall' | 'large'
}

export type Page = 'home' | 'projects' | 'project'

/** `projectId` is required when navigating to the 'project' page. */
export type NavigateFn = (page: Page, projectId?: string) => void

/** How strongly a featured project is shown; drives its card size on Home. */
export type CaseStudyEmphasis = 'feature' | 'standard' | 'compact'

/**
 * Which detail page a project gets: a full narrative case study, or a
 * visual showcase built around images and video.
 */
export type ProjectTemplate = 'case-study' | 'showcase'

/** Kind of work, used by the Projects page filter. A project can be both. */
export type ProjectCategory = 'ui-ux' | 'development'

/** One entry in the collection; shared by Home, both Projects views and the detail pages. */
export interface Project {
  id: string
  title: string
  subtitle: string
  year: string
  template: ProjectTemplate
  /** One of the three projects on Home; must use the case study template */
  featured?: boolean
  /** Card size on Home; featured projects only */
  emphasis?: CaseStudyEmphasis
  /** Area of work, e.g. "Fintech · Product design" */
  discipline: string
  role: string
  tags: string[]
  categories: ProjectCategory[]
  /** Shows a live "Currently working" tag */
  current?: boolean
  image: {
    /** Unsplash photo id, e.g. "1532601224476-15c79f2f7a51" */
    unsplashId: string
    alt: string
  }
  /** 3–5 Unsplash photo ids cycled in the list view's hover preview */
  previewImages: string[]
}

/** Plain text, or a phrase highlighted with an interactive underline. */
export type TextSegment = string | { text: string; emphasis: true }

/* Case study detail pages — see docs/case-study-design-spec.md */

/** A single paragraph, or several. */
export type RichText = string | string[]

export interface CaseStudyMedia {
  kind: 'image' | 'video'
  src: string
  alt: string
  /** Poster frame for videos */
  poster?: string
  caption?: string
}

export type CaseStudyBlock =
  | {
      type: 'textMedia'
      title?: string
      description: RichText
      media: CaseStudyMedia
      /** 'side' (default) sits next to the text on desktop; 'stacked' sits below it */
      layout?: 'side' | 'stacked'
      /** Puts the media on the left in the side layout */
      mediaFirst?: boolean
      /** Taller frame in the narrow column, for people or illustrations; side layout only */
      aspect?: 'portrait' | 'square'
    }
  | { type: 'textOnly'; title?: string; description: RichText }
  | {
      type: 'mediaOnly'
      media: [CaseStudyMedia] | [CaseStudyMedia, CaseStudyMedia] | [CaseStudyMedia, CaseStudyMedia, CaseStudyMedia]
    }

export interface CaseStudySectionContent {
  /** Small label shown above the title; defaults to the section kind */
  label?: string
  title: string
  description?: RichText
  blocks?: CaseStudyBlock[]
}

/** Freely named step inside a key work section, e.g. Research or Final design. */
export interface CaseStudySubsection {
  title: string
  description?: RichText
  blocks?: CaseStudyBlock[]
}

export interface CaseStudyKeyWork extends CaseStudySectionContent {
  subsections?: CaseStudySubsection[]
}

export interface CaseStudyStat {
  value: string
  label: string
}

export interface CaseStudyResults extends CaseStudySectionContent {
  stats: CaseStudyStat[]
}

/** Typography only, no media. */
export interface CaseStudySummary {
  label?: string
  title: string
  description: RichText
  takeaways?: { title: string; description: string }[]
}

export interface CaseStudyMeta {
  label: string
  /** A list renders one entry per line, e.g. team members or tools */
  value: string | string[]
}

export interface CaseStudyDetail {
  /** Matches the `Project` id */
  id: string
  title: string
  oneLiner: string
  metadata: CaseStudyMeta[]
  background: CaseStudySectionContent
  challenge: CaseStudySectionContent
  persona?: CaseStudySectionContent
  keyWork: [CaseStudyKeyWork] | [CaseStudyKeyWork, CaseStudyKeyWork]
  results: CaseStudyResults
  summary: CaseStudySummary
}

/** A project told mostly through its media. */
export interface ShowcaseDetail {
  /** Matches the `Project` id */
  id: string
  title: string
  oneLiner: string
  metadata: CaseStudyMeta[]
  intro: RichText
  blocks: CaseStudyBlock[]
}
