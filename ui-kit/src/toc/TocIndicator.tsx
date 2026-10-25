import clsx from 'clsx'
import { type ComponentProps, type FC, useEffect, useRef } from 'react'
import { useTocContext } from './TocContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface TocIndicatorProps extends ComponentProps<'div'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TocIndicator: FC<TocIndicatorProps> = ({ className, style, ...props }) => {
	const ctx = useTocContext()
	const indicatorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const indicator = indicatorRef.current
		const listEl = ctx?.listRef.current
		if (!indicator || !listEl || !ctx) return

		const visibleItems = ctx.items
			.filter(item => ctx.visibleIds.has(item.id))
			.sort((a, b) => a.element.getBoundingClientRect().top - b.element.getBoundingClientRect().top)

		const firstItem = visibleItems[0]
		const lastItem = visibleItems[visibleItems.length - 1]
		if (!firstItem || !lastItem) {
			indicator.style.opacity = '0'
			return
		}

		const listRect = listEl.getBoundingClientRect()
		const top = firstItem.element.getBoundingClientRect().top - listRect.top
		const bottom = lastItem.element.getBoundingClientRect().bottom - listRect.top
		indicator.style.top = `${top}px`
		indicator.style.height = `${bottom - top}px`
		indicator.style.opacity = '1'
	}, [ctx?.items, ctx?.listRef, ctx?.visibleIds])

	return (
		<div
			{...props}
			aria-hidden
			className={clsx('toc-indicator', className)}
			ref={indicatorRef}
			style={style}
		/>
	)
}
