import { useEffect, useMemo, useRef } from 'react'
import { Container } from '../components/layout/Container'
import { Footer } from '../components/layout/Footer'
import { CaseStudyHero } from '../components/case-study/CaseStudyHero'
import { MetadataGrid } from '../components/case-study/MetadataGrid'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { ResultStat } from '../components/case-study/ResultStat'
import { Prose } from '../components/case-study/Prose'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { NextProject } from '../components/case-study/NextProject'
import { projects } from '../data/projects'
import { caseStudyDetails } from '../data/caseStudyDetails'
import type { CaseStudyDetail, CaseStudyKeyWork, CaseStudyStat, NavigateFn } from '../types'

interface CaseStudyPageProps {
  id: string
  onNavigate: NavigateFn
}

type PageSection = CaseStudyKeyWork & { id: string; label: string; stats?: CaseStudyStat[] }

/** Sections 3–8 in page order; optional ones only when the study has them. */
function bodySections(study: CaseStudyDetail): PageSection[] {
  const { background, challenge, persona, keyWork, results } = study
  return [
    { ...background, id: 'background', label: background.label ?? 'Background' },
    { ...challenge, id: 'challenge', label: challenge.label ?? 'Challenge' },
    ...(persona ? [{ ...persona, id: 'persona', label: persona.label ?? 'Persona' }] : []),
    ...keyWork.map((work, i) => ({ ...work, id: `key-work-${i + 1}`, label: work.label ?? `Key work ${i + 1}` })),
    { ...results, id: 'results', label: results.label ?? 'Results' },
  ]
}

export function CaseStudyPage({ id, onNavigate }: CaseStudyPageProps) {
  const rootRef = useRef<HTMLElement>(null)
  const study = caseStudyDetails.find((s) => s.id === id)
  const card = projects.find((p) => p.id === id)

  const sections = useMemo(() => (study ? bodySections(study) : []), [study])

  useRevealOnScroll(rootRef, id)

  useEffect(() => {
    if (!study) return
    const previous = document.title
    document.title = `${study.title} — Ciro Chen`
    return () => {
      document.title = previous
    }
  }, [study])

  if (!study) {
    return (
      <Container className="py-32">
        <h1 className="text-cs-section font-semibold text-cs-ink">This project doesn't exist</h1>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="mt-8 text-cs-body text-cs-accent underline underline-offset-4"
        >
          Back to selected work
        </button>
      </Container>
    )
  }

  const { summary } = study
  const summaryIndex = sections.length + 1

  return (
    <article ref={rootRef} className="text-cs-ink">
      <Container>
        <CaseStudyHero
          title={study.title}
          oneLiner={study.oneLiner}
          year={card?.year ?? ''}
          current={card?.current}
          onBack={() => onNavigate('home')}
        >
          <MetadataGrid items={study.metadata} />
        </CaseStudyHero>
      </Container>

      <Container className="pb-cs-section">
        {sections.map(({ id, label, title, description, blocks, subsections, stats }, i) => (
          <CaseStudySection
            key={id}
            id={id}
            index={i + 1}
            label={label}
            title={title}
            description={description}
            blocks={blocks}
            subsections={subsections}
          >
            {stats && stats.length > 0 && (
              <dl data-reveal className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
                {stats.map((stat) => (
                  <ResultStat key={stat.label} {...stat} />
                ))}
              </dl>
            )}
          </CaseStudySection>
        ))}

        {/* Summary: typography only */}
        <CaseStudySection id="summary" index={summaryIndex} label={summary.label ?? 'Summary'} title={summary.title}>
          <div data-reveal className="mt-8">
            <Prose>{summary.description}</Prose>
          </div>
          {summary.takeaways && (
            <ol className="mt-cs-block space-y-10">
              {summary.takeaways.map((takeaway, i) => (
                <li key={takeaway.title} data-reveal className="grid gap-2 sm:grid-cols-[3rem_1fr]">
                  <span className="pt-0.5 text-cs-label font-medium tabular-nums text-cs-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-2 text-cs-body font-semibold">{takeaway.title}</h3>
                    <p className="max-w-cs-read text-cs-body">{takeaway.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </CaseStudySection>
      </Container>

      <NextProject currentId={id} onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />
    </article>
  )
}
