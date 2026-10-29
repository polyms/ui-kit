import { seoByRoute } from 'virtual:seo-meta'
import { createFileRoute } from '@tanstack/react-router'

import { noindexHead, routeHead } from '../seo/head'

export const Route = createFileRoute('/$')({
	head: ({ params }) => {
		const splat = String(params._splat ?? '').replace(/^\/+|\/+$/g, '')
		const page = splat ? seoByRoute[`/${splat}`] : undefined
		return page ? routeHead(page) : noindexHead('Not found | Polyms UI Kit')
	},
})
