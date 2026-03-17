import { Container } from './Container'
import { Text } from '../typography/Text'
import { ClockUI } from '../ui/ClockUI'
import type { Page } from '../../types'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border-primary bg-bg-secondary py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          {/* Clock */}
          <div>
            <Text size="sm" className="mb-4 font-semibold">Local Time</Text>
            <ClockUI />
          </div>

          {/* Site Links */}
          <div>
            <Text size="sm" className="mb-4 font-semibold">Site</Text>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <Text size="sm" className="mb-4 font-semibold">Connect</Text>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Dribbble
                </a>
              </li>
              <li>
                <a
                  href="mailto:cirochen0406@gmail.com"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Brand + Copyright */}
          <div>
            <Text size="sm" className="mb-4 font-semibold">Ciro Chen</Text>
            <Text size="sm" muted>
              Product Designer crafting thoughtful digital experiences.
            </Text>
          </div>
        </div>

        <div className="mt-10 border-t border-border-primary pt-6">
          <Text size="sm" muted>
            &copy; {currentYear} Ciro Chen. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  )
}
