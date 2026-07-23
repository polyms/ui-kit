import { TocIndicator } from './TocIndicator'
import { TocItem } from './TocItem'
import { TocList } from './TocList'
import { TocRoot } from './TocRoot'

export const Toc = Object.assign(TocRoot, {
  List: TocList,
  Item: TocItem,
  Indicator: TocIndicator,
})

export { scrollToHeading, scrollToTop } from './scroll'
export { useToc } from './TocContext'
export type { TocIndicatorProps } from './TocIndicator'
export type { TocItemProps } from './TocItem'
export type { TocListProps } from './TocList'
export type { TocRootProps } from './TocRoot'
export type { UseVisibleHeadingsOptions } from './useVisibleHeadings'
export { useVisibleHeadings } from './useVisibleHeadings'
