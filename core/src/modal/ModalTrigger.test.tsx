import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ModalRoot } from './ModalRoot'
import { ModalTrigger } from './ModalTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalTrigger', () => {
  it('renders trigger button', () => {
    render(
      <ModalRoot>
        <ModalTrigger>Open Modal</ModalTrigger>
      </ModalRoot>
    )
    expect(screen.getByRole('button', { name: /open modal/i })).toBeInTheDocument()
  })

  it('applies modal-trigger class', () => {
    render(
      <ModalRoot>
        <ModalTrigger>Trigger</ModalTrigger>
      </ModalRoot>
    )
    const trigger = screen.getByRole('button', { name: /trigger/i })
    expect(trigger).toHaveClass('modal-trigger')
  })

  it('accepts custom className and merges', () => {
    render(
      <ModalRoot>
        <ModalTrigger className='custom-trigger'>Trigger</ModalTrigger>
      </ModalRoot>
    )
    const trigger = screen.getByRole('button', { name: /trigger/i })
    expect(trigger).toHaveClass('modal-trigger')
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('is clickable', async () => {
    const user = userEvent.setup()
    render(
      <ModalRoot>
        <ModalTrigger>Click Me</ModalTrigger>
      </ModalRoot>
    )
    const trigger = screen.getByRole('button', { name: /click me/i })
    await user.click(trigger)
    expect(trigger).toBeInTheDocument()
  })

  it('supports disabled state', () => {
    render(
      <ModalRoot>
        <ModalTrigger disabled>Disabled Trigger</ModalTrigger>
      </ModalRoot>
    )
    const trigger = screen.getByRole('button', { name: /disabled trigger/i }) as HTMLButtonElement
    expect(trigger.disabled).toBe(true)
  })

  it('supports custom event handlers', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <ModalRoot>
        <ModalTrigger onClick={handleClick}>Click</ModalTrigger>
      </ModalRoot>
    )
    await user.click(screen.getByRole('button', { name: /click/i }))
    expect(handleClick).toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <ModalRoot>
        <ModalTrigger ref={ref}>Ref Trigger</ModalTrigger>
      </ModalRoot>
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('renders children elements', () => {
    render(
      <ModalRoot>
        <ModalTrigger>
          <span>Icon</span> Open
        </ModalTrigger>
      </ModalRoot>
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText(/open/i)).toBeInTheDocument()
  })
})
