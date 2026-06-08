// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toast } from '@polyms/core'
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { AppSidebar } from '../layouts/AppSidebar'
import { DocsFloatingDock } from '../layouts/DocsFloatingDock'

import '../stores/app.store'

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
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const routeLayout = router.matches[router.matches.length - 1]?.staticData?.layout
  const isPlaygroundRoute = routeLayout === 'playground'
  const isLandingLayout = routeLayout === 'landing' || (isPlaygroundRoute && !isDesktop)
  const isHomePage = router.location.pathname === '/'

  if (typeof document !== 'undefined') {
    const root = document.getElementById('root')
    root?.classList.toggle('landing', isLandingLayout)
    root?.classList.toggle('playground', isPlaygroundRoute && !isLandingLayout)
  }

  // Landing layout không dùng sidebar
  if (isLandingLayout) {
    return (
      <Toast>
        <Outlet />
        {isDesktop && <AppSidebar drawerOnly ref={appSidebarRef} />}
        {!isHomePage && (
          <DocsFloatingDock sidebarRef={isDesktop ? appSidebarRef : undefined} variant='landing' />
        )}
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
    layout?: 'landing' | 'playground'
  }
}
