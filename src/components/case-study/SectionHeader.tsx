interface SectionHeaderProps {
  /** 1-based position on the page */
  index: number
  label: string
  title: string
  /** Id of the heading, for the section's aria-labelledby */
  titleId: string
}

/** Numbered section label over a thin rule, then the section title. */
export function SectionHeader({ index, label, title, titleId }: SectionHeaderProps) {
  return (
    <header data-reveal className="border-t border-cs-rule pt-6">
      <p className="flex gap-4 text-cs-label font-medium uppercase text-cs-accent">
        <span className="tabular-nums">{String(index).padStart(2, '0')}</span>
        <span>{label}</span>
      </p>
      <h2 id={titleId} className="mt-6 max-w-[24ch] text-cs-section font-semibold text-cs-ink">
        {title}
      </h2>
    </header>
  )
}
