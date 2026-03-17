interface DividerProps {
  className?: string
}

export function Divider({ className = '' }: DividerProps) {
  return <hr className={`border-border-primary ${className}`} />
}
