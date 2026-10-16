type TagVariant = 'default' | 'glass'

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  /** Adds a pulsing dot, for live states like "Currently working" */
  live?: boolean
  className?: string
}

const variantStyles: Record<TagVariant, string> = {
  default: 'bg-bg-tertiary text-text-secondary',
  glass: 'border border-white/60 bg-white/60 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md',
}

export function Tag({ children, variant = 'default', live = false, className = '' }: TagProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {live && <span className="size-1.5 rounded-full bg-text-primary animate-pulse-dot" />}
      {children}
    </span>
  )
}
