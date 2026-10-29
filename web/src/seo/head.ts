import { documentHead, jsonLdMarkup, noindexDocument, type SeoDocument, type SeoPage } from './document'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function routeHead(page: SeoPage) {
	return toRouterHead(documentHead(page))
}

export function noindexHead(title: string) {
	return toRouterHead(noindexDocument(title))
}

function toRouterHead(document: SeoDocument) {
	return {
		links: document.links,
		meta: [{ title: document.title }, ...document.metas],
		scripts: document.jsonLd
			? [{ children: jsonLdMarkup(document.jsonLd), type: 'application/ld+json' }]
			: [],
	}
}
