import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import { useTocContext } from './TocContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface TocListProps extends useRender.ComponentProps<'ul'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TocList: FC<TocListProps> = ({ className, render, ref, ...props }) => {
  const listRef = useTocContext()?.listRef

  return useRender({
    defaultTagName: 'ul',
    ref: listRef == null ? ref : ref == null ? listRef : [listRef, ref],
    render,
    props: mergeProps<'ul'>({ className: clsx('toc-list', className) }, props),
  })
}
