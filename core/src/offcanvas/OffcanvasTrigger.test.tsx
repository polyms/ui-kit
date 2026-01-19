import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasTrigger', () => {
  it('renders as button element', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('renders text content', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger>Click Me</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('sets data-state attribute based on open state', async () => {
    const result = render(
      <Offcanvas open={false}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )

    const trigger = screen.getByRole('button', { name: 'Open' })
    expect(trigger).toHaveAttribute('data-state', 'closed')

    result.rerender(
      <Offcanvas open={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'open')
    })
  })

  it('supports custom className', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger className='custom-trigger'>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    const button = screen.getByRole('button', { name: 'Open' })
    expect(button).toHaveClass('custom-trigger')
  })

  it('supports asChild prop with custom element', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger asChild>
          <a href='#link'>Custom Link</a>
        </OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(screen.getByText('Custom Link')).toBeInTheDocument()
  })

  it('throws error when used outside Offcanvas', () => {
    expect(() => {
      render(<OffcanvasTrigger>Open</OffcanvasTrigger>)
    }).toThrow('Offcanvas components must be wrapped in <Offcanvas />')
  })

  it('accepts button props', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger disabled>Open</OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    const button = screen.getByRole('button', { name: 'Open' })
    expect(button).toBeDisabled()
  })

  it('opens offcanvas when clicked', async () => {
    const user = userEvent.setup()
    render(
      <Offcanvas initialOpen={false}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <div>Offcanvas Content</div>
        </OffcanvasContent>
      </Offcanvas>
    )
    const trigger = screen.getByRole('button', { name: 'Open' })
    expect(trigger).toHaveAttribute('data-state', 'closed')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'open')
  })

  it('renders with children nodes', () => {
    render(
      <Offcanvas>
        <OffcanvasTrigger>
          <span>Icon</span> Open Menu
        </OffcanvasTrigger>
        <OffcanvasContent>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })
})
