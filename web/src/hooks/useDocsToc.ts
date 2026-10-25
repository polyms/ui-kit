import { tocByRoute } from 'virtual:mdx-navigation'
import { useRouterState } from '@tanstack/react-router'
import { useLayoutEffect, useMemo, useState } from 'react'
import { mergeDocsToc, type PageHeading, readPageHeadings, type TocItem } from './mergeDocsToc'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type { TocItem }

type HeadingSnapshot = {
	headings: PageHeading[]
	path: string
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

/** MDX route TOC, plus in-page h3 elements that already have an id. */
export function useDocsToc() {
	const activePath = useRouterState({ select: s => s.location.pathname })
	const mdxToc = useMemo(() => {
		const items = tocByRoute[activePath] ?? tocByRoute[activePath.replace(/\/$/, '')] ?? []
		return items as TocItem[]
	}, [activePath])
	const [snapshot, setSnapshot] = useState<HeadingSnapshot>({ headings: [], path: '' })

	useLayoutEffect(() => {
		const root = document.querySelector('.docs')
		const publish = (headings: PageHeading[]) => {
			setSnapshot(current => {
				if (current.path === activePath && sameHeadingList(current.headings, headings)) return current
				return { headings, path: activePath }
			})
		}

		if (!root) {
			publish([])
			return
		}

		publish(readPageHeadings(root))
		const observer = new MutationObserver(() => publish(readPageHeadings(root)))
		observer.observe(root, {
			attributeFilter: ['id'],
			attributes: true,
			childList: true,
			subtree: true,
		})
		return () => observer.disconnect()
	}, [activePath])

	const toc = useMemo(() => {
		if (snapshot.path !== activePath) return mdxToc
		return mergeDocsToc(mdxToc, snapshot.headings)
	}, [activePath, mdxToc, snapshot])

	return { toc }
}

function sameHeadingList(left: PageHeading[], right: PageHeading[]) {
	if (left.length !== right.length) return false
	return left.every((heading, index) => {
		const other = right[index]
		return heading.depth === other?.depth && heading.id === other.id && heading.title === other.title
	})
}
