// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LandingPlayground } from './LandingPlayground'

// ── Tests ──────────────────────────────────────────────────────────────────────────────────────────────────

afterEach(() => {
	cleanup()
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
})

describe('Landing playground', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'matchMedia',
			vi.fn().mockImplementation((query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}))
		)
	})

	it.each([
		['Try a dialog', 'playground-dialog'],
		['Try an offcanvas', 'playground-offcanvas'],
	])('carries preview tokens into the %s portal and restores focus', async (label, testId) => {
		const user = userEvent.setup()
		render(<LandingPlayground />)
		await user.click(screen.getByRole('button', { name: 'Violet' }))
		await user.click(screen.getByRole('checkbox', { name: 'Dark preview' }))
		const trigger = screen.getByRole('button', { name: label })
		await user.click(trigger)
		const overlay = screen.getByTestId(testId)
		expect(overlay).toHaveAttribute('data-mode', 'dark')
		expect(overlay).toHaveAttribute('data-palette', 'violet')
		expect(overlay.style.getPropertyValue('--color-primary-700')).toBe('var(--color-violet-700)')
		await user.keyboard('{Escape}')
		expect(trigger).toHaveFocus()
	})

	it('keeps color and dark mode changes inside the demo', async () => {
		const user = userEvent.setup()
		const rootStyle = document.documentElement.style.cssText
		const rootClass = document.documentElement.className
		render(<LandingPlayground />)
		await user.click(screen.getByRole('button', { name: 'Violet' }))
		expect(screen.getByRole('button', { name: 'Violet' })).toHaveAttribute('aria-pressed', 'true')
		expect(screen.getByTestId('landing-preview')).toHaveAttribute('data-palette', 'violet')
		await user.click(screen.getByRole('checkbox', { name: 'Dark preview' }))
		expect(screen.getByTestId('landing-preview')).toHaveAttribute('data-mode', 'dark')
		expect(document.documentElement.style.cssText).toBe(rootStyle)
		expect(document.documentElement.className).toBe(rootClass)
	})

	it('starts on the brand orange ramp and keeps overlay ctas pill-shaped', async () => {
		const user = userEvent.setup()
		render(<LandingPlayground />)
		const preview = screen.getByTestId('landing-preview')
		expect(preview).toHaveAttribute('data-palette', 'orange')
		expect(preview.style.getPropertyValue('--color-primary-500')).toBe('oklch(75% 0.19 48)')
		expect(preview.style.getPropertyValue('--color-primary-700')).toBe('oklch(58% 0.17 40)')
		expect(screen.getByRole('button', { name: 'Try a dialog' })).toHaveClass('rounded-full')
		expect(screen.getByRole('button', { name: 'Try an offcanvas' })).toHaveClass('rounded-full')
		expect(screen.getByRole('button', { name: 'Finish this step' })).toHaveClass('rounded-full')

		await user.click(screen.getByRole('button', { name: 'Try a dialog' }))
		const dialog = screen.getByTestId('playground-dialog')
		expect(dialog.style.getPropertyValue('--color-primary-600')).toBe('oklch(68% 0.18 45)')
		expect(screen.getByRole('button', { name: 'Back to playing' })).toHaveClass('rounded-full')
		expect(screen.getByRole('button', { name: 'Looks good' })).toHaveClass('rounded-full', 'btn-primary')
		await user.keyboard('{Escape}')

		await user.click(screen.getByRole('button', { name: 'Try an offcanvas' }))
		const panel = screen.getByTestId('playground-offcanvas')
		expect(panel.style.getPropertyValue('--color-primary-600')).toBe('oklch(68% 0.18 45)')
		expect(screen.getByRole('button', { name: 'Back to the workspace' })).toHaveClass(
			'rounded-full',
			'btn-primary'
		)
	})

	it('updates the sample project and allows resetting the demo', async () => {
		const user = userEvent.setup()
		render(<LandingPlayground />)
		await user.click(screen.getByRole('button', { name: 'Violet' }))
		await user.click(screen.getByRole('button', { name: 'Finish this step' }))
		expect(screen.getByRole('status')).toHaveTextContent('Step complete. Looking good!')
		expect(screen.getByRole('button', { name: 'Step completed' })).toBeDisabled()
		await user.click(screen.getByRole('button', { name: 'Reset demo' }))
		expect(screen.getByRole('button', { name: 'Finish this step' })).toBeEnabled()
		expect(screen.getByTestId('landing-preview')).toHaveAttribute('data-palette', 'orange')
		expect(screen.getByTestId('landing-preview')).toHaveAttribute('data-mode', 'light')
	})
})
