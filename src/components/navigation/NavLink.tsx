interface NavLinkProps {
  children: string
  active?: boolean
  onClick: () => void
}

/** Text-only nav link: underlined when current, bold on hover. */
export function NavLink({ children, active = false, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`group px-3 py-2 text-sm transition-colors duration-200 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
        active ? 'text-text-primary' : 'text-text-secondary'
      }`}
    >
      {/* The hidden bold copy reserves width so hovering doesn't shift the nav */}
      <span className="grid">
        <span
          className={`col-start-1 row-start-1 underline-offset-[6px] group-hover:font-semibold ${
            active ? 'font-medium underline decoration-2' : 'font-normal'
          }`}
        >
          {children}
        </span>
        <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold">
          {children}
        </span>
      </span>
    </button>
  )
}
