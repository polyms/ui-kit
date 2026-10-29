import './core/tracking/client'

import * as Sentry from '@sentry/react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import * as ReactDom from 'react-dom/client'

import { routeTree } from './routeTree.gen'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)
const router = createRouter({
	routeTree,
	basepath: '/',
	defaultPreload: 'intent',
	defaultErrorComponent: ({ error }) => {
		const message = error instanceof Error ? error.message : 'Something went wrong'
		return <div>{message}</div>
	},
	defaultOnCatch: error => {
		Sentry.captureException(error)
	},
})

if (Sentry.getClient()) {
	Sentry.addIntegration(Sentry.tanstackRouterBrowserTracingIntegration(router))
}
// Same-URL loads (Vite HMR refreshing the active route) still emit onRendered.
// The router treats that as a new visit and scrolls to the top.
if (import.meta.hot) {
	router.subscribe('onBeforeLoad', event => {
		if (!event.hrefChanged) router._scroll.n = false
	})
}

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
