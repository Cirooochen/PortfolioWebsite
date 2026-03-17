import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Divider } from '../components/layout/Divider'
import { Footer } from '../components/layout/Footer'
import { Heading } from '../components/typography/Heading'
import { Text } from '../components/typography/Text'
import { Button } from '../components/ui/Button'
import { BentoGrid } from '../components/cards/BentoGrid'
import { showcaseItems } from '../data/showcase'
import type { Page } from '../types'

interface HomePageProps {
  onOpenChat: () => void
  onNavigate: (page: Page) => void
}

export function HomePage({ onOpenChat, onNavigate }: HomePageProps) {
  return (
    <>
      {/* Hero */}
      <Section className="flex min-h-[calc(100vh-4rem)] items-center">
        <Container>
          <div className="max-w-2xl">
            <Text size="lg" muted className="mb-4">
              Hi, I'm Ciro
            </Text>
            <Heading level={1} className="mb-6">
              Product Designer crafting thoughtful digital experiences
            </Heading>
            <Text size="lg" muted className="mb-10 max-w-xl">
              I design systems, tools, and interfaces that respect users' time and cognitive load.
              Currently focused on design systems, AI products, and making complex things feel simple.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onOpenChat}>
                Talk to my AI
              </Button>
              <Button size="lg" variant="secondary" onClick={() => onNavigate('projects')}>
                View projects
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Container><Divider /></Container>

      {/* UI Work Showcase */}
      <Section>
        <Container>
          <div className="mb-12">
            <Heading level={2} className="mb-4">UI Work</Heading>
            <Text size="lg" muted className="max-w-xl">
              A visual collection of interfaces, interactions, and design explorations.
            </Text>
          </div>
          <BentoGrid items={showcaseItems} />
        </Container>
      </Section>

      <Container><Divider /></Container>

      {/* Contact */}
      <Section>
        <Container>
          <div className="max-w-xl">
            <Heading level={2} className="mb-4">Get in Touch</Heading>
            <Text size="lg" muted className="mb-6">
              Interested in working together or just want to say hi? Feel free to reach out.
            </Text>
            <a
              href="mailto:cirochen0406@gmail.com"
              className="inline-block text-lg font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:decoration-text-primary"
            >
              cirochen0406@gmail.com
            </a>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </>
  )
}
