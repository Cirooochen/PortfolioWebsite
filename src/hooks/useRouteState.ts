import { useState, useCallback } from 'react'
import type { Page } from '../types'

export function useRouteState(initialPage: Page = 'home') {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage)

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { currentPage, navigate }
}
