interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

/** Small mono section label with a leading dot. */
export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-focus ${className}`}>
      <span className="size-1.5 rounded-full bg-focus" />
      {children}
    </p>
  )
}
