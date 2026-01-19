import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('Offcanvas', () => {
  it('renders with trigger and content', async () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('opens offcanvas when trigger clicked', async () => {
    const user = userEvent.setup()
    render(
      <Offcanvas initialOpen={false}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <div>Offcanvas Content</div>
        </OffcanvasContent>
      </Offcanvas>
    )
    const trigger = await screen.findByRole('button', { name: 'Open' })
    expect(trigger).toHaveAttribute('data-state', 'closed')
    await user.click(trigger)
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'open')
    })
  })

  it('supports controlled open state', async () => {
    const renderResult = render(
      <Offcanvas open={false}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    const trigger = await screen.findByRole('button', { name: 'Open' })
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })

    renderResult.rerender(
      <Offcanvas open={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'open')
    })
  })

  it('calls onOpenChange callback', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Offcanvas onOpenChange={onOpenChange}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    const trigger = await screen.findByRole('button', { name: 'Open' })
    await user.click(trigger)
    expect(onOpenChange).toHaveBeenCalled()
  })

  it('supports dismissible prop', async () => {
    render(
      <Offcanvas dismissible={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('opens with initialOpen true', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <div>Initial Content</div>
        </OffcanvasContent>
      </Offcanvas>
    )
    const trigger = await screen.findByRole('button', { name: 'Open', hidden: true })
    expect(trigger).toHaveAttribute('data-state', 'open')
  })

  it('supports ignoreClickOutside prop', async () => {
    render(
      <Offcanvas ignoreClickOutside={['.keep-open']}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('renders children elements', async () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger>Trigger</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
        <div>Extra Child</div>
      </Offcanvas>
    )
    expect(await screen.findByText('Trigger')).toBeInTheDocument()
    expect(await screen.findByText('Extra Child')).toBeInTheDocument()
  })

  it('requires children prop', () => {
    expect(() => {
      render(<Offcanvas>{null}</Offcanvas>)
    }).not.toThrow()
  })
})
