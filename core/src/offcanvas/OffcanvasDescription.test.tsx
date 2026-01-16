import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasDescription } from './OffcanvasDescription'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasDescription', () => {
  it('renders description element', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>Description text</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Description text')).toBeInTheDocument()
  })

  it('applies offcanvas-description class', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>Desc</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const desc = document.querySelector('.offcanvas-description')
      expect(desc).toBeInTheDocument()
    })
  })

  it('supports custom className', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription className='custom-desc'>Desc</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const desc = document.querySelector('.custom-desc')
      expect(desc).toBeInTheDocument()
    })
  })

  it('throws error when used outside Offcanvas', () => {
    expect(() => {
      render(<OffcanvasDescription>Description</OffcanvasDescription>)
    }).toThrow('Offcanvas components must be wrapped in <Offcanvas />')
  })

  it('renders children content', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>
            <p>Detailed description here</p>
          </OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Detailed description here')).toBeInTheDocument()
  })

  it('receives id from context', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>Description</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const desc = document.querySelector('.offcanvas-description')
      expect(desc).toHaveAttribute('id')
    })
  })

  it('renders multiple descriptions', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>First</OffcanvasDescription>
          <OffcanvasDescription>Second</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('First')).toBeInTheDocument()
    expect(await screen.findByText('Second')).toBeInTheDocument()
  })

  it('supports HTML children', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription>
            <strong>Bold</strong> text
          </OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Bold')).toBeInTheDocument()
    expect(await screen.findByText('text')).toBeInTheDocument()
  })

  it('accepts standard HTML attributes', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasDescription data-testid='desc'>Desc</OffcanvasDescription>
        </OffcanvasContent>
      </Offcanvas>
    )
    const desc = await screen.findByTestId('desc')
    expect(desc).toBeInTheDocument()
  })
})
