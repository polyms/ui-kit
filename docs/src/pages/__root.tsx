import { MDXProvider } from '@mdx-js/react'
import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'
import clsx from 'clsx'

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

const Root = () => {
  const matches = useMatches()
  const className = matches.at(-1)?.staticData.className

  return (
    <>
      <AppSidebar />

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

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    className?: string
  }
}
