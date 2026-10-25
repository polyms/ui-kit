import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { type FC, type MouseEvent, useEffect, useRef } from 'react'
import { scrollToHeading } from './scroll'
import { useTocContext } from './TocContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface TocItemProps extends useRender.ComponentProps<'a'> {
	depth?: number
	/** Override scroll-spy visible state. Defaults to context from `Toc`. */
	visible?: boolean
	/** Override scroll-spy primary state. Defaults to context from `Toc`. */
	primary?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TocItem: FC<TocItemProps> = ({
	className,
	render,
	href,
	depth,
	visible: visibleProp,
	primary: primaryProp,
	children,
	onClick,
	ref,
	...props
}) => {
	const ctx = useTocContext()
	const registerItem = ctx?.registerItem
	const elementRef = useRef<HTMLElement | null>(null)
	const headingId = href?.startsWith('#') ? href.slice(1) : undefined

	const visible = visibleProp ?? (headingId ? (ctx?.visibleIds.has(headingId) ?? false) : false)
	const primary = primaryProp ?? (headingId ? headingId === ctx?.primaryActiveId : false)

	useEffect(() => {
		if (!registerItem || !headingId || !elementRef.current) return
		return registerItem(headingId, elementRef.current)
	}, [registerItem, headingId])

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(event)
		if (event.defaultPrevented || !headingId || !href?.startsWith('#')) return
		event.preventDefault()
		scrollToHeading(headingId)
	}

	const interactive = useRender({
		defaultTagName: href ? 'a' : 'button',
		ref: ref == null ? elementRef : [elementRef, ref],
		render,
		props: mergeProps<'a'>(
			{
				...(href ? { href, onClick: handleClick } : { type: 'button' as const, onClick }),
				className: clsx(
					'toc-item',
					depth === 3 && 'toc-item-depth-3',
					depth === 4 && 'toc-item-depth-4',
					visible && 'is-visible',
					primary && 'is-primary',
					className
				),
				children,
			},
			props
		),
	})

	return <li>{interactive}</li>
}
