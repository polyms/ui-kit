import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasContent', () => {
  it('renders content when offcanvas is open', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content Text</OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Content Text')).toBeInTheDocument()
  })

  it('does not render content when offcanvas is closed', () => {
    render(
      <Offcanvas initialOpen={false}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>Content Text</OffcanvasContent>
      </Offcanvas>
    )
    const content = document.querySelector('[role="dialog"]')
    expect(content).not.toBeInTheDocument()
  })

  it('accepts className prop', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent className='custom-content'>Content</OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('accepts children elements', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <div>Child 1</div>
          <div>Child 2</div>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Child 1')).toBeInTheDocument()
    expect(await screen.findByText('Child 2')).toBeInTheDocument()
  })
})
