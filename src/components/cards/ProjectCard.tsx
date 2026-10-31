import { useRef } from 'react'
import { Tag } from '../ui/Tag'
import { inAppClick, projectHref } from '../../hooks/useRouteState'
import { imageUrl, isLocalImage } from '../../data/media'
import type { CaseStudyEmphasis, Project } from '../../types'

interface ProjectCardProps {
  project: Project
  /** Overrides the project's own emphasis, e.g. equal cards on the Projects page */
  emphasis?: CaseStudyEmphasis
  onOpen: () => void
  className?: string
}

const aspectStyles: Record<CaseStudyEmphasis, string> = {
  feature: 'aspect-[4/3] md:aspect-[21/9]',
  standard: 'aspect-[4/3]',
  compact: 'aspect-[4/5]',
}

const titleStyles: Record<CaseStudyEmphasis, string> = {
  feature: 'text-2xl md:text-3xl',
  standard: 'text-xl md:text-2xl',
  compact: 'text-xl',
}

const imageWidths: Record<CaseStudyEmphasis, number[]> = {
  feature: [960, 1600, 2400, 3200],
  standard: [800, 1200, 1600, 2000],
  compact: [640, 960, 1280, 1600],
}

const imageSizes: Record<CaseStudyEmphasis, string> = {
  feature: '(min-width: 1152px) 1088px, 100vw',
  standard: '(min-width: 768px) 58vw, 100vw',
  compact: '(min-width: 768px) 42vw, 100vw',
}

/**
 * Project card. Images rest in greyscale; on hover they slowly zoom and
 * bloom into colour while a soft light follows the cursor.
 */
export function ProjectCard({ project, emphasis = project.emphasis ?? 'standard', onOpen, className = '' }: ProjectCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const widths = imageWidths[emphasis]
  const { src } = project.image

  const onPointerMove = (e: React.PointerEvent) => {
    const media = mediaRef.current
    if (!media) return
    const rect = media.getBoundingClientRect()
    media.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    media.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <article
      onPointerMove={onPointerMove}
      className={`group relative cursor-pointer rounded-2xl has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-focus ${className}`}
    >
      <div
        ref={mediaRef}
        className={`relative overflow-hidden rounded-2xl bg-bg-tertiary ${aspectStyles[emphasis]}`}
      >
        <img
          src={imageUrl(src, widths[1])}
          // Local images come in one size; Unsplash serves any width
          srcSet={isLocalImage(src) ? undefined : widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ')}
          sizes={isLocalImage(src) ? undefined : imageSizes[emphasis]}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover grayscale transition-[filter,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.55), transparent 45%)',
          }}
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-5 md:top-5">
          {project.current && (
            <Tag variant="glass" live>
              Currently working
            </Tag>
          )}
          {project.tags.map((tag) => (
            <Tag key={tag} variant="glass">
              {tag}
            </Tag>
          ))}
        </div>

        <span className="absolute bottom-4 right-4 flex size-11 translate-y-2 items-center justify-center rounded-full border border-white/60 bg-white/70 text-text-primary opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:right-5">
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className={`font-semibold tracking-tight text-text-primary ${titleStyles[emphasis]}`}>
            {/* Stretched over the whole card so the entire card is clickable */}
            <a href={projectHref(project.id)} onClick={inAppClick(onOpen)} className="outline-none after:absolute after:inset-0">
              {project.title}
            </a>
          </h3>
          <p className="mt-1.5 max-w-xl leading-relaxed text-text-secondary">{project.subtitle}</p>
        </div>
        <span className="shrink-0 pt-1 font-mono text-sm text-text-tertiary">{project.year}</span>
      </div>
    </article>
  )
}
