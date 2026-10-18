import type { FooterLink } from '../../data/footer'

interface FooterLinkListProps {
  links: FooterLink[]
}

/** Inline text links. Web links open in a new tab; mailto links don't. */
export function FooterLinkList({ links }: FooterLinkListProps) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => {
        const external = link.href.startsWith('http')
        return (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
