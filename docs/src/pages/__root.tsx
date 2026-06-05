// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toast } from '@polyms/core'
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { AppSidebar } from '../layouts/AppSidebar'
import { DocsFloatingDock } from '../layouts/DocsFloatingDock'

import '../stores/app.store'

const PLAYGROUND_PATHS = new Set(['/demo', '/forms'])

const Name = () => {
  return (
    <div id='app-name'>
      <img alt='logo' className='h-10 shrink-0' src='/favicon.svg' />
      <strong className='text-xl'>Polyms</strong>
      <span className='badge badge-primary whitespace-nowrap rounded-full px-4 font-bold'>Design system</span>
    </div>
  )
}

const Root = () => {
  const appSidebarRef = useRef<AppSidebar.Ref>(null)
  const router = useRouterState()
  const pathname = useRouterState({ select: s => s.location.pathname })
  const isBelowLg = useMediaQuery('(max-width: 1023.98px)')
  const routeLayout = router.matches[router.matches.length - 1]?.staticData?.layout
  const isPlaygroundRoute = PLAYGROUND_PATHS.has(pathname)
  const isLandingLayout = routeLayout === 'landing' || (isPlaygroundRoute && isBelowLg)

  if (typeof document !== 'undefined') {
    const root = document.getElementById('root')
    root?.classList.toggle('landing', isLandingLayout)
  }

  // Landing layout không dùng sidebar
  if (isLandingLayout) {
    return (
      <Toast>
        <Outlet />
        {isBelowLg && <AppSidebar drawerOnly ref={appSidebarRef} />}
        <DocsFloatingDock sidebarRef={isBelowLg ? appSidebarRef : undefined} variant='landing' />
        <Toast.Container />
      </Toast>
    )
  }

  return (
    <Toast>
      <Name />
      <div id='app-navigation' />
      <AppSidebar ref={appSidebarRef} />
      <main className='docs-outlet'>
        <Outlet />
      </main>
      <DocsFloatingDock sidebarRef={appSidebarRef} variant='docs' />
      <Toast.Container />
    </Toast>
  )
}

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>Not Found</div>,
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    layout?: 'landing'
  }
}

