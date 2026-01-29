import { MDXProvider } from '@mdx-js/react'
import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'
import clsx from 'clsx'
import { useRef } from 'react'

// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppSidebar } from '../layouts/AppSidebar'
import { CodePreview } from '../layouts/CodePreview'

// import { Root, TopNavbar } from '../layouts/Layout.styled'
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className='h1 mb-xs' {...props}>
      {props.children}
    </h1>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='mb-3xs font-mono font-semibold text-neutral-500 text-xs uppercase' {...props}>
      {props.children}
    </h3>
  ),
  // biome-ignore lint/style/useNamingConvention: off
  CodePreview,
}

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
      <main className='overflow-auto md:overflow-clip'>
        {/* <TopNavbar className='border-bottom flex py-0 pe-0'>
          <Logo />
          <div id='top-navbar' className='flex-fill' />
        </TopNavbar> */}
        <div className={clsx('flex flex-col', className)}>
          <MDXProvider components={mdxComponents}>
            <Outlet />
          </MDXProvider>
        </div>
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
