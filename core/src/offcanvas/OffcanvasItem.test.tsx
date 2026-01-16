import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Offcanvas } from './Offcanvas'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasItem } from './OffcanvasItem'
import { OffcanvasTrigger } from './OffcanvasTrigger'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('OffcanvasItem', () => {
  it('renders as div element', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem>Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )

    await waitFor(() => {
      const item = document.querySelector('.offcanvas-item')
      expect(item).toBeInTheDocument()
    })
  })

  it('applies offcanvas-item class', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem>Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const item = document.querySelector('div.offcanvas-item')
      expect(item).toHaveClass('offcanvas-item')
    })
  })

  it('renders text content', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem>Menu Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Menu Item')).toBeInTheDocument()
  })

  it('supports custom className', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem className='custom-item'>Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const item = document.querySelector('.custom-item')
      expect(item).toBeInTheDocument()
    })
  })

  it('merges custom and default classes', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem className='active'>Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      const item = document.querySelector('.offcanvas-item')
      expect(item).toHaveClass('offcanvas-item')
      expect(item).toHaveClass('active')
    })
  })

  it('renders children elements', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem>
            <span>Icon</span>
            <span>Label</span>
          </OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Icon')).toBeInTheDocument()
    expect(await screen.findByText('Label')).toBeInTheDocument()
  })

  it('renders multiple items', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem>Item 1</OffcanvasItem>
          <OffcanvasItem>Item 2</OffcanvasItem>
          <OffcanvasItem>Item 3</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    expect(await screen.findByText('Item 1')).toBeInTheDocument()
    expect(await screen.findByText('Item 2')).toBeInTheDocument()
    expect(await screen.findByText('Item 3')).toBeInTheDocument()
  })

  it('accepts standard HTML attributes', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem data-testid='item-1' title='Tooltip'>
            Item
          </OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    const item = await screen.findByTestId('item-1')
    expect(item).toHaveAttribute('title', 'Tooltip')
  })

  it('supports ref forwarding', async () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <OffcanvasItem ref={ref}>Item</OffcanvasItem>
        </OffcanvasContent>
      </Offcanvas>
    )
    await waitFor(() => {
      expect(ref.current).toBeInTheDocument()
      expect(ref.current).toHaveClass('offcanvas-item')
    })
  })

  it('renders as list items in list context', async () => {
    render(
      <Offcanvas initialOpen={true}>
        <OffcanvasTrigger>Open</OffcanvasTrigger>
        <OffcanvasContent>
          <ul>
            <OffcanvasItem>Item 1</OffcanvasItem>
            <OffcanvasItem>Item 2</OffcanvasItem>
          </ul>
        </OffcanvasContent>
      </Offcanvas>
    )
    const items = await screen.findAllByText(/Item \d/)
    expect(items).toHaveLength(2)
  })
})
