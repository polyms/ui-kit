import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldDescription } from './FieldDescription'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldDescription', () => {
  it('renders as div element', () => {
    const { container } = render(<FieldDescription>Test Description</FieldDescription>)
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<FieldDescription>This is a description</FieldDescription>)
    expect(screen.getByText('This is a description')).toBeInTheDocument()
  })

  it('applies field-description class', () => {
    const { container } = render(<FieldDescription>Description</FieldDescription>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-description')
  })

  it('applies custom className', () => {
    const { container } = render(<FieldDescription className='custom-desc'>Text</FieldDescription>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-description')
    expect(div).toHaveClass('custom-desc')
  })

  it('renders with children elements', () => {
    render(
      <FieldDescription>
        <span>Part 1</span>
        <span>Part 2</span>
      </FieldDescription>
    )
    expect(screen.getByText('Part 1')).toBeInTheDocument()
    expect(screen.getByText('Part 2')).toBeInTheDocument()
  })

  it('supports React nodes as children', () => {
    const TestComponent = () => <em>Emphasized Description</em>
    render(
      <FieldDescription>
        <TestComponent />
      </FieldDescription>
    )
    expect(screen.getByText('Emphasized Description')).toBeInTheDocument()
  })

  it('supports multi-line text', () => {
    const { container } = render(
      <FieldDescription>
        Line 1
        <br />
        Line 2
      </FieldDescription>
    )
    const div = container.querySelector('.field-description')
    expect(div).toHaveTextContent('Line 1')
    expect(div).toHaveTextContent('Line 2')
  })

  it('works standalone without FieldRoot context', () => {
    const { container } = render(
      <FieldDescription className='standalone'>Standalone Description</FieldDescription>
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-description')
    expect(div).toHaveClass('standalone')
  })

  it('renders multiple descriptions together', () => {
    const { container } = render(
      <>
        <FieldDescription>Description 1</FieldDescription>
        <FieldDescription>Description 2</FieldDescription>
        <FieldDescription>Description 3</FieldDescription>
      </>
    )
    const divs = container.querySelectorAll('.field-description')
    expect(divs).toHaveLength(3)
  })

  it('supports all prop combinations', () => {
    const { container } = render(
      <FieldDescription className='custom-combo'>
        <strong>Combined Description</strong>
      </FieldDescription>
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-description')
    expect(div).toHaveClass('custom-combo')
    expect(screen.getByText('Combined Description')).toBeInTheDocument()
  })
})
