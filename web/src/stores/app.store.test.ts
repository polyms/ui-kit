// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { track } from '../core/tracking'
import { useAppStore } from './app.store'

vi.mock('../core/tracking', () => ({
	track: vi.fn(),
}))

// ── Tests ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('app theme', () => {
	beforeEach(() => {
		localStorage.clear()
		useAppStore.setState({ theme: 'light' })
		vi.mocked(track).mockClear()
	})

	it('tracks the theme a toggle lands on', () => {
		useAppStore.getState().toggleTheme()
		expect(useAppStore.getState().theme).toBe('dark')
		expect(track).toHaveBeenCalledTimes(1)
		expect(track).toHaveBeenCalledWith('Toggled Theme', { theme: 'dark' })
	})

	it('tracks an explicit appearance change and ignores a repeat of the current theme', () => {
		useAppStore.getState().setTheme('dark')
		expect(track).toHaveBeenCalledWith('Toggled Theme', { theme: 'dark' })
		vi.mocked(track).mockClear()
		useAppStore.getState().setTheme('dark')
		expect(track).not.toHaveBeenCalled()
		expect(useAppStore.getState().theme).toBe('dark')
	})

	it('does not track when theme state is restored without a user action', () => {
		useAppStore.setState({ theme: 'dark' })
		expect(track).not.toHaveBeenCalled()
		expect(useAppStore.getState().theme).toBe('dark')
	})
})
