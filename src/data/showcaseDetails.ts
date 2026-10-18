import type { ShowcaseDetail } from '../types'
import { unsplash } from './media'

// Placeholder showcase projects: copy and images stand in until real work replaces them
export const showcaseDetails: ShowcaseDetail[] = [
  {
    id: 'tempo',
    title: 'Tempo',
    oneLiner: 'Interaction design for a class booking app, from browsing to a booked spot in three taps.',
    metadata: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Year', value: '2025' },
      { label: 'Type', value: ['Mobile app', 'Interaction design'] },
      { label: 'Tools', value: ['Figma', 'Protopie'] },
    ],
    intro: [
      'Tempo helps people find and book fitness classes nearby. The booking flow worked, but it took seven screens and lost people halfway through.',
      'This short project focused on the core interaction: browsing classes, checking a time, and booking a spot without leaving the list.',
    ],
    blocks: [
      {
        type: 'mediaOnly',
        media: [
          {
            kind: 'video',
            src: '/videos/tempo-preview.webm',
            poster: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1600&q=80&auto=format&fit=crop',
            alt: 'Prototype recording: class cards scroll past and one expands to show booking times',
            caption: 'Prototype: a class card expands in place to show times, so booking never leaves the list.',
          },
        ],
      },
      {
        type: 'mediaOnly',
        media: [
          unsplash(
            '1517292987719-0369a794ec0f',
            'A smartphone resting on an open laptop keyboard',
            'Class list with live spots left.',
          ),
          unsplash(
            '1545235617-9465d2a55698',
            'A hand holding a phone with a photo app in front of a laptop showing app screens',
            'Booking sheet with time slots.',
          ),
        ],
      },
      {
        type: 'textMedia',
        title: 'Booking in place',
        description:
          'Instead of opening a new page, a tapped card grows to show the next available times. One more tap books the spot, and the card settles back into the list with a clear confirmation.',
        media: unsplash(
          '1563986768609-322da13575f3',
          'A person using a phone in front of a laptop in a café',
        ),
      },
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse',
    oneLiner: 'A calmer analytics dashboard for small product teams.',
    metadata: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Year', value: '2024' },
      { label: 'Type', value: ['SaaS', 'Dashboard UI'] },
      { label: 'Tools', value: ['Figma'] },
    ],
    intro:
      'Pulse shows product teams how people use their app. The redesign cut the default view down to the few numbers a team checks every morning, and moved everything else one click away.',
    blocks: [
      {
        type: 'mediaOnly',
        media: [
          unsplash(
            '1460925895917-afdab827c52f',
            'A laptop on a reflective desk showing area charts and summary numbers',
            'The overview: four key numbers, one trend, nothing else.',
          ),
        ],
      },
      {
        type: 'mediaOnly',
        media: [
          unsplash('1504868584819-f8e8b4b6d7e3', 'A laptop on a grey sofa showing a dashboard with charts and a map'),
          unsplash('1586717791821-3f44a563fa4c', 'A hand sketching a dashboard wireframe on a tablet'),
          unsplash('1551650975-87deedd944c3', 'A hand holding a phone showing a mobile chart view'),
        ],
      },
    ],
  },
  {
    id: 'kitbase',
    title: 'Kitbase',
    oneLiner: 'A shared design system for a suite of internal tools.',
    metadata: [
      { label: 'Role', value: 'Design system lead' },
      { label: 'Year', value: '2023' },
      { label: 'Type', value: ['SaaS', 'Design system'] },
      { label: 'Tools', value: ['Figma', 'Storybook'] },
    ],
    intro:
      'Four internal tools had grown four different sets of buttons, tables and forms. Kitbase brought them into one library of tokens and components that designers and engineers share.',
    blocks: [
      {
        type: 'mediaOnly',
        media: [
          unsplash(
            '1581291518857-4e27b48ff24e',
            'A hand drawing interface wireframes with a pen on paper',
            'Auditing the components each tool already had.',
          ),
        ],
      },
      {
        type: 'textMedia',
        title: 'Tokens first',
        description:
          'Colour, type and spacing were defined as tokens before any component was drawn, so every tool could adopt the system one screen at a time.',
        media: unsplash('1522542550221-31fd19575a2d', 'Watercolour sketches of app screen layouts'),
        mediaFirst: true,
      },
      {
        type: 'mediaOnly',
        media: [
          unsplash('1600132806370-bf17e65e942f', 'Blueprint-style wireframes drawn in white on dark blue'),
          unsplash('1559028012-481c04fa702d', 'A monitor showing a website design file with dark UI panels'),
        ],
      },
    ],
  },
]
