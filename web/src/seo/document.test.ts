import { describe, expect, it } from 'vitest'

import {
	applySeoToHtml,
	DESCRIPTION_LIMIT,
	documentHead,
	HOME_DESCRIPTION,
	HOME_TITLE,
	homeSeoPage,
	metaDescription,
	neutralDocument,
	noindexDocument,
	renderRobotsTxt,
	renderSitemap,
	seoPageFromSummary,
} from './document'

const shell = '<!doctype html><html><head><title>Old</title></head><body><div id="root"></div></body></html>'

// ── Tests ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('seo document', () => {
	it('keeps the first sentence when it fits the description limit', () => {
		expect(metaDescription('Buttons trigger actions. More text here.')).toBe('Buttons trigger actions.')
	})

	it('truncates a long sentence on a word boundary', () => {
		const description = metaDescription(`${Array.from({ length: 40 }, () => 'word').join(' ')}.`)
		expect(description.length).toBeLessThanOrEqual(DESCRIPTION_LIMIT)
		expect(description.endsWith('word')).toBe(true)
		expect(description.split(' ').every(word => word === 'word')).toBe(true)
	})

	it('builds the homepage head with website schema and no markdown alternate', () => {
		expect(HOME_DESCRIPTION).toBe('Thoughtful React components with a playful side.')
		const document = documentHead(homeSeoPage())
		expect(document.title).toBe(HOME_TITLE)
		expect(document.metas.flatMap(meta => ('name' in meta ? [meta.name] : []))).toEqual([
			'description',
			'twitter:card',
		])
		expect(document.links).toEqual([{ href: 'https://ui.polyms.dev', rel: 'canonical' }])
		const graph = document.jsonLd?.['@graph'] as { '@type': string }[]
		expect(graph.map(node => node['@type'])).toEqual(['WebSite', 'SoftwareApplication'])
		expect(JSON.stringify(document.jsonLd)).toContain('"price":"0"')
		expect(JSON.stringify(document.jsonLd)).not.toContain('FAQPage')
	})

	it('builds a docs head with article schema, breadcrumb, and markdown alternate', () => {
		const page = seoPageFromSummary({
			route: '/docs/button/',
			summary: 'Trigger an action or event. Extra sentence that should stay out of the description.',
			title: 'Button',
		})
		const document = documentHead(page)
		expect(document.title).toBe('Button | Polyms UI Kit')
		expect(document.metas).toContainEqual({ content: 'Trigger an action or event.', name: 'description' })
		expect(document.links).toContainEqual({ href: 'https://ui.polyms.dev/docs/button', rel: 'canonical' })
		expect(document.links).toContainEqual({
			href: 'https://ui.polyms.dev/docs/button.md',
			rel: 'alternate',
			title: 'Button',
			type: 'text/markdown',
		})
		const graph = document.jsonLd?.['@graph'] as { '@type': string; itemListElement?: { name: string }[] }[]
		expect(graph.map(node => node['@type'])).toEqual(['TechArticle', 'BreadcrumbList'])
		expect(graph[1]?.itemListElement?.map(item => item.name)).toEqual(['Home', 'Button'])
	})

	it('leaves the shared shell without a canonical url', () => {
		const document = neutralDocument()
		expect(document.links).toEqual([])
		expect(document.jsonLd).toBeNull()
		expect(document.title).toBe('Polyms UI Kit')
		expect(document.metas).toEqual([{ content: HOME_DESCRIPTION, name: 'description' }])
	})

	it('marks playground shells noindex without a canonical url', () => {
		const document = noindexDocument('Demo | Polyms UI Kit')
		expect(document.metas).toContainEqual({ content: 'noindex, nofollow', name: 'robots' })
		expect(document.links).toEqual([])
		expect(document.jsonLd).toBeNull()
	})

	it('writes robots rules for the public site and the playgrounds', () => {
		const robots = renderRobotsTxt()
		expect(robots).toContain('User-agent: *')
		expect(robots).toContain('Allow: /')
		expect(robots).toContain('Disallow: /demo')
		expect(robots).toContain('Disallow: /forms')
		expect(robots).not.toContain('Disallow: /spa')
		expect(robots).toContain('Sitemap: https://ui.polyms.dev/sitemap.xml')
		expect(robots).not.toContain('Disallow: /docs')
	})

	it('writes sitemap locs for html routes only', () => {
		const xml = renderSitemap([
			{ lastmod: '2026-10-30T01:02:03.000Z', route: '/' },
			{ lastmod: '2026-10-29T00:00:00.000Z', route: '/docs/button' },
		])
		expect(xml).toContain('<loc>https://ui.polyms.dev</loc>')
		expect(xml).toContain('<lastmod>2026-10-30</lastmod>')
		expect(xml).toContain('<loc>https://ui.polyms.dev/docs/button</loc>')
		expect(xml).not.toContain('.md')
		expect(xml).not.toContain('/demo')
	})

	it('injects one seo block into the html shell', () => {
		const once = applySeoToHtml(
			shell,
			documentHead(
				seoPageFromSummary({
					route: '/docs/button',
					summary: 'Trigger an action.',
					title: 'Button',
				})
			)
		)
		const twice = applySeoToHtml(once, neutralDocument())
		expect(once).toContain('<title>Button | Polyms UI Kit</title>')
		expect(once).toContain('rel="canonical" href="https://ui.polyms.dev/docs/button"')
		expect(once).toContain('application/ld+json')
		expect(twice.match(/<!-- seo:start -->/g)).toHaveLength(1)
		expect(twice).toContain('<title>Polyms UI Kit</title>')
		expect(twice).not.toContain('rel="canonical"')
		expect(twice).not.toContain('noindex')
	})
})
