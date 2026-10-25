// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type TocItem = {
	depth: number
	title: string
	url: string
}

export type PageHeading = {
	depth: number
	id: string
	title: string
}

type RankedTocItem = {
	item: TocItem
	major: number
	minor: number
}

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

/** h2/h3 that already have an id, in document order. h4 variant labels stay out. */
export function readPageHeadings(root: ParentNode): PageHeading[] {
	const headings: PageHeading[] = []

	for (const element of root.querySelectorAll<HTMLElement>('h2[id], h3[id]')) {
		const id = element.id.trim()
		const title = (element.textContent ?? '').replace(/\s+/g, ' ').trim()
		if (!id || !title) continue
		headings.push({ depth: element.tagName === 'H3' ? 3 : 2, id, title })
	}

	return headings
}

/**
 * Insert in-page h3s that are missing from the MDX TOC.
 * Existing items stay, and the result follows document order.
 */
export function mergeDocsToc(mdxToc: TocItem[], pageHeadings: PageHeading[]): TocItem[] {
	const known = new Set(mdxToc.map(item => item.url))
	const extras = pageHeadings.filter(heading => heading.depth === 3 && !known.has(`#${heading.id}`))
	if (!extras.length) return mdxToc

	const pageIndex = new Map(pageHeadings.map((heading, index) => [`#${heading.id}`, index]))
	const ranked: RankedTocItem[] = []
	let lastMajor = -1
	let minor = 0

	for (const item of mdxToc) {
		const domOrder = pageIndex.get(item.url)
		if (domOrder == null) {
			minor += 1
			ranked.push({ item, major: lastMajor, minor })
			continue
		}
		lastMajor = domOrder
		minor = 0
		ranked.push({ item, major: domOrder, minor: 0 })
	}

	for (const heading of extras) {
		const title = heading.title.replace(/\s+/g, ' ').trim()
		const major = pageIndex.get(`#${heading.id}`)
		if (!title || major == null) continue
		ranked.push({ item: { depth: 3, title, url: `#${heading.id}` }, major, minor: 0 })
	}

	ranked.sort((a, b) => a.major - b.major || a.minor - b.minor)
	return ranked.map(entry => entry.item)
}
