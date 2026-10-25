import { pages } from 'virtual:mdx-navigation'
import {
	AiChemistry02Icon,
	ChatFeedback01Icon,
	CodeIcon,
	CursorMagicSelection04Icon,
	GoogleDocIcon,
	InputCursorTextIcon,
	Share08Icon,
	ThreeDScaleIcon,
} from '@hugeicons/core-free-icons'
import { useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type DocsNavSection = {
	key: string
	label: string
	icon: typeof GoogleDocIcon
	colorClass: string
	items: { label: string; path: string }[]
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────

// biome-ignore-start lint/style/useNamingConvention: section labels from frontmatter
const iconMaps = {
	Guide: GoogleDocIcon,
	Actions: CursorMagicSelection04Icon,
	'Data input': InputCursorTextIcon,
	Feedback: ChatFeedback01Icon,
	Navigation: Share08Icon,
	Others: ThreeDScaleIcon,
	Utils: CodeIcon,
} as const

const colors = {
	Guide: 'text-warning-400',
	Actions: 'text-success-400',
	'Data input': 'text-info-400',
	Feedback: 'text-danger-400',
	Navigation: 'text-primary-400',
	Others: 'text-danger-400',
	Utils: 'text-neutral-400',
} as const
// biome-ignore-end lint/style/useNamingConvention: section labels from frontmatter

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

export function useDocsNav(search = '') {
	const sections = useMemo(() => {
		const nav: Record<string, DocsNavSection['items']> = {}
		const q = search.trim().toLowerCase()

		for (const page of pages) {
			const label = page.title || 'Untitled'
			const path = page.route
			if (q) {
				const haystack = `${label} ${path}`.toLowerCase()
				if (!haystack.includes(q)) continue
			}

			const section = page.metadata.type || 'Others'
			if (!nav[section]) {
				nav[section] = []
			}

			nav[section].push({ label, path })
		}

		return Object.entries(nav)
			.filter(([, sectionItems]) => sectionItems.length > 0)
			.sort(([labelA], [labelB]) => {
				const pin = (label: string) => {
					if (label === 'Guide') return -1
					if (label === 'Others') return 1
					if (label === 'Utils') return 2
					return 0
				}
				const diff = pin(labelA) - pin(labelB)
				if (diff !== 0) return diff
				return labelA.localeCompare(labelB)
			})
			.map(([label, items]) => ({
				key: label,
				label,
				icon: iconMaps[label as keyof typeof iconMaps] || GoogleDocIcon,
				colorClass: colors[label as keyof typeof colors] || 'text-neutral-400',
				items: items.sort((a, b) => {
					if (label === 'Guide') {
						const pinItem = (item: { path: string }) => (item.path === '/installation' ? -1 : 0)
						const itemDiff = pinItem(a) - pinItem(b)
						if (itemDiff !== 0) return itemDiff
					}
					return a.label.localeCompare(b.label)
				}),
			}))
	}, [search])

	const showExamplesNav = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return true
		return 'examples page demo'.includes(q)
	}, [search])

	return { sections, showExamplesNav, examplesIcon: AiChemistry02Icon }
}
