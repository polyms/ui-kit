import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BottomSheetRoot } from './BottomSheetRoot'
import { BottomSheetTrigger } from './BottomSheetTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('BottomSheetTrigger', () => {
  it('renders trigger button', () => {
    render(
      <BottomSheetRoot>
        <BottomSheetTrigger>Open Sheet</BottomSheetTrigger>
      </BottomSheetRoot>
    )
    expect(screen.getByRole('button', { name: /open sheet/i })).toBeInTheDocument()
  })

  it('has clickable trigger', async () => {
    const user = userEvent.setup()
    render(
      <BottomSheetRoot>
        <BottomSheetTrigger>Trigger</BottomSheetTrigger>
      </BottomSheetRoot>
    )
    const trigger = screen.getByRole('button', { name: /trigger/i })
    await user.click(trigger)
    expect(trigger).toBeInTheDocument()
  })

  it('forwards Dialog.Trigger props', () => {
    render(
      <BottomSheetRoot>
        <BottomSheetTrigger disabled>Disabled Trigger</BottomSheetTrigger>
      </BottomSheetRoot>
    )
    const trigger = screen.getByRole('button', { name: /disabled trigger/i }) as HTMLButtonElement
    expect(trigger.disabled).toBe(true)
  })

  it('accepts custom className', () => {
    render(
      <BottomSheetRoot>
        <BottomSheetTrigger className='custom-trigger'>Custom</BottomSheetTrigger>
      </BottomSheetRoot>
    )
    const trigger = screen.getByRole('button', { name: /custom/i })
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('renders with custom event handlers', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <BottomSheetRoot>
        <BottomSheetTrigger onClick={handleClick}>Click</BottomSheetTrigger>
      </BottomSheetRoot>
    )
    await user.click(screen.getByRole('button', { name: /click/i }))
    expect(handleClick).toHaveBeenCalled()
  })
})
