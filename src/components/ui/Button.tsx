type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-text-inverse hover:bg-accent-hover shadow-sm',
  secondary: 'bg-bg-primary text-text-primary border border-border-primary hover:bg-bg-tertiary',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-[var(--transition-fast)] disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  )
}
