import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Toggle } from './Toggle'
import { ToggleGroup } from './ToggleGroup'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('Toggle', () => {
	it('applies the toggle class and pressed state', async () => {
		const user = userEvent.setup()
		const onPressedChange = vi.fn()

		render(
			<Toggle aria-label='Favorite' onPressedChange={onPressedChange}>
				Favorite
			</Toggle>
		)

		const toggle = screen.getByRole('button', { name: 'Favorite' })
		expect(toggle).toHaveClass('toggle', 'toggle-shell')
		expect(toggle).not.toHaveAttribute('data-pressed')

		await user.click(toggle)
		expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything())
	})

	it('applies size and rounded classes', () => {
		render(
			<Toggle rounded size='lg'>
				Large
			</Toggle>
		)

		expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('toggle', 'toggle-lg', 'rounded-full')
	})

	it('uses the toolbar variant instead of the form shell', () => {
		render(
			<>
				<Toggle aria-label='Bold' variant='toolbar'>
					B
				</Toggle>
				<ToggleGroup aria-label='Align' rounded variant='toolbar'>
					<Toggle value='left'>Left</Toggle>
				</ToggleGroup>
			</>
		)

		const toggle = screen.getByRole('button', { name: 'Bold' })
		expect(toggle).toHaveClass('toggle-toolbar')
		expect(toggle).not.toHaveClass('toggle-shell')
		expect(toggle).not.toHaveAttribute('variant')

		const group = screen.getByRole('group', { name: 'Align' })
		expect(group).toHaveClass('toggle-group-toolbar')
		expect(group).not.toHaveClass('toggle-group-shell', 'rounded-full')
		expect(group).not.toHaveAttribute('variant')
	})
})

describe('ToggleGroup', () => {
	it('shares one pressed value and sizes with the group', async () => {
		const user = userEvent.setup()
		const onValueChange = vi.fn()

		render(
			<ToggleGroup aria-label='Layout' defaultValue={['list']} onValueChange={onValueChange} size='sm'>
				<Toggle value='grid'>Grid</Toggle>
				<Toggle value='list'>List</Toggle>
			</ToggleGroup>
		)

		const group = screen.getByRole('group', { name: 'Layout' })
		expect(group).toHaveClass('toggle-group', 'toggle-group-shell', 'toggle-group-sm')
		expect(group).not.toHaveClass('rounded-full')

		await user.click(screen.getByRole('button', { name: 'Grid' }))
		expect(onValueChange).toHaveBeenCalledWith(['grid'], expect.anything())
	})

	it('pills the shell when rounded and keeps the small radius without it', () => {
		const { rerender } = render(
			<ToggleGroup aria-label='Layout' rounded>
				<Toggle value='grid'>Grid</Toggle>
				<Toggle value='list'>List</Toggle>
			</ToggleGroup>
		)

		const group = screen.getByRole('group', { name: 'Layout' })
		expect(group).toHaveClass('toggle-group-shell', 'rounded-full')
		expect(group).not.toHaveAttribute('rounded')

		rerender(
			<ToggleGroup aria-label='Layout'>
				<Toggle value='grid'>Grid</Toggle>
				<Toggle value='list'>List</Toggle>
			</ToggleGroup>
		)

		expect(screen.getByRole('group', { name: 'Layout' })).not.toHaveClass('rounded-full')
	})
})
