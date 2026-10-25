import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC, RefObject } from 'react'
import { TocProvider } from './TocContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface TocRootProps extends useRender.ComponentProps<'nav'> {
	/** Ref to the element that scrolls. Defaults to the window. */
	scrollRef?: RefObject<Element | null> | null
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TocRoot: FC<TocRootProps> = ({ className, render, scrollRef, ref, ...props }) => {
	const element = useRender({
		defaultTagName: 'nav',
		ref,
		render,
		props: mergeProps<'nav'>({ 'aria-label': 'Table of contents', className: clsx('toc', className) }, props),
	})

	return <TocProvider scrollRef={scrollRef}>{element}</TocProvider>
}
