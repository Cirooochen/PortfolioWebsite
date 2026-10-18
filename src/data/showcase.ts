import type { ShowcaseItem } from '../types'

// Placeholder mockups drawn in code until real UI work replaces them. Order sets the
// grid: the large piece and two small ones, then a tall one beside two wide ones.
export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'onboarding',
    title: 'Onboarding flow',
    alt: 'A phone stepping through three onboarding screens for a habit app, with streak cards floating beside it',
    src: '/videos/ui-work/onboarding.webm',
    poster: '/images/ui-work/onboarding-poster.webp',
    type: 'video',
    span: 'large',
  },
  {
    id: 'icon-set',
    title: 'Icon set',
    alt: 'A grid of eighteen line icons on white tiles, with the heart icon highlighted',
    src: '/images/ui-work/icon-set.webp',
    type: 'image',
    span: 'normal',
  },
  {
    id: 'toggles',
    title: 'Toggle interactions',
    alt: 'Three settings toggles switching on one after another on a dark card',
    src: '/videos/ui-work/toggles.webm',
    poster: '/images/ui-work/toggles-poster.webp',
    type: 'video',
    span: 'normal',
  },
  {
    id: 'mobile-screen',
    title: 'Daily health summary',
    alt: 'A phone screen showing activity rings, sleep, steps and water stats, and a habit checklist',
    src: '/images/ui-work/mobile-screen.webp',
    type: 'image',
    span: 'tall',
  },
  {
    id: 'dashboard',
    title: 'Analytics dashboard',
    alt: 'A dashboard with four key numbers, a weekly active users line chart and a bar chart by platform',
    src: '/images/ui-work/dashboard.webp',
    type: 'image',
    span: 'wide',
  },
  {
    id: 'components',
    title: 'Form components',
    alt: 'Design system components in use: a search field being typed in, a slider, selectable chips and a checklist',
    src: '/videos/ui-work/components.webm',
    poster: '/images/ui-work/components-poster.webp',
    type: 'video',
    span: 'wide',
  },
]
