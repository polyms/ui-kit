// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type SeoPage = {
	description: string
	markdown: boolean
	route: string
	title: string
}

export type SeoMeta = { name: string; content: string } | { property: string; content: string }

export type SeoLink = {
	href: string
	rel: string
	title?: string
	type?: string
}

export type SeoDocument = {
	jsonLd: Record<string, unknown> | null
	links: SeoLink[]
	metas: SeoMeta[]
	title: string
}

export type SitemapEntry = {
	lastmod: string
	route: string
}

export type SeoSummary = {
	route: string
	summary: string
	title: string
}

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

export const SITE_ORIGIN = 'https://ui.polyms.dev'
export const HOME_TITLE = 'Polyms UI Kit — React component library'
export const HOME_DESCRIPTION = 'Thoughtful React components with a playful side.'
export const DESCRIPTION_LIMIT = 155

// ── Pages ──────────────────────────────────────────────────────────────────────────────────────────────────

export function normalizeRoute(route: string) {
	const withSlash = route.startsWith('/') ? route : `/${route}`
	if (withSlash.length > 1 && withSlash.endsWith('/')) return withSlash.slice(0, -1)
	return withSlash
}

export function canonicalUrl(route: string) {
	const normalized = normalizeRoute(route)
	return normalized === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`
}

export function metaDescription(summary: string) {
	const text = summary.replace(/\s+/g, ' ').trim()
	if (!text) return ''
	const sentenceMatch = /^[\s\S]{0,400}?[.!?](?=\s|$)/.exec(text)
	const sentence = (sentenceMatch ? sentenceMatch[0] : text).trim()
	if (sentence.length <= DESCRIPTION_LIMIT) return sentence
	const slice = sentence.slice(0, DESCRIPTION_LIMIT + 1)
	const space = slice.lastIndexOf(' ')
	const cut = (space > 40 ? slice.slice(0, space) : sentence.slice(0, DESCRIPTION_LIMIT)).trim()
	return cut.replace(/[.,;:]+$/, '')
}

export function homeSeoPage(): SeoPage {
	return {
		description: HOME_DESCRIPTION,
		markdown: false,
		route: '/',
		title: 'Polyms UI Kit',
	}
}

export function seoPageFromSummary(input: SeoSummary): SeoPage {
	const title = input.title.trim() || 'Untitled'
	return {
		description: metaDescription(input.summary) || `${title} in Polyms UI Kit.`,
		markdown: true,
		route: normalizeRoute(input.route),
		title,
	}
}

export function playgroundTitle(name: 'Demo' | 'Forms') {
	return `${name} | Polyms UI Kit`
}

export function documentTitle(page: SeoPage) {
	return page.route === '/' ? HOME_TITLE : `${page.title} | Polyms UI Kit`
}

// ── Head ───────────────────────────────────────────────────────────────────────────────────────────────────

export function documentHead(page: SeoPage): SeoDocument {
	const title = documentTitle(page)
	const url = canonicalUrl(page.route)
	const links: SeoLink[] = [{ href: url, rel: 'canonical' }]
	if (page.markdown) {
		links.push({
			href: `${url}.md`,
			rel: 'alternate',
			title: page.title,
			type: 'text/markdown',
		})
	}
	return {
		jsonLd: page.route === '/' ? homeJsonLd() : docJsonLd(page, url),
		links,
		metas: [
			{ content: page.description, name: 'description' },
			{ content: title, property: 'og:title' },
			{ content: page.description, property: 'og:description' },
			{ content: url, property: 'og:url' },
			{ content: page.route === '/' ? 'website' : 'article', property: 'og:type' },
			{ content: 'summary', name: 'twitter:card' },
		],
		title,
	}
}

export function neutralDocument(): SeoDocument {
	return {
		jsonLd: null,
		links: [],
		metas: [{ content: HOME_DESCRIPTION, name: 'description' }],
		title: 'Polyms UI Kit',
	}
}

export function noindexDocument(title: string): SeoDocument {
	return {
		jsonLd: null,
		links: [],
		metas: [{ content: 'noindex, nofollow', name: 'robots' }],
		title,
	}
}

function homeJsonLd(): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: 'Polyms UI Kit',
				url: SITE_ORIGIN,
			},
			{
				'@type': 'SoftwareApplication',
				applicationCategory: 'DeveloperApplication',
				name: '@polyms/ui-kit',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
				},
				operatingSystem: 'Web',
				url: SITE_ORIGIN,
			},
		],
	}
}

function docJsonLd(page: SeoPage, url: string): Record<string, unknown> {
	const crumbs = [
		{ item: SITE_ORIGIN, name: 'Home' },
		{ item: url, name: page.title },
	]
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'TechArticle',
				description: page.description,
				headline: page.title,
				isPartOf: {
					'@type': 'WebSite',
					name: 'Polyms UI Kit',
					url: SITE_ORIGIN,
				},
				mainEntityOfPage: url,
				url,
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: crumbs.map((crumb, index) => ({
					'@type': 'ListItem',
					item: crumb.item,
					name: crumb.name,
					position: index + 1,
				})),
			},
		],
	}
}

// ── Crawl files ────────────────────────────────────────────────────────────────────────────────────────────

export function renderRobotsTxt() {
	return [
		'# Public docs are crawlable, including AI crawlers. Playgrounds are not.',
		'User-agent: *',
		'Allow: /',
		'Disallow: /demo',
		'Disallow: /forms',
		'',
		`Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
		'',
	].join('\n')
}

export function renderSitemap(entries: readonly SitemapEntry[]) {
	const urls = entries.map(entry => {
		const loc = escapeXml(canonicalUrl(entry.route))
		const lastmod = entry.lastmod.slice(0, 10)
		return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
	})
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function applySeoToHtml(html: string, document: SeoDocument) {
	const stripped = html.replace(/\t*<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n?/, '')
	const withTitle = stripped.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(document.title)}</title>`)
	if (!withTitle.includes('</head>')) throw new Error('index.html is missing </head>')
	const block = `\t\t<!-- seo:start -->\n${renderHeadInner(document)}\n\t\t<!-- seo:end -->\n`
	return withTitle.replace('</head>', `${block}\t</head>`)
}

function renderHeadInner(document: SeoDocument) {
	const lines: string[] = []
	for (const meta of document.metas) {
		if ('name' in meta) {
			lines.push(`<meta name="${escapeHtml(meta.name)}" content="${escapeHtml(meta.content)}">`)
			continue
		}
		lines.push(`<meta property="${escapeHtml(meta.property)}" content="${escapeHtml(meta.content)}">`)
	}
	for (const link of document.links) {
		const type = link.type ? ` type="${escapeHtml(link.type)}"` : ''
		const title = link.title ? ` title="${escapeHtml(link.title)}"` : ''
		lines.push(`<link rel="${escapeHtml(link.rel)}" href="${escapeHtml(link.href)}"${type}${title}>`)
	}
	if (document.jsonLd)
		lines.push(`<script type="application/ld+json">${jsonLdMarkup(document.jsonLd)}</script>`)
	return lines.map(line => `\t\t${line}`).join('\n')
}

export function jsonLdMarkup(jsonLd: Record<string, unknown>) {
	return JSON.stringify(jsonLd).replaceAll('<', '\\u003c')
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
}

function escapeXml(value: string) {
	return escapeHtml(value).replaceAll("'", '&apos;')
}
