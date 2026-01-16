import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasHeader } from './OffcanvasHeader'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasHeader', () => {
  it('renders as heading element', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>Header</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Header' })).toBeInTheDocument()
    })
  })

  it('applies offcanvas-heading class', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>Title</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const heading = document.querySelector('.offcanvas-heading')
      expect(heading).toBeInTheDocument()
    })
  })

  it('renders header text', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>Menu Title</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Menu Title')).toBeInTheDocument()
  })

  it('supports closeButton prop', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader closeButton={true}>Title</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const closeButton = document.querySelector('.offcanvas-close')
      expect(closeButton).toBeInTheDocument()
    })
  })

  it('does not render close button when closeButton is false', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader closeButton={false}>Title</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const closeButton = document.querySelector('.offcanvas-close')
      expect(closeButton).not.toBeInTheDocument()
    })
  })

  it('supports custom className', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader className='custom-header'>Title</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const heading = document.querySelector('.custom-header')
      expect(heading).toBeInTheDocument()
    })
  })

  it('throws error when used outside Offcanvas', () => {
    expect(() => {
      render(<OffcanvasHeader>Header</OffcanvasHeader>)
    }).toThrow('Offcanvas components must be wrapped in <Offcanvas />')
  })

  it('supports children elements', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>
            <span>Icon</span>
            <span>Title</span>
          </OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Icon')).toBeInTheDocument()
    expect(await screen.findByText('Title')).toBeInTheDocument()
  })

  it('sets labelId in context', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>Header</OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const heading = document.querySelector('.offcanvas-heading')
      expect(heading).toHaveAttribute('id')
    })
  })

  it('renders with multiple children', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasHeader>
            Header Text
            <span>Subtitle</span>
          </OffcanvasHeader>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Header Text')).toBeInTheDocument()
    expect(await screen.findByText('Subtitle')).toBeInTheDocument()
  })
})
