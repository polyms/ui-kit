// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toast } from '@polyms/ui-kit'
import { createRootRoute, HeadContent, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useRef } from 'react'
import { BrandLogo } from '../components/BrandLogo'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { AppSidebar } from '../layouts/AppSidebar'
import { DocsFloatingDock } from '../layouts/DocsFloatingDock'

import '../stores/app.store'
import '../stores/theme.store'

const Name = () => {
	return (
		<div id='app-name'>
			<Link aria-label='Polyms home' className='flex items-center gap-1' data-testid='brand-home-link' to='/'>
				<BrandLogo className='gap-1' iconClassName='h-10 w-auto'>
					<strong className='text-xl'>olyms</strong>
				</BrandLogo>
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

	if (typeof document !== 'undefined') {
		const root = document.getElementById('root')
		root?.classList.toggle('landing', isLandingLayout)
		root?.classList.toggle('playground', isPlaygroundRoute && !isLandingLayout)
	}

	// Landing layout không dùng sidebar
	if (isLandingLayout) {
		return (
			<Toast>
				<HeadContent />
				<Outlet />
				<DocsFloatingDock variant='landing' />
				<Toast.Container />
			</Toast>
		)
	}

	return (
		<Toast>
			<HeadContent />
			<Name />
			<div data-testid='app-navigation' id='app-navigation' />
			<AppSidebar ref={appSidebarRef} />
			<main className='docs-outlet' data-testid='docs-route-content'>
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
