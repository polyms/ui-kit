import { type RefObject, useEffect, useLayoutEffect, useMemo, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type UseVisibleHeadingsOptions = {
	/** Element that scrolls (overflow container). Defaults to the window. */
	root?: RefObject<Element | null> | null
}

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

export function useVisibleHeadings(itemIds: string[], options: UseVisibleHeadingsOptions = {}) {
	const { root } = options
	const explicitRoot = root != null
	const [scrollEl, setScrollEl] = useState<Element | null>(null)
	const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set())
	const [primaryActiveId, setPrimaryActiveId] = useState<string | undefined>()
	const idsKey = itemIds.join('\0')

	useLayoutEffect(() => {
		if (!explicitRoot) {
			setScrollEl(null)
			return
		}
		setScrollEl(root.current)
	}, [explicitRoot, root, idsKey])

	useEffect(() => {
		const ids = idsKey.length === 0 ? [] : idsKey.split('\0')
		if (ids.length === 0) {
			setVisibleIds(new Set())
			setPrimaryActiveId(undefined)
			return
		}

		// scrollRef was passed but the element is not mounted yet — wait for layout sync.
		if (explicitRoot && !(scrollEl instanceof Element)) return

		const checkVisibility = () => {
			let topThreshold: number
			let bottomThreshold: number

			if (scrollEl instanceof Element) {
				const rootRect = scrollEl.getBoundingClientRect()
				topThreshold = rootRect.top + rootRect.height * 0.05
				bottomThreshold = rootRect.top + rootRect.height * 0.95
			} else {
				const viewportHeight = window.innerHeight
				topThreshold = viewportHeight * 0.05
				bottomThreshold = viewportHeight * 0.95
			}

			const visible: { id: string; top: number }[] = []

			for (const id of ids) {
				const el = document.getElementById(id)
				if (!el) continue

				const rect = el.getBoundingClientRect()
				if (rect.top < bottomThreshold && rect.bottom > topThreshold) {
					visible.push({ id, top: rect.top })
				}
			}

			visible.sort((a, b) => a.top - b.top)
			const nextIds = new Set(visible.map(item => item.id))
			const nextPrimary = visible[0]?.id

			setVisibleIds(prev => {
				if (prev.size === nextIds.size && [...prev].every(id => nextIds.has(id))) return prev
				return nextIds
			})
			setPrimaryActiveId(prev => (prev === nextPrimary ? prev : nextPrimary))
		}

		checkVisibility()

		let ticking = false
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					checkVisibility()
					ticking = false
				})
				ticking = true
			}
		}

		if (scrollEl instanceof Element) {
			scrollEl.addEventListener('scroll', handleScroll, { passive: true })
		} else {
			window.addEventListener('scroll', handleScroll, { passive: true })
		}
		window.addEventListener('resize', handleScroll, { passive: true })

		return () => {
			if (scrollEl instanceof Element) {
				scrollEl.removeEventListener('scroll', handleScroll)
			} else {
				window.removeEventListener('scroll', handleScroll)
			}
			window.removeEventListener('resize', handleScroll)
		}
	}, [idsKey, explicitRoot, scrollEl])

	return useMemo(() => ({ visibleIds, primaryActiveId }), [visibleIds, primaryActiveId])
}
