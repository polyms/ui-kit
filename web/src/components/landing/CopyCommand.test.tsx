// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CopyCommand } from './CopyCommand'

// ── Tests ──────────────────────────────────────────────────────────────────────────────────────────────────

afterEach(() => {
	cleanup()
	vi.restoreAllMocks()
})

describe('Copy command', () => {
	it('copies the exact command and confirms success', async () => {
		const user = userEvent.setup()
		const write = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
		render(<CopyCommand />)
		await user.click(screen.getByRole('button', { name: 'Copy install command' }))
		expect(write).toHaveBeenCalledWith('pnpm add @polyms/ui-kit')
		expect(screen.getByRole('status')).toHaveTextContent('Copied to clipboard.')
	})

	it('shows a useful fallback when clipboard permission is denied', async () => {
		const user = userEvent.setup()
		vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Denied'))
		render(<CopyCommand />)
		await user.click(screen.getByRole('button', { name: 'Copy install command' }))
		expect(screen.getByRole('status')).toHaveTextContent('Select the command and copy it manually.')
		expect(screen.getByText('pnpm add @polyms/ui-kit')).toBeVisible()
	})
})
