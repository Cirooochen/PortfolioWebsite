type HeadingLevel = 1 | 2 | 3 | 4

interface HeadingProps {
  level?: HeadingLevel
  children: React.ReactNode
  className?: string
}

const styles: Record<HeadingLevel, string> = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  2: 'text-3xl md:text-4xl font-bold tracking-tight',
  3: 'text-xl md:text-2xl font-semibold',
  4: 'text-lg font-semibold',
}

export function Heading({ level = 1, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag className={`text-text-primary ${styles[level]} ${className}`}>
      {children}
    </Tag>
  )
}
