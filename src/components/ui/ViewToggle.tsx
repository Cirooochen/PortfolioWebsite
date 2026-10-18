interface ViewToggleOption<T extends string> {
  value: T
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
 * Segmented control for switching between views of the same content. Each
 * option is a toggle button, so the active one is announced as pressed and
 * focus stays put when the view changes.
 */
export function ViewToggle<T extends string>({ label, options, value, onChange, className = '' }: ViewToggleProps<T>) {
  return (
    <div role="group" aria-label={label} className={`inline-flex rounded-full border border-border-primary p-1 ${className}`}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none ${
              active ? 'bg-bg-inverse text-text-inverse' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span aria-hidden className="flex">{option.icon}</span>
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
