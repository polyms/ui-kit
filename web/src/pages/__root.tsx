// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toast } from '@polyms/ui-kit'
import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { AppSidebar } from '../layouts/AppSidebar'
import { DocsFloatingDock } from '../layouts/DocsFloatingDock'

import '../stores/app.store'
import '../stores/theme.store'
import { FaviconFit } from '../assets/FaviconFit'

const Name = () => {
	return (
		<div id='app-name'>
			<Link aria-label='Polyms home' className='flex items-center gap-1' to='/'>
				<FaviconFit className='h-10 w-auto' />
				<strong className='text-xl'>olyms</strong>
			</Link>
			<span className='badge badge-primary rounded-full px-4 font-bold whitespace-nowrap'>Design system</span>
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
