import { SectionHeader } from './SectionHeader'
import { BlockList } from './BlockList'
import { Prose } from './Prose'
import type { CaseStudyBlock, CaseStudySubsection, RichText } from '../../types'

interface CaseStudySectionProps {
  id: string
  index: number
  label: string
  title: string
  description?: RichText
  blocks?: CaseStudyBlock[]
  subsections?: CaseStudySubsection[]
  /** Extra content after the description, e.g. result stats */
  children?: React.ReactNode
}

/** One numbered page section: header, description, then blocks and sub-sections. */
export function CaseStudySection({ id, index, label, title, description, blocks, subsections, children }: CaseStudySectionProps) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId} className="pt-cs-section">
      <SectionHeader index={index} label={label} title={title} titleId={titleId} />
      {description && (
        <div data-reveal className="mt-8">
          <Prose>{description}</Prose>
        </div>
      )}
      {children}
      {blocks && blocks.length > 0 && <BlockList blocks={blocks} headingLevel={3} className="mt-cs-block" />}
      {subsections?.map((subsection) => (
        <div key={subsection.title} className="mt-cs-block">
          <h3 data-reveal className="mb-4 text-cs-subtitle font-semibold text-cs-ink">
            {subsection.title}
          </h3>
          {subsection.description && (
            <div data-reveal>
              <Prose>{subsection.description}</Prose>
            </div>
          )}
          {subsection.blocks && subsection.blocks.length > 0 && (
            <BlockList blocks={subsection.blocks} headingLevel={4} className="mt-10" />
          )}
        </div>
      ))}
    </section>
  )
}
