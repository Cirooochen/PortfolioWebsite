import type { RichText } from '../../types'

interface ProseProps {
  children: RichText
  className?: string
}

/** Body copy at reading width; an array renders as separate paragraphs. */
export function Prose({ children, className = '' }: ProseProps) {
  const paragraphs = Array.isArray(children) ? children : [children]
  return (
    <div className={`space-y-5 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="max-w-cs-read text-cs-body text-cs-ink">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

interface BlockTitleProps {
  children: React.ReactNode
  /** h2 on a showcase page, h3 inside a section, h4 inside a sub-section */
  level: 2 | 3 | 4
}

/** Title of a content block: body size, set apart by weight. */
export function BlockTitle({ children, level }: BlockTitleProps) {
  const Tag = `h${level}` as const
  return <Tag className="mb-3 max-w-cs-read text-cs-body font-semibold text-cs-ink">{children}</Tag>
}
