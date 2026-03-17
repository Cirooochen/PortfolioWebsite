import { Label } from '../typography/Label'
import type { ShowcaseItem } from '../../types'

interface BentoGridProps {
  items: ShowcaseItem[]
}

const spanClasses: Record<ShowcaseItem['span'], string> = {
  normal: '',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  large: 'md:col-span-2 md:row-span-2',
}

function ShowcaseMedia({ item }: { item: ShowcaseItem }) {
  if (item.src && item.type === 'video') {
    return (
      <video
        src={item.src}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    )
  }

  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.title}
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <span className="block text-3xl text-text-tertiary mb-2">
          {item.type === 'video' ? '▶' : item.type === 'gif' ? '◉' : '◻'}
        </span>
        <Label>{item.type.toUpperCase()}</Label>
      </div>
    </div>
  )
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[240px]">
      {items.map((item) => (
        <div
          key={item.id}
          className={`group relative overflow-hidden rounded-xl border border-border-primary bg-bg-tertiary transition-all duration-[var(--transition-base)] hover:border-border-secondary hover:shadow-lg ${spanClasses[item.span]}`}
        >
          <ShowcaseMedia item={item} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/70 to-transparent px-4 py-3 opacity-0 transition-opacity duration-[var(--transition-base)] group-hover:opacity-100">
            <span className="text-sm font-medium text-white">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
