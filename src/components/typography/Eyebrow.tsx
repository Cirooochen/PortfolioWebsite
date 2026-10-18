interface EyebrowProps {
  children: React.ReactNode
  /** Replaces the leading dot, e.g. an emoji */
  icon?: React.ReactNode
  className?: string
}

/** Small mono section label with a leading dot, or a leading icon. */
export function Eyebrow({ children, icon, className = '' }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-focus ${className}`}>
      {icon ? (
        <span aria-hidden className="text-base leading-none tracking-normal">{icon}</span>
      ) : (
        <span className="size-1.5 rounded-full bg-focus" />
      )}
      {children}
    </p>
  )
}
