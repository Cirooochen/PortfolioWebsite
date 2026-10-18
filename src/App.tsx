import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { PageLayout } from './components/layout/PageLayout'
import { ChatButton } from './components/chat/ChatButton'
import { ChatModal } from './components/chat/ChatModal'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ShowcasePage } from './pages/ShowcasePage'
import { projects } from './data/projects'
import { useRouteState } from './hooks/useRouteState'

export default function App() {
  useLenis()
  const { currentPage, projectId, navigate } = useRouteState()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <PageLayout currentPage={currentPage} onNavigate={navigate}>
      {currentPage === 'home' && (
        <HomePage onOpenChat={() => setChatOpen(true)} onNavigate={navigate} />
      )}
      {currentPage === 'projects' && <ProjectsPage onNavigate={navigate} />}
      {currentPage === 'project' && projectId && (
        // Each project picks its template; unknown ids fall through to the case study's not-found state
        projects.find((p) => p.id === projectId)?.template === 'showcase' ? (
          <ShowcasePage key={projectId} id={projectId} onNavigate={navigate} />
        ) : (
          <CaseStudyPage key={projectId} id={projectId} onNavigate={navigate} />
        )
      )}

      {chatOpen ? (
        <ChatModal onClose={() => setChatOpen(false)} />
      ) : (
        <ChatButton onClick={() => setChatOpen(true)} />
      )}
    </PageLayout>
  )
}
