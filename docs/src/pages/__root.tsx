// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'
import { useRef } from 'react'

import { AppSidebar } from '../layouts/AppSidebar'

const Navigation = ({ onToggleSidebar }: NavigationProps) => {
  return (
    <div className='flex h-14 shrink-0 items-center gap-2 px-4' id='navigation'>
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
    <div className='name hidden h-14 items-center gap-2 px-4 font-semibold text-sm tracking-wide md:flex'>
      <img alt='logo' className='h-6' src='/favicon.png' />
      Polyms • Core UI
    </div>
  )
}

const Root = () => {
  const matches = useMatches()
  const className = matches.at(-1)?.staticData.className
  const appSidebarRef = useRef<AppSidebar.Ref>(null)

  return (
    <>
      <Name />
      <Navigation onToggleSidebar={() => appSidebarRef.current?.toggleSidebar()} />
      <AppSidebar ref={appSidebarRef} />
      <main className={className}>
        <Outlet />
      </main>
    </>
  )
}

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>Not Found</div>,
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    className?: string
  }
}

type NavigationProps = {
  onToggleSidebar?: AppSidebar.Ref['toggleSidebar']
}
