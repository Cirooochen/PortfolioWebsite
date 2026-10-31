import type { Project, ProjectCategory } from '../types'

/** Filter options on the Projects page, in display order. */
export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'development', label: 'Development' },
]

// Oaks, EV Smart Money and TV Insight are real; Lumen's write-up is coming. Balance is
// real but its details are placeholders, as are the other three showcase projects.
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
    categories: ['ui-ux'],
    image: {
      src: '/images/case-studies/Oaks/Oaks_Thumbnail.png',
      alt: 'A phone showing the Oaks savings dashboard, lying on a desk beside a notebook and a cup of coffee',
    },
    previewImages: [
      '/images/case-studies/Oaks/Oaks_Thumbnail.png',
      '/images/case-studies/Oaks/Oaks_Hero%20Image.png',
      '/images/case-studies/Oaks/Oaks_Diagnose.png',
      '/images/case-studies/Oaks/Oaks_NewUserFlow.jpg',
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
    categories: ['ui-ux'],
    image: {
      src: '/images/case-studies/EVSmartMoney/EV_SmartMoney_Thumbnail.png',
      alt: 'The EV Smart Money website on a laptop and a phone, showing an exclusive real estate investment',
    },
    previewImages: [
      '/images/case-studies/EVSmartMoney/EV_SmartMoney_Thumbnail.png',
      '/images/case-studies/EVSmartMoney/EVSmartMoney_ProductImage5.jpg',
      '/images/case-studies/EVSmartMoney/EVSmartMoney_ProductImage1.jpg',
      '/images/case-studies/EVSmartMoney/EVSmartMoney_ProductImage4.jpg',
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
    categories: ['ui-ux', 'development'],
    image: {
      src: '1531297484001-80022131f5a1',
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
    id: 'tv-insight',
    title: 'TV Insight',
    subtitle: 'A live audience dashboard that shows TV channels who is watching, minute by minute',
    year: '2022',
    template: 'showcase',
    discipline: 'Media · Data visualisation',
    role: 'Product Designer',
    tags: ['Showcase', 'Dashboard'],
    categories: ['ui-ux'],
    image: {
      src: '/images/case-studies/TVInsight/TVInsight_Thumbnail.png',
      alt: 'The TV Insight live board, with a live programme rating gauge, viewer numbers and an age group chart',
    },
    previewImages: [
      '/images/case-studies/TVInsight/TVInsight_Thumbnail.png',
      '/images/case-studies/TVInsight/tvinsight_ProductShowcase1.jpg',
      '/images/case-studies/TVInsight/tvinsight_ProductWidget2.png',
      '/images/case-studies/TVInsight/tvinsight_ProductShowCase3.jpg',
    ],
  },
  {
    id: 'balance',
    title: 'Balance',
    subtitle: 'A full-stack health tracking app for logging sleep, meals and activity in one place',
    year: '2025',
    template: 'showcase',
    discipline: 'Health · Full-stack web app',
    role: 'Full-stack developer',
    tags: ['Showcase', 'Full-stack'],
    categories: ['development'],
    image: {
      src: '1434494878577-86c23bcb06b9',
      alt: 'A person checking a smartwatch on their wrist',
    },
    previewImages: [
      '1434494878577-86c23bcb06b9',
      '1510017803434-a899398421b3',
      '1512621776951-a57141f2eefd',
      '1571019613454-1cb2f99b2d8b',
      '1517694712202-14dd9538aa97',
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
    categories: ['ui-ux'],
    image: {
      src: '1586953208448-b95a79798f07',
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
    categories: ['ui-ux'],
    image: {
      src: '1551288049-bebda4e38f71',
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
    categories: ['ui-ux'],
    image: {
      src: '1561070791-2526d30994b5',
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
