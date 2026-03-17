interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`inline-block rounded-full bg-bg-tertiary px-3 py-1 text-xs font-medium text-text-secondary ${className}`}>
      {children}
    </span>
  )
}
