import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

beforeAll(() => {
  if (!globalThis.PointerEvent) {
    globalThis.PointerEvent = MouseEvent as typeof PointerEvent
  }
})

describe('Radio', () => {
  it('renders radios inside a radio group', () => {
    render(
      <RadioGroup name='plan' value='pro'>
        <Radio value='free'>Free</Radio>
        <Radio value='pro'>Pro</Radio>
      </RadioGroup>
    )

    expect(screen.getByRole('radio', { name: 'Free' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked()
  })

  it('applies group size and variant to radio items', () => {
    render(
      <RadioGroup size='lg' value='delete' variant='danger'>
        <Radio value='delete'>Delete account</Radio>
      </RadioGroup>
    )

    const radio = screen.getByRole('radio', { name: 'Delete account' })
    expect(radio).toHaveClass('radio')
    expect(radio).toHaveClass('radio-lg')
    expect(radio).toHaveClass('radio-danger')
  })

  it('calls onValueChange when a radio is selected', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup name='plan' onValueChange={onValueChange} value='free'>
        <Radio value='free'>Free</Radio>
        <Radio value='pro'>Pro</Radio>
      </RadioGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(onValueChange).toHaveBeenCalledWith('pro', expect.any(Object))
  })

  it('supports horizontal layout class', () => {
    render(
      <RadioGroup aria-label='Plan' orientation='horizontal'>
        <Radio value='free'>Free</Radio>
      </RadioGroup>
    )

    expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveClass('radio-group-horizontal')
  })
})
