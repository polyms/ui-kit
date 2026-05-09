import { Drawer } from '@base-ui/react/drawer'
import { useSyncExternalStore } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasProps = Drawer.Root.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Offcanvas({ swipeDirection = 'right', ...props }: OffcanvasProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  // Mobile offcanvas is intentionally forced to bottom-drawer behavior.
  const resolvedSwipeDirection: Drawer.Root.Props['swipeDirection'] = isMobile ? 'down' : swipeDirection

  return <Drawer.Root swipeDirection={resolvedSwipeDirection} {...props} />
}

Offcanvas.displayName = 'Offcanvas'

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

function useMediaQuery(query: string) {
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
