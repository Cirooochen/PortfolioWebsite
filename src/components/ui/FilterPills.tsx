import { useEffect, useId, useRef, useState } from 'react'

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

const pillBase =
  'flex h-11 items-center rounded-full border pl-4 pr-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none md:h-14 md:pl-7 md:pr-6 md:text-base'
const pillActive = 'border-bg-inverse bg-bg-inverse text-text-inverse'

function Count({ count, active }: { count: number; active: boolean }) {
  return (
    <>
      <sup
        aria-hidden
        className={`-mt-2.5 ml-0.5 text-xs md:-mt-3 md:ml-1 font-normal tabular-nums ${active ? 'text-text-inverse/70' : 'text-text-tertiary'}`}
      >
        {count}
      </sup>
      <span className="sr-only">, {count} {count === 1 ? 'project' : 'projects'}</span>
    </>
  )
}

/**
 * Quick filter, each option with a count of what it matches. Laptops and up
 * get a row of pill buttons (toggle buttons like ViewToggle, so the active one
 * is announced as pressed); phones and tablets get a single pill that opens
 * the options as a dropdown.
 */
export function FilterPills<T extends string>({ label, options, value, onChange, className = '' }: FilterPillsProps<T>) {
  return (
    <div className={className}>
      <FilterDropdown label={label} options={options} value={value} onChange={onChange} className="lg:hidden" />
      <div role="group" aria-label={label} className="flex flex-wrap gap-2 max-lg:hidden">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`${pillBase} ${active ? pillActive : 'border-border-primary text-text-primary hover:border-text-primary'}`}
            >
              {option.label}
              <Count count={option.count} active={active} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** The active option as a pill; tapping it opens a menu of all options. */
function FilterDropdown<T extends string>({ label, options, value, onChange, className = '' }: FilterPillsProps<T>) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const menuId = useId()
  const current = options.find((o) => o.value === value) ?? options[0]

  // Focus the selected option on open; close on any tap outside
  useEffect(() => {
    if (!open) return
    itemRefs.current[options.findIndex((o) => o.value === value)]?.focus()
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
    // Only on open: moving focus shouldn't follow later value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const select = (next: T) => {
    onChange(next)
    close()
  }

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[]
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    const focusAt = (n: number) => items[(n + items.length) % items.length]?.focus()
    if (e.key === 'ArrowDown') focusAt(i + 1)
    else if (e.key === 'ArrowUp') focusAt(i - 1)
    else if (e.key === 'Home') focusAt(0)
    else if (e.key === 'End') focusAt(items.length - 1)
    else if (e.key === 'Escape') close()
    else if (e.key === 'Tab') setOpen(false)
    else return
    if (e.key !== 'Tab') e.preventDefault()
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${current.label}, ${current.count} ${current.count === 1 ? 'project' : 'projects'}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
          }
        }}
        className={`${pillBase} ${pillActive}`}
      >
        <span aria-hidden className="flex items-center">
          {current.label}
          <sup className="-mt-2.5 ml-0.5 text-xs md:-mt-3 md:ml-1 font-normal tabular-nums text-text-inverse/70">
            {current.count}
          </sup>
        </span>
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-2 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 top-full z-30 mt-2 flex min-w-full w-max flex-col gap-1 rounded-[1.75rem] border border-border-primary bg-bg-primary p-1.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.16),0_2px_6px_rgba(0,0,0,0.04)] animate-fade-in motion-reduce:animate-none"
        >
          {options.map((option, i) => {
            const active = option.value === value
            return (
              <button
                key={option.value}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                tabIndex={-1}
                onClick={() => select(option.value)}
                className={`flex h-11 items-center justify-between gap-6 rounded-full pl-4 pr-3.5 text-left text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus motion-reduce:transition-none md:h-12 md:text-base ${
                  active ? pillActive : 'text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <span className="flex items-center">
                  {option.label}
                  <Count count={option.count} active={active} />
                </span>
                {active && (
                  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
