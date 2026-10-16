import type { TextSegment } from '../types'

// TODO: replace [hometown] and [current city] with real places
export const introSegments: TextSegment[] = [
  "I'm Ciro, a product designer from ",
  { text: '[hometown]', emphasis: true },
  ', now based in ',
  { text: '[current city]', emphasis: true },
  '. I’ve shaped design systems, fintech products, and data-heavy tools, always working to ',
  { text: 'make complex things feel simple', emphasis: true },
  '. Today I’m at ',
  { text: 'SIV.AG', emphasis: true },
  ', building AI-powered software for the energy sector.',
]

export const philosophyLead: TextSegment[] = [
  'AI widens the funnel. Craft narrows it.',
]

export const philosophySegments: TextSegment[] = [
  'I treat AI as a design material, not a shortcut. It helps me ',
  { text: 'explore wider', emphasis: true },
  ': synthesizing research in hours instead of weeks, generating dozens of directions, and prototyping real interactions in code. That frees my time for the part that matters most: ',
  { text: 'judgment', emphasis: true },
  '. What to keep, what to cut, and what genuinely helps the people using it.',
]
