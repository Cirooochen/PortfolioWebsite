import { BlockTitle, Prose } from './Prose'
import type { RichText } from '../../types'

interface TextOnlyProps {
  title?: string
  description: RichText
  headingLevel: 2 | 3 | 4
}

/** Block type B: title and description in the reading column. */
export function TextOnly({ title, description, headingLevel }: TextOnlyProps) {
  return (
    <div>
      {title && <BlockTitle level={headingLevel}>{title}</BlockTitle>}
      <Prose>{description}</Prose>
    </div>
  )
}
