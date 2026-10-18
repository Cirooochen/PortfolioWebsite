import { TextMedia } from './TextMedia'
import { TextOnly } from './TextOnly'
import { MediaOnly } from './MediaOnly'
import type { CaseStudyBlock } from '../../types'

interface BlockListProps {
  blocks: CaseStudyBlock[]
  headingLevel: 2 | 3 | 4
  className?: string
}

/** Renders a section's blocks in order, each fading in as it enters the viewport. */
export function BlockList({ blocks, headingLevel, className = '' }: BlockListProps) {
  return (
    <div className={`space-y-cs-block ${className}`}>
      {blocks.map((block, i) => (
        <div key={i} data-reveal>
          {block.type === 'textMedia' && <TextMedia {...block} headingLevel={headingLevel} />}
          {block.type === 'textOnly' && <TextOnly {...block} headingLevel={headingLevel} />}
          {block.type === 'mediaOnly' && <MediaOnly media={block.media} />}
        </div>
      ))}
    </div>
  )
}
