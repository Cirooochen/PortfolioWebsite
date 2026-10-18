import type { CaseStudyStat } from '../../types'

/** A large accent-coloured number with its label. */
export function ResultStat({ value, label }: CaseStudyStat) {
  return (
    // Value first visually, label first for screen readers
    <div className="flex flex-col-reverse border-t border-cs-rule pt-6">
      <dt className="mt-3 max-w-[28ch] text-cs-caption text-cs-muted">{label}</dt>
      <dd className="text-cs-stat font-semibold tabular-nums text-cs-accent">{value}</dd>
    </div>
  )
}
