import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

beforeAll(() => {
  if (!globalThis.PointerEvent) {
    globalThis.PointerEvent = MouseEvent as typeof PointerEvent
  }
})

describe('Checkbox', () => {
  it('renders an accessible checkbox', () => {
    render(<Checkbox>Remember me</Checkbox>)

    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument()
  })

  it('applies size and variant classes', () => {
    render(
      <Checkbox size='lg' variant='success'>
        Updates
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Updates' })
    expect(checkbox).toHaveClass('checkbox')
    expect(checkbox).toHaveClass('checkbox-lg')
    expect(checkbox).toHaveClass('checkbox-success')
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()

    render(<Checkbox onCheckedChange={onCheckedChange}>Accept terms</Checkbox>)

    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  it('supports indeterminate state', () => {
    render(<Checkbox indeterminate>All notifications</Checkbox>)

    expect(screen.getByRole('checkbox', { name: 'All notifications' })).toHaveAttribute('data-indeterminate')
  })
})
