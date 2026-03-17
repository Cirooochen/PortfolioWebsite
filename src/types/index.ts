export interface Project {
  id: string
  title: string
  description: string
  role: string
  duration: string
  year: string
  tags: string[]
  thumbnail: string
  overview: string
  challenge: string
  approach: string
  outcome: string
  metrics?: string[]
  images?: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ShowcaseItem {
  id: string
  title: string
  src: string
  type: 'image' | 'video' | 'gif'
  span: 'normal' | 'wide' | 'tall' | 'large'
}

export type Page = 'home' | 'projects'
