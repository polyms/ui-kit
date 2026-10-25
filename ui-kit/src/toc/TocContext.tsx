import {
	createContext,
	type ReactNode,
	type RefObject,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useVisibleHeadings } from './useVisibleHeadings'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type TocRegisteredItem = {
	id: string
	element: HTMLElement
}

type TocContextValue = {
	registerItem: (id: string, element: HTMLElement) => () => void
	items: TocRegisteredItem[]
	listRef: RefObject<HTMLElement | null>
	visibleIds: Set<string>
	primaryActiveId?: string
}

type TocProviderProps = {
	children: ReactNode
	scrollRef?: RefObject<Element | null> | null
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const TocContext = createContext<TocContextValue | null>(null)

export function TocProvider({ children, scrollRef }: TocProviderProps) {
	const listRef = useRef<HTMLElement | null>(null)
	const [items, setItems] = useState<TocRegisteredItem[]>([])

	const registerItem = useCallback((id: string, element: HTMLElement) => {
		setItems(prev => {
			const existing = prev.find(item => item.id === id)
			if (existing && existing.element === element) return prev
			return [...prev.filter(item => item.id !== id), { id, element }]
		})

		return () => {
			setItems(prev => prev.filter(item => item.id !== id))
		}
	}, [])

	const itemIds = useMemo(() => items.map(item => item.id), [items])
	const { visibleIds, primaryActiveId } = useVisibleHeadings(itemIds, { root: scrollRef })

	const value = useMemo(
		() => ({ registerItem, items, listRef, visibleIds, primaryActiveId }),
		[registerItem, items, visibleIds, primaryActiveId]
	)

	return <TocContext.Provider value={value}>{children}</TocContext.Provider>
}

export function useTocContext() {
	return useContext(TocContext)
}

/** Read scroll-spy state from the nearest `Toc` root. */
export function useToc() {
	const ctx = useTocContext()
	if (!ctx) {
		throw new Error('useToc must be used within Toc')
	}
	return {
		visibleIds: ctx.visibleIds,
		primaryActiveId: ctx.primaryActiveId,
		items: ctx.items,
	}
}
