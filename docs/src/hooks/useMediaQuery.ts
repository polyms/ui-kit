import { useSyncExternalStore } from 'react'

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    notify => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', notify)
      return () => mediaQuery.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

export type DocsShellMode = 'drawer' | 'rail' | 'full'

export function useDocsShellMode(): DocsShellMode {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 640px)')

  if (isDesktop) return 'full'
  if (isTablet) return 'rail'
  return 'drawer'
}
