import type { Project } from '../types'

// Oaks and EV Smart Money are real; Lumen's write-up is coming. The three
// showcase projects are placeholders until real work replaces them.
export const projects: Project[] = [
  {
    id: 'oaks',
    title: 'Oaks',
    subtitle: 'A “save now, buy later” product that rewards people for saving up for what they want',
    year: '2023',
    template: 'case-study',
    featured: true,
    emphasis: 'feature',
    discipline: 'Fintech · Product design',
    role: 'Product Designer',
    tags: ['Case study', 'Fintech'],
    image: {
      unsplashId: '1579621970563-ebec7560ff3e',
      alt: 'A green seedling growing out of a pile of coins',
    },
    previewImages: [
      '1579621970563-ebec7560ff3e',
      '1512428559087-560fa5ceab42',
      '1555041469-a586c61ea9bc',
      '1563986768609-322da13575f3',
    ],
  },
  {
    id: 'ev-smart-money',
    title: 'EV Smart Money',
    subtitle: 'Exclusive real estate investments, made simple for high-net-worth investors',
    year: '2022',
    template: 'case-study',
    featured: true,
    emphasis: 'standard',
    discipline: 'Fintech · Web app',
    role: 'UI/UX and web design',
    tags: ['Case study', 'Fintech'],
    image: {
      unsplashId: '1486406146926-c627a92ad1ab',
      alt: 'Glass office towers seen from below against a cloudy sky',
    },
    previewImages: [
      '1486406146926-c627a92ad1ab',
      '1460925895917-afdab827c52f',
      '1542744173-8e7e53415bb0',
      '1504868584819-f8e8b4b6d7e3',
    ],
  },
  {
    id: 'lumen',
    title: 'Lumen',
    subtitle: 'Launch website for an AI writing tool',
    year: '2024',
    template: 'case-study',
    featured: true,
    emphasis: 'compact',
    discipline: 'AI · Marketing website',
    role: 'Product Designer, Web',
    tags: ['Case study', 'Website'],
    image: {
      unsplashId: '1531297484001-80022131f5a1',
      alt: 'A laptop glowing in a dark room',
    },
    previewImages: [
      '1531297484001-80022131f5a1',
      '1559028012-481c04fa702d',
      '1555421689-491a97ff2040',
      '1618005182384-a83a8bd57fbe',
    ],
  },
  {
    id: 'tempo',
    title: 'Tempo',
    subtitle: 'Interaction design for a class booking app, from browsing to a booked spot in three taps',
    year: '2025',
    template: 'showcase',
    discipline: 'Mobile app · Interaction design',
    role: 'Product Designer',
    tags: ['Showcase', 'Mobile'],
    image: {
      unsplashId: '1586953208448-b95a79798f07',
      alt: 'A smartphone lying on a white table, showing a feed of photo cards',
    },
    previewImages: [
      '1586953208448-b95a79798f07',
      '1517292987719-0369a794ec0f',
      '1545235617-9465d2a55698',
      '1512941937669-90a1b58e7e9c',
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'A calmer analytics dashboard for small product teams',
    year: '2024',
    template: 'showcase',
    discipline: 'SaaS · Dashboard UI',
    role: 'Product Designer',
    tags: ['Showcase', 'SaaS'],
    image: {
      unsplashId: '1551288049-bebda4e38f71',
      alt: 'A dark analytics dashboard with bar charts and line graphs on a monitor',
    },
    previewImages: [
      '1551288049-bebda4e38f71',
      '1460925895917-afdab827c52f',
      '1504868584819-f8e8b4b6d7e3',
      '1551650975-87deedd944c3',
      '1586717791821-3f44a563fa4c',
    ],
  },
  {
    id: 'kitbase',
    title: 'Kitbase',
    subtitle: 'A shared design system for a suite of internal tools',
    year: '2023',
    template: 'showcase',
    discipline: 'SaaS · Design system',
    role: 'Design system lead',
    tags: ['Showcase', 'Design system'],
    image: {
      unsplashId: '1561070791-2526d30994b5',
      alt: 'Printed colour swatches beside a tablet showing stacked colour tokens',
    },
    previewImages: [
      '1561070791-2526d30994b5',
      '1581291518857-4e27b48ff24e',
      '1522542550221-31fd19575a2d',
      '1600132806370-bf17e65e942f',
      '1559028012-481c04fa702d',
    ],
  },
]

/** The three projects on Home, in order. */
export const featuredProjects = projects.filter((project) => project.featured)

if (import.meta.env.DEV) {
  const invalid = featuredProjects.filter((project) => project.template !== 'case-study')
  if (featuredProjects.length !== 3 || invalid.length > 0) {
    console.warn('Home needs exactly 3 featured projects, all using the case study template.')
  }
}
