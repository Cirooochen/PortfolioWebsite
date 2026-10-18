import type { CaseStudyMeta } from '../../types'

interface MetadataGridProps {
  items: CaseStudyMeta[]
}

/**
 * Project facts: role, timeline, team, and so on. Label/value rows on mobile;
 * columns under thin rules from `sm` up. List values get one line per entry.
 */
export function MetadataGrid({ items }: MetadataGridProps) {
  return (
    <dl className="grid border-b border-cs-rule sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] sm:gap-x-8 sm:gap-y-8 sm:border-b-0">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-cs-rule py-4 sm:block sm:pb-0 sm:pt-5"
        >
          <dt className="pt-px text-cs-label font-medium uppercase text-cs-muted sm:mb-3 sm:pt-0">{label}</dt>
          <dd className="text-base leading-normal text-cs-ink">
            {Array.isArray(value) ? (
              <ul>
                {value.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
