interface FilterPillOption<T extends string> {
  value: T
  label: string
  /** Shown as a small superscript at the pill's top-right */
  count: number
}

interface FilterPillsProps<T extends string> {
  label: string
  options: FilterPillOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/**
 * Quick filter as a row of pill buttons, each with a count of what it
 * matches. Toggle buttons like ViewToggle, so the active one is announced
 * as pressed.
 */
export function FilterPills<T extends string>({ label, options, value, onChange, className = '' }: FilterPillsProps<T>) {
  return (
    <div role="group" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`flex h-11 items-center rounded-full border pl-4 pr-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none md:h-14 md:pl-7 md:pr-6 md:text-base ${
              active
                ? 'border-bg-inverse bg-bg-inverse text-text-inverse'
                : 'border-border-primary text-text-primary hover:border-text-primary'
            }`}
          >
            {option.label}
            <sup
              aria-hidden
              className={`-mt-2.5 ml-0.5 text-xs md:-mt-3 md:ml-1 font-normal tabular-nums ${active ? 'text-text-inverse/70' : 'text-text-tertiary'}`}
            >
              {option.count}
            </sup>
            <span className="sr-only">, {option.count} {option.count === 1 ? 'project' : 'projects'}</span>
          </button>
        )
      })}
    </div>
  )
}
