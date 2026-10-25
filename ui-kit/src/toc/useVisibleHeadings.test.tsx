import { act, renderHook } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useVisibleHeadings } from './useVisibleHeadings'

// ── Hooks ──────────────────────────────────────────────────────────────────────────────────────────────────

function mockRect(top: number, bottom: number): DOMRect {
	return {
		top,
		bottom,
		height: bottom - top,
		width: 100,
		left: 0,
		right: 100,
		x: 0,
		y: top,
		toJSON: () => ({}),
	} as DOMRect
}

describe('useVisibleHeadings', () => {
	beforeEach(() => {
		vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
			cb(0)
			return 0
		})
	})

	afterEach(() => {
		vi.unstubAllGlobals()
		document.body.innerHTML = ''
	})

	it('returns empty visible set when no ids', () => {
		const { result } = renderHook(() => useVisibleHeadings([]))
		expect(result.current.visibleIds.size).toBe(0)
		expect(result.current.primaryActiveId).toBeUndefined()
	})

	it('marks topmost in-viewport heading as primary', () => {
		const first = document.createElement('h2')
		first.id = 'first'
		first.getBoundingClientRect = () => mockRect(100, 140)

		const second = document.createElement('h2')
		second.id = 'second'
		second.getBoundingClientRect = () => mockRect(200, 240)

		document.body.append(first, second)
		Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })

		const { result } = renderHook(() => useVisibleHeadings(['first', 'second']))

		expect(result.current.visibleIds.has('first')).toBe(true)
		expect(result.current.visibleIds.has('second')).toBe(true)
		expect(result.current.primaryActiveId).toBe('first')
	})

	it('updates primary after scroll when heading rects change', () => {
		const first = document.createElement('h2')
		first.id = 'first'
		first.getBoundingClientRect = () => mockRect(100, 140)

		const second = document.createElement('h2')
		second.id = 'second'
		second.getBoundingClientRect = () => mockRect(200, 240)

		document.body.append(first, second)
		Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })

		const { result } = renderHook(() => useVisibleHeadings(['first', 'second']))
		expect(result.current.primaryActiveId).toBe('first')

		first.getBoundingClientRect = () => mockRect(-100, -20)
		second.getBoundingClientRect = () => mockRect(120, 160)

		act(() => {
			window.dispatchEvent(new Event('scroll'))
		})

		expect(result.current.primaryActiveId).toBe('second')
		expect(result.current.visibleIds.has('first')).toBe(false)
	})

	it('listens to a custom scroll root instead of window', () => {
		const root = document.createElement('div')
		root.getBoundingClientRect = () => mockRect(0, 400)
		const rootRef = createRef<Element>()
		;(rootRef as { current: Element | null }).current = root

		const heading = document.createElement('h2')
		heading.id = 'in-root'
		heading.getBoundingClientRect = () => mockRect(80, 120)
		document.body.append(root, heading)

		const addSpy = vi.spyOn(root, 'addEventListener')
		const winAddSpy = vi.spyOn(window, 'addEventListener')

		renderHook(() => useVisibleHeadings(['in-root'], { root: rootRef }))

		expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
		expect(winAddSpy.mock.calls.some(call => call[0] === 'scroll')).toBe(false)
	})

	it('does not fall back to window while an explicit scroll ref is still empty', () => {
		const rootRef = createRef<Element>()
		const winAddSpy = vi.spyOn(window, 'addEventListener')

		renderHook(() => useVisibleHeadings(['pending'], { root: rootRef }))

		expect(winAddSpy.mock.calls.some(call => call[0] === 'scroll')).toBe(false)
	})
})
