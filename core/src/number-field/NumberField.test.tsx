import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NumberField } from './NumberField'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('NumberField', () => {
  it('renders number field root', () => {
    const { container } = render(<NumberField />)
    const root = container.querySelector('.number-field')
    expect(root).toBeInTheDocument()
  })

  it('applies number-field class', () => {
    const { container } = render(<NumberField />)
    const root = container.querySelector('.number-field')
    expect(root).toBeInTheDocument()
  })

  it('applies field class', () => {
    const { container } = render(<NumberField />)
    const root = container.querySelector('.field')
    expect(root).toBeInTheDocument()
  })

  it('renders with label when label prop provided', () => {
    render(<NumberField label='Age' />)
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('does not render label when label prop not provided', () => {
    const { container } = render(<NumberField />)
    const label = container.querySelector('.number-field-label')
    expect(label).not.toBeInTheDocument()
  })

  it('renders increment button', () => {
    const { container } = render(<NumberField />)
    const increment = container.querySelector('.number-field-increment')
    expect(increment).toBeInTheDocument()
  })

  it('renders decrement button', () => {
    const { container } = render(<NumberField />)
    const decrement = container.querySelector('.number-field-decrement')
    expect(decrement).toBeInTheDocument()
  })

  it('applies size class when size prop provided', () => {
    const { container } = render(<NumberField size='lg' />)
    const root = container.querySelector('.number-field')
    expect(root).toHaveClass('field-lg')
  })

  it('applies custom className', () => {
    const { container } = render(<NumberField className='custom-number' />)
    const root = container.querySelector('.number-field')
    expect(root).toHaveClass('custom-number')
    expect(root).toHaveClass('number-field')
  })

  it('generates id when id prop not provided', () => {
    const { container } = render(<NumberField />)
    const root = container.querySelector('.field-input')
    expect(root).toHaveAttribute('id')
  })

  it('uses provided id prop', () => {
    const { container } = render(<NumberField id='my-number' />)
    const root = container.querySelector('.field-input')
    expect(root).toHaveAttribute('id', 'my-number')
  })

  it('label htmlFor matches number field id', () => {
    const { container } = render(<NumberField id='test-number' label='Count' />)
    const label = container.querySelector('.number-field-label')
    expect(label).toHaveAttribute('for', 'test-number')
  })

  it('renders scrub area when label provided', () => {
    const { container } = render(<NumberField label='Quantity' />)
    const scrubArea = container.querySelector('.number-field-scrub-area')
    expect(scrubArea).toBeInTheDocument()
  })

  it('input has rounded-full class', () => {
    const { container } = render(<NumberField />)
    const input = container.querySelector('.number-field-input')
    expect(input).toHaveClass('rounded-full')
  })

  it('input has field-input class', () => {
    const { container } = render(<NumberField />)
    const input = container.querySelector('.number-field-input')
    expect(input).toHaveClass('field-input')
  })

  it('supports all size variants', () => {
    const sizes = ['sm', 'lg', 'xl', '2xl', '3xl'] as const
    sizes.forEach(size => {
      const { container, unmount } = render(<NumberField size={size} />)
      const root = container.querySelector('.number-field')
      expect(root).toHaveClass(`field-${size}`)
      unmount()
    })
  })

  it('supports multiple prop combinations', () => {
    const { container } = render(
      <NumberField className='custom-combo' id='combo-number' label='Combined' size='xl' />
    )
    const root = container.querySelector('.number-field')
    expect(root).toHaveClass('number-field')
    expect(root).toHaveClass('field')
    expect(root).toHaveClass('field-xl')
    expect(root).toHaveClass('custom-combo')
    expect(screen.getByText('Combined')).toBeInTheDocument()
  })

  it('input matches root id', () => {
    const { container } = render(<NumberField id='match-id' label='Test' />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('id', 'match-id')
  })
})
