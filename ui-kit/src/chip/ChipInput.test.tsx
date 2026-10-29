import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChipInput } from './ChipInput'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('ChipInput', () => {
	it('applies rounded-xl class when rounded prop is true', () => {
		render(<ChipInput label='Skills' rounded />)

		const shell = screen.getByRole('textbox', { name: 'Skills' }).parentElement
		expect(shell).toHaveClass('chip-input', 'rounded-xl')
		expect(shell).not.toHaveClass('rounded-full')
	})

	it('does not apply rounded-xl when rounded prop is false', () => {
		render(<ChipInput label='Skills' rounded={false} />)

		expect(screen.getByRole('textbox', { name: 'Skills' }).parentElement).not.toHaveClass('rounded-xl')
	})
})
