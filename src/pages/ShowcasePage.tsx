import { useEffect, useRef } from 'react'
import { Container } from '../components/layout/Container'
import { Footer } from '../components/layout/Footer'
import { CaseStudyHero } from '../components/case-study/CaseStudyHero'
import { MetadataGrid } from '../components/case-study/MetadataGrid'
import { BlockList } from '../components/case-study/BlockList'
import { Prose } from '../components/case-study/Prose'
import { NextProject } from '../components/case-study/NextProject'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { projects } from '../data/projects'
import { showcaseDetails } from '../data/showcaseDetails'
import type { NavigateFn } from '../types'

interface ShowcasePageProps {
  id: string
  onNavigate: NavigateFn
}

/**
 * Visual showcase: a short hero and intro, then the work itself. Shares the
 * case study's typography and media blocks, without the narrative sections.
 */
export function ShowcasePage({ id, onNavigate }: ShowcasePageProps) {
  const rootRef = useRef<HTMLElement>(null)
  const showcase = showcaseDetails.find((s) => s.id === id)
  const project = projects.find((p) => p.id === id)

  useRevealOnScroll(rootRef, id)

  useEffect(() => {
    if (!showcase) return
    const previous = document.title
    document.title = `${showcase.title} — Ciro Chen`
    return () => {
      document.title = previous
    }
  }, [showcase])

  if (!showcase) {
    return (
      <Container className="py-32">
        <h1 className="text-cs-section font-semibold text-cs-ink">This project doesn't exist</h1>
        <button
          type="button"
          onClick={() => onNavigate('projects')}
          className="mt-8 text-cs-body text-cs-accent underline underline-offset-4"
        >
          Back to all projects
        </button>
      </Container>
    )
  }

  return (
    <article ref={rootRef} className="text-cs-ink">
      <Container>
        <CaseStudyHero
          title={showcase.title}
          oneLiner={showcase.oneLiner}
          year={project?.year ?? ''}
          current={project?.current}
          kind="Visual showcase"
          backLabel="All projects"
          onBack={() => onNavigate('projects')}
          compact
        >
          <MetadataGrid items={showcase.metadata} />
        </CaseStudyHero>
      </Container>

      <Container className="pb-cs-section">
        <div data-reveal className="pt-4 md:pt-8">
          <Prose>{showcase.intro}</Prose>
        </div>
        <BlockList blocks={showcase.blocks} headingLevel={2} className="mt-cs-block" />
      </Container>

      <NextProject currentId={id} onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />
    </article>
  )
}
