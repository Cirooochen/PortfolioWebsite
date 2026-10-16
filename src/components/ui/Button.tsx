import { glassHover, glassRest } from './glass'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
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

// Transparent at rest; frosted glass that lifts on hover
const variantStyles: Record<ButtonVariant, string> = {
  primary: `bg-transparent border border-black/[0.18] text-text-primary ${glassHover}`,
  secondary: `${glassRest} text-text-primary ${glassHover}`,
  ghost: `border border-transparent bg-transparent text-text-secondary hover:text-text-primary ${glassHover}`,
  // Text only, like the current nav link: 2px underline, bold on hover
  link: 'text-text-primary underline decoration-2 underline-offset-[6px] hover:font-semibold',
}

const textSizes: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddings: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-2.5',
  lg: 'px-8 py-3',
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
  const isLink = variant === 'link'
  const shape = isLink
    ? 'py-1'
    : `rounded-xl ${paddings[size]} hover:-translate-y-px active:translate-y-0 active:scale-[0.98]`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${textSizes[size]} ${shape} ${className}`}
    >
      {isLink && typeof children === 'string' ? (
        // A hidden bold copy reserves width so the hover weight doesn't shift layout
        <span className="grid">
          <span className="col-start-1 row-start-1">{children}</span>
          <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold no-underline">
            {children}
          </span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
