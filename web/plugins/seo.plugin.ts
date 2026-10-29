import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

import { generateLlmDocs, type LlmPage } from '../scripts/mdx-to-llm.ts'
import {
	applySeoToHtml,
	documentHead,
	homeSeoPage,
	neutralDocument,
	noindexDocument,
	playgroundTitle,
	renderRobotsTxt,
	renderSitemap,
	type SeoPage,
	type SitemapEntry,
	seoPageFromSummary,
} from '../src/seo/document.ts'

// ── Paths ──────────────────────────────────────────────────────────────────────────────────────────────────

const webRoot = path.resolve(import.meta.dirname, '..')
const publicDir = path.join(webRoot, 'public')
const virtualId = 'virtual:seo-meta'
const resolvedVirtualId = `\0${virtualId}`

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function seoPlugin(): Plugin {
	let llmPages: LlmPage[] = []
	let seoPages: SeoPage[] = [homeSeoPage()]
	let refreshQueue: Promise<void> = Promise.resolve()

	async function refresh() {
		llmPages = await generateLlmDocs()
		seoPages = [homeSeoPage(), ...llmPages.map(page => seoPageFromSummary(page))]
		const homeUpdated = fs.statSync(path.join(webRoot, 'src/pages/index.tsx')).mtime.toISOString()
		fs.writeFileSync(path.join(publicDir, 'robots.txt'), renderRobotsTxt())
		fs.writeFileSync(
			path.join(publicDir, 'sitemap.xml'),
			renderSitemap(sitemapEntries(llmPages, homeUpdated))
		)
	}

	function enqueue() {
		const run = refreshQueue.then(() => refresh())
		refreshQueue = run.then(
			() => undefined,
			() => undefined
		)
		return run
	}

	return {
		name: 'seo',
		async buildStart() {
			await enqueue()
		},
		closeBundle() {
			const dist = path.resolve(webRoot, '../dist/web')
			const indexPath = path.join(dist, 'index.html')
			if (!fs.existsSync(indexPath)) return
			const html = fs.readFileSync(indexPath, 'utf8')
			const write = (relative: string, pageHtml: string) => {
				const dest = path.join(dist, relative)
				fs.mkdirSync(path.dirname(dest), { recursive: true })
				fs.writeFileSync(dest, pageHtml)
			}
			write('spa.html', applySeoToHtml(html, neutralDocument()))
			write('index.html', applySeoToHtml(html, documentHead(homeSeoPage())))
			write('demo.html', applySeoToHtml(html, noindexDocument(playgroundTitle('Demo'))))
			write('forms.html', applySeoToHtml(html, noindexDocument(playgroundTitle('Forms'))))
			for (const page of seoPages) {
				if (page.route === '/') continue
				write(`${page.route.slice(1)}.html`, applySeoToHtml(html, documentHead(page)))
			}
		},
		configureServer(server) {
			const invalidate = () => {
				const mod = server.moduleGraph.getModuleById(resolvedVirtualId)
				if (mod) server.moduleGraph.invalidateModule(mod)
			}
			const onMdx = (file: string) => {
				if (!file.endsWith('.mdx')) return
				void enqueue()
					.then(invalidate)
					.catch(error => console.error('[seo]', error))
			}
			server.watcher.on('add', onMdx)
			server.watcher.on('change', onMdx)
			server.watcher.on('unlink', onMdx)
		},
		load(id) {
			if (id !== resolvedVirtualId) return
			const seoByRoute = Object.fromEntries(seoPages.map(page => [page.route, page]))
			return `export const seoByRoute = ${JSON.stringify(seoByRoute, null, 2)}\n`
		},
		resolveId(id) {
			if (id === virtualId) return resolvedVirtualId
		},
	}
}

function sitemapEntries(pages: readonly LlmPage[], homeUpdated: string): SitemapEntry[] {
	return [
		{ lastmod: homeUpdated, route: '/' },
		...pages.map(page => ({ lastmod: page.updated, route: page.route })),
	].sort((a, b) => a.route.localeCompare(b.route))
}
