import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Offcanvas } from './Offcanvas'
import { OffcanvasClose } from './OffcanvasClose'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasClose', () => {
  it('renders as button element', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const button = buttons.find(btn => btn.className.includes('offcanvas-close'))
    expect(button).toBeInTheDocument()
  })

  it('applies offcanvas-close class', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const button = buttons.find(btn => btn.className.includes('offcanvas-close'))
    expect(button).toHaveClass('offcanvas-close')
  })

  it('closes offcanvas when clicked', async () => {
    const user = userEvent.setup()
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const closeButton = buttons.find(btn => btn.className.includes('offcanvas-close'))
    await user.click(closeButton!)
    const trigger = await screen.findByRole('button', { name: 'Open', hidden: true })
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })
  })

  it('supports custom className', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose className='custom-close' />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const button = buttons.find(btn => btn.className.includes('custom-close'))
    expect(button).toBeInTheDocument()
  })

  it('throws error when used outside Offcanvas', () => {
    expect(() => {
      render(<OffcanvasClose />)
    }).toThrow('Offcanvas components must be wrapped in <Offcanvas />')
  })

  it('accepts button props', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose disabled />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const button = buttons.find(btn => btn.className.includes('offcanvas-close'))
    expect(button).toBeDisabled()
  })

  it('renders icon inside button', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const closeButton = buttons.find(btn => btn.className.includes('offcanvas-close'))
    const icon = closeButton?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('supports custom data attributes', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasClose data-testid='custom-close' />
        </OffcanvasContent>
      </Offcanvas>
    )
    const button = await screen.findByTestId('custom-close')
    expect(button).toBeInTheDocument()
  })

  it('stops event propagation on click', async () => {
    const user = userEvent.setup()
    const clickSpy = vi.fn()
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent onClick={clickSpy}>
          <OffcanvasClose />
        </OffcanvasContent>
      </Offcanvas>
    )
    const buttons = await screen.findAllByRole('button', { hidden: true })
    const closeButton = buttons.find(btn => btn.className.includes('offcanvas-close'))
    await user.click(closeButton!)
    expect(clickSpy).not.toHaveBeenCalled()
  })
})
