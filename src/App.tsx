import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { PageLayout } from './components/layout/PageLayout'
import { ChatButton } from './components/chat/ChatButton'
import { ChatModal } from './components/chat/ChatModal'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { useRouteState } from './hooks/useRouteState'

export default function App() {
  useLenis()
  const { currentPage, navigate } = useRouteState()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <PageLayout currentPage={currentPage} onNavigate={navigate}>
      {currentPage === 'home' && (
        <HomePage onOpenChat={() => setChatOpen(true)} onNavigate={navigate} />
      )}
      {currentPage === 'projects' && <ProjectsPage />}

      {chatOpen ? (
        <ChatModal onClose={() => setChatOpen(false)} />
      ) : (
        <ChatButton onClick={() => setChatOpen(true)} />
      )}
    </PageLayout>
  )
}
