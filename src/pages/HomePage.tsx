import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Divider } from '../components/layout/Divider'
import { Footer } from '../components/layout/Footer'
import { Heading } from '../components/typography/Heading'
import { Text } from '../components/typography/Text'
import { Eyebrow } from '../components/typography/Eyebrow'
import { SurfacingText } from '../components/text/SurfacingText'
import { BentoGrid } from '../components/cards/BentoGrid'
import { ProjectCard } from '../components/cards/ProjectCard'
import { DrinkContact } from '../components/contact/DrinkContact'
import { WaterHero } from '../components/hero/WaterHero'
import { WaterPool } from '../components/water/WaterPool'
import { showcaseItems } from '../data/showcase'
import { featuredProjects } from '../data/projects'
import { introSegments, philosophyLead, philosophySegments } from '../data/about'
import { inAppClick } from '../hooks/useRouteState'
import type { CaseStudyEmphasis, NavigateFn } from '../types'

// Grid placement per card emphasis: a full-width feature, then a staggered pair
const caseStudySpans: Record<CaseStudyEmphasis, string> = {
  feature: 'md:col-span-12',
  standard: 'md:col-span-7',
  compact: 'md:col-span-5 md:mt-24',
}

interface HomePageProps {
  onOpenChat: () => void
  onNavigate: NavigateFn
}

export function HomePage({ onOpenChat, onNavigate }: HomePageProps) {
  return (
    <>
      {/* Hero */}
      <WaterHero onOpenChat={onOpenChat} />

      {/* Introduction */}
      <Section className="md:py-32">
        <Container>
          <div className="grid gap-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <Eyebrow className="mb-8">About</Eyebrow>
              <SurfacingText
                segments={introSegments}
                className="text-3xl font-medium leading-[1.2] tracking-tight text-text-primary md:text-[2.625rem]"
              />
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pt-1">
              <Eyebrow className="mb-8">Design philosophy</Eyebrow>
              <SurfacingText
                as="h3"
                segments={philosophyLead}
                className="mb-4 text-xl font-semibold tracking-tight text-text-primary"
              />
              <SurfacingText
                segments={philosophySegments}
                className="text-lg leading-relaxed text-text-secondary"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Case Studies */}
      <Section>
        <Container>
          <div className="mb-12 md:mb-16">
            <Heading level={2} className="mb-4">Selected Work</Heading>
            <Text size="lg" muted className="max-w-xl">
              Three projects, from the one I'm building right now to the ones that shaped how I work.
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => onNavigate('project', project.id)}
                className={caseStudySpans[project.emphasis ?? 'standard']}
              />
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-border-primary pt-6">
            <p className="text-text-secondary">Selected case studies. More work, including shorter visual projects, lives on the Projects page.</p>
            <a
              href="/projects"
              onClick={inAppClick(() => onNavigate('projects'))}
              className="group inline-flex items-center gap-2 font-medium text-text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              All projects
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
            </a>
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

      {/* Contact + footer float on water, echoing the hero */}
      <WaterPool>
        <Section className="md:py-36">
          <Container>
            <DrinkContact />
          </Container>
        </Section>

        <Footer onNavigate={onNavigate} />
      </WaterPool>
    </>
  )
}
