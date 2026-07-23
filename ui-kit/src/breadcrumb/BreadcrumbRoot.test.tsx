import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BreadcrumbRoot } from './BreadcrumbRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('BreadcrumbRoot', () => {
  it('renders as ol element', () => {
    const { container } = render(<BreadcrumbRoot />)
    const ol = container.querySelector('ol')
    expect(ol).toBeInTheDocument()
  })

  it('applies breadcrumb class', () => {
    const { container } = render(<BreadcrumbRoot />)
    const ol = container.querySelector('ol')
    expect(ol).toHaveClass('breadcrumb')
  })

  it('renders with children', () => {
    const { container } = render(
      <BreadcrumbRoot>
        <li>Item 1</li>
        <li>Item 2</li>
      </BreadcrumbRoot>
    )
    const items = container.querySelectorAll('li')
    expect(items).toHaveLength(2)
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<BreadcrumbRoot ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLOListElement)
  })

  it('accepts custom className and merges with breadcrumb class', () => {
    const { container } = render(<BreadcrumbRoot className='custom-breadcrumb' />)
    const ol = container.querySelector('ol')
    expect(ol).toHaveClass('breadcrumb')
    expect(ol).toHaveClass('custom-breadcrumb')
  })

  it('accepts aria attributes', () => {
    const { container } = render(<BreadcrumbRoot aria-label='Breadcrumb navigation' />)
    const ol = container.querySelector('ol')
    expect(ol).toHaveAttribute('aria-label', 'Breadcrumb navigation')
  })
})
