import type { ShowcaseDetail } from '../types'
import { image, unsplash } from './media'

const tvInsight = '/images/case-studies/TVInsight'

// TV Insight is real work (its copy is a draft that only describes the screens). The other
// showcase projects are placeholders: copy and images stand in until real work replaces them.
export const showcaseDetails: ShowcaseDetail[] = [
  {
    id: 'tv-insight',
    title: 'TV Insight',
    oneLiner: 'A live audience dashboard that shows TV channels who is watching, minute by minute.',
    metadata: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Year', value: '2022' },
      { label: 'Type', value: ['Media analytics', 'Dashboard UI'] },
      { label: 'Platform', value: ['Web', 'Tablet', 'Mobile'] },
    ],
    intro: [
      'TV Insight measures TV audiences in real time. Channel teams use it to follow how many people are watching, how viewers react to ad breaks, and how a programme compares with last week or a competitor.',
      'The redesign turned a dense analytics tool into a calmer live board, built from reusable widgets and a shared design system.',
    ],
    blocks: [
      {
        type: 'mediaOnly',
        media: [
          image(
            `${tvInsight}/tvinsight_NewProduct.png`,
            'The new live board: a gauge showing the live programme outperforming last week by 75%, viewer numbers, an age group chart and a live net reach chart',
            'The new live board.',
            true,
          ),
        ],
      },
      {
        type: 'textMedia',
        title: 'Where it started',
        description:
          'The previous version showed everything at once: a long live net reach chart, channel switches and four key numbers, with little sense of what mattered right now.',
        media: image(
          `${tvInsight}/tvinsight_OldProductImage.png`,
          'The previous dashboard: a dark sidebar, four key numbers, a large live net reach area chart and a live channel switches chart',
          'The dashboard before the redesign.',
        ),
      },
      {
        type: 'textMedia',
        title: 'One widget for each question',
        description:
          'Each widget answers one question: how is the live show doing, who is watching, and what happened during the last ad break. Filters for date, devices, time of day and target group sit in one side panel.',
        media: image(
          `${tvInsight}/tvinsight_ProductWidget.png`,
          'Widgets for the live programme, viewer numbers and advertisement performance, with a data configuration panel for date, devices and filters',
        ),
        mediaFirst: true,
      },
      {
        type: 'mediaOnly',
        media: [
          image(
            `${tvInsight}/tvinsight_ProductWidget2.png`,
            'More widgets: programme comparison on mobile, age group breakdown, channel performance, a live audience flow chart and the top 5 programmes',
            'Comparison, channel performance, audience flow and top programmes.',
            true,
          ),
        ],
      },
      {
        type: 'textMedia',
        title: 'A design system to hold it together',
        description:
          'Colours, type, spacing, form components, icons and navigation were collected into one design system, so new widgets look and behave like the rest.',
        media: image(
          `${tvInsight}/tvinsight_DesignSystem.png`,
          'Design system boards: colours, fonts, buttons, form components, icons, side navigation, colour palette, spacing and elevation',
        ),
      },
      {
        type: 'mediaOnly',
        media: [
          image(
            `${tvInsight}/tvinsight_ProductShowcase1.jpg`,
            'Someone typing on a laptop showing the channel development dashboard',
            'On desktop.',
          ),
          image(
            `${tvInsight}/tvinsight_ProductShowCase3.jpg`,
            'Two hands using a tablet showing the live board with an audience flow chart',
            'On tablet.',
          ),
        ],
      },
      {
        type: 'mediaOnly',
        media: [
          image(
            `${tvInsight}/tvinsight_ProductShowCase2.jpg`,
            'A hand holding a phone with the programme comparison screen',
            'On mobile.',
          ),
          image(
            `${tvInsight}/tvinsight_ProductShowCase4.jpg`,
            'A dark version of the live board on a tablet, with viewer numbers, a performance gauge and an age group chart',
            'A dark version of the live board.',
          ),
        ],
      },
    ],
  },
  {
    id: 'balance',
    title: 'Balance',
    oneLiner: 'A full-stack health tracking app for logging sleep, meals and activity in one place.',
    metadata: [
      { label: 'Role', value: 'Full-stack developer' },
      { label: 'Year', value: '2025' },
      { label: 'Type', value: ['Health', 'Full-stack web app'] },
      { label: 'Stack', value: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'] },
    ],
    intro: [
      'Balance brings the everyday health habits people already track, like sleep, meals and exercise, into one simple daily log.',
      'I built it end to end, from the database and API to the interface, with a focus on making each entry take only a few seconds.',
    ],
    blocks: [
      {
        type: 'mediaOnly',
        media: [
          unsplash(
            '1510017803434-a899398421b3',
            'A black fitness tracker band lying on a grey fabric surface',
            'Activity syncs in from a wearable, so the day fills itself in.',
          ),
        ],
      },
      {
        type: 'textMedia',
        title: 'One log for the whole day',
        description:
          'Sleep, meals and workouts sit on a single timeline instead of separate screens. Each entry type has its own quick form, and the day’s totals update as soon as something is saved.',
        media: unsplash('1512621776951-a57141f2eefd', 'A bowl of salad with avocado, chickpeas and roasted vegetables'),
      },
      {
        type: 'textMedia',
        title: 'Built to be fast',
        description:
          'A typed API shares its data models with the front end, so a change to an entry type is checked in both places. Entries save optimistically and sync in the background.',
        media: unsplash('1517694712202-14dd9538aa97', 'A laptop on a white desk showing code in a dark editor'),
        mediaFirst: true,
      },
      {
        type: 'mediaOnly',
        media: [
          unsplash('1571019613454-1cb2f99b2d8b', 'A woman doing sit-ups on a mat in a bright room'),
          unsplash('1544367567-0f2fcb009e0b', 'A person in a yoga pose silhouetted against a sunset'),
        ],
      },
    ],
  },
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
