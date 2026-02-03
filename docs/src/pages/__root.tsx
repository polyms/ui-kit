// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toast } from '@polyms/core'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useRef } from 'react'
import { AppSidebar } from '../layouts/AppSidebar'

const AppNavigation = ({ onToggleSidebar }: NavigationProps) => {
  return (
    <div id='app-navigation'>
      <button
        className='ml-auto inline-flex items-center justify-center rounded-md border border-slate-300 px-2 py-1 font-medium text-xs md:hidden'
        onClick={onToggleSidebar}
        type='button'
      >
        Menu
      </button>
    </div>
  )
}

const Name = () => {
  return (
    <div className='hidden h-14 items-center gap-2 px-4 tracking-wide md:flex' id='app-name'>
      <img alt='logo' className='h-10' src='/favicon.png' />
      <strong className='text-xl'>Polyms</strong>
      <span className='text-sm'> • Core UI</span>
    </div>
  )
}

const Root = () => {
  const appSidebarRef = useRef<AppSidebar.Ref>(null)

  return (
    <Toast>
      <Name />
      <AppNavigation onToggleSidebar={() => appSidebarRef.current?.toggleSidebar()} />
      <AppSidebar ref={appSidebarRef} />
      <Outlet />
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
    // className?: string
  }
}

type NavigationProps = {
  onToggleSidebar?: AppSidebar.Ref['toggleSidebar']
}
