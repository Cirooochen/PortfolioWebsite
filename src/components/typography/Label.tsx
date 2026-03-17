interface LabelProps {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className = '' }: LabelProps) {
  return (
    <span className={`text-xs font-medium uppercase tracking-wider text-text-tertiary ${className}`}>
      {children}
    </span>
  )
}
