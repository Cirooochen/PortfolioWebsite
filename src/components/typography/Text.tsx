type TextSize = 'sm' | 'base' | 'lg'

interface TextProps {
  children: React.ReactNode
  size?: TextSize
  muted?: boolean
  className?: string
}

const sizeStyles: Record<TextSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
}

export function Text({ children, size = 'base', muted = false, className = '' }: TextProps) {
  return (
    <p className={`leading-relaxed ${sizeStyles[size]} ${muted ? 'text-text-secondary' : 'text-text-primary'} ${className}`}>
      {children}
    </p>
  )
}
