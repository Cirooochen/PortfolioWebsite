interface NavLinkProps {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}

export function NavLink({ children, active = false, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-[var(--transition-fast)] ${
        active
          ? 'bg-bg-inverse text-text-inverse'
          : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
      }`}
    >
      {children}
    </button>
  )
}
