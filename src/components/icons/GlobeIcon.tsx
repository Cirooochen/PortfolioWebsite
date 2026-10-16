interface GlobeIconProps {
  className?: string
}

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Outline globe that appears to spin: two meridians sweep across the face,
 * half a turn apart. Static when the viewer prefers reduced motion.
 */
export function GlobeIcon({ className = '' }: GlobeIconProps) {
  const meridian = (begin: string) => (
    <ellipse cx="12" cy="12" rx="4" ry="9">
      {!reducedMotion && (
        <animate
          attributeName="rx"
          values="9;0;9"
          dur="4s"
          begin={begin}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
        />
      )}
    </ellipse>
  )

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      {meridian('0s')}
      {meridian('-2s')}
    </svg>
  )
}
