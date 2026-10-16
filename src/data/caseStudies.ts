import type { CaseStudy } from '../types'

// Placeholder projects until the real case studies are written up
export const caseStudies: CaseStudy[] = [
  {
    id: 'gridwise',
    title: 'Gridwise',
    subtitle: 'AI forecasting that helps grid operators balance renewable energy in real time',
    year: '2026',
    emphasis: 'feature',
    current: true,
    tags: ['Case study', 'SaaS'],
    image: {
      unsplashId: '1532601224476-15c79f2f7a51',
      alt: 'Wind turbines across rolling green hills',
    },
  },
  {
    id: 'ledger',
    title: 'Ledger Design System',
    subtitle: 'One token-based system for a fintech platform and its twelve product teams',
    year: '2025',
    emphasis: 'standard',
    tags: ['Case study', 'Design system'],
    image: {
      unsplashId: '1558655146-d09347e92766',
      alt: 'A component library open on a desktop monitor',
    },
  },
  {
    id: 'lumen',
    title: 'Lumen',
    subtitle: 'Launch website for an AI writing tool',
    year: '2024',
    emphasis: 'compact',
    tags: ['Website'],
    image: {
      unsplashId: '1531297484001-80022131f5a1',
      alt: 'A laptop glowing in a dark room',
    },
  },
]
