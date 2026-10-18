import { useState, useCallback, useEffect } from 'react'
import type { Page } from '../types'

interface Route {
  page: Page
  projectId?: string
}

const projectPath = /^\/work\/([\w-]+)\/?$/

function parsePath(path: string): Route {
  const match = path.match(projectPath)
  if (match) return { page: 'project', projectId: match[1] }
  if (path.replace(/\/$/, '') === '/projects') return { page: 'projects' }
  return { page: 'home' }
}

function toPath({ page, projectId }: Route) {
  if (page === 'project') return `/work/${projectId}`
  if (page === 'projects') return '/projects'
  return '/'
}

/** Address of a project page, for real links that open in a new tab too. */
export const projectHref = (projectId: string) => toPath({ page: 'project', projectId })

/**
 * Click handler for in-app links: plain clicks navigate without a reload,
 * while modified clicks (new tab, new window) keep the browser default.
 */
export function inAppClick(go: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go()
  }
}

/** Current page, kept in sync with the URL so pages can be linked and back/forward work. */
export function useRouteState() {
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setRoute(parsePath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((page: Page, projectId?: string) => {
    const next = { page, projectId }
    const path = toPath(next)
    if (path !== window.location.pathname) window.history.pushState(null, '', path)
    setRoute(next)
    // A project is a new document: start at its top rather than gliding there
    if (page === 'project') window.scrollTo(0, 0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { currentPage: route.page, projectId: route.projectId, navigate }
}
