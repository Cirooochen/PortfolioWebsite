import { NavBar } from '../navigation/NavBar'
import type { Page } from '../../types'

interface PageLayoutProps {
  children: React.ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function PageLayout({ children, currentPage, onNavigate }: PageLayoutProps) {
  return (
    <div className={`min-h-screen ${currentPage === 'project' ? 'bg-cs-paper' : 'bg-bg-primary'}`}>
      <NavBar currentPage={currentPage} onNavigate={onNavigate} />
      <main>{children}</main>
    </div>
  )
}
