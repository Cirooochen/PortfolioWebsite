interface ViewToggleOption<T extends string> {
  value: T
  /** Accessible name and tooltip; the button itself shows only the icon */
  label: string
  icon: React.ReactNode
}

interface ViewToggleProps<T extends string> {
  label: string
  options: ViewToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/**
 * Round icon buttons for switching between views of the same content. Each
 * option is a toggle button, so the active one is announced as pressed and
 * focus stays put when the view changes.
 */
export function ViewToggle<T extends string>({ label, options, value, onChange, className = '' }: ViewToggleProps<T>) {
  return (
    <div role="group" aria-label={label} className={`flex gap-2 ${className}`}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={`flex size-11 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none md:size-14 ${
              active
                ? 'border-bg-inverse bg-bg-inverse text-text-inverse'
                : 'border-border-primary text-text-secondary hover:border-text-primary hover:text-text-primary'
            }`}
          >
            <span aria-hidden className="flex">{option.icon}</span>
          </button>
        )
      })}
    </div>
  )
}
