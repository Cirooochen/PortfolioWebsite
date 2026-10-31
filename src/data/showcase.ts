import type { ShowcaseItem } from '../types'

// Order sets the grid: the large piece and two small ones, then a tall one beside two wide ones.
export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'thxd-about-us',
    title: 'THXD website, About us',
    alt: 'The THXD About us page: a team photo in superhero costumes with a “Love received” button and thumbs-up hands popping up',
    src: '/videos/ui-work/thxd-about-us.mp4',
    poster: '/images/ui-work/thxd-about-us-poster.jpg',
    type: 'video',
    span: 'large',
  },
  {
    id: 'thxd-logo',
    title: 'THXD logo transition',
    alt: 'The THXD logo animating in on a black background',
    src: '/images/ui-work/THXD_Logo_Transition.gif',
    type: 'image',
    span: 'normal',
  },
  {
    id: 'ev-credit-card',
    title: 'EV Smart Money credit card',
    alt: 'A white Engel & Völkers Private Card Visa debit card turning in the air, above contactless and Apple Pay icons',
    src: '/videos/ui-work/ev-smart-money-credit-card.mp4',
    poster: '/images/ui-work/ev-smart-money-credit-card-poster.jpg',
    type: 'video',
    span: 'normal',
  },
  {
    id: 'thxd-mobile',
    title: 'THXD website on mobile',
    alt: 'A phone scrolling through the THXD home page, from a street photo with “Bridging Cultures” to the agency introduction',
    src: '/videos/ui-work/thxd-mobile.mp4',
    poster: '/images/ui-work/thxd-mobile-poster.jpg',
    type: 'video',
    span: 'tall',
  },
  {
    id: 'tv-insight-widgets',
    title: 'TV Insight widgets',
    alt: 'Dashboard widgets for a live TV programme, viewer numbers and ad break performance, beside a data configuration panel',
    src: '/images/case-studies/TVInsight/tvinsight_ProductWidget.png',
    type: 'image',
    span: 'wide',
  },
  {
    id: 'tv-insight-design-system',
    title: 'TV Insight design system',
    alt: 'Design system boards with colours, fonts, buttons, form components, icons, navigation and spacing',
    src: '/images/case-studies/TVInsight/tvinsight_DesignSystem.png',
    type: 'image',
    span: 'wide',
  },
]
