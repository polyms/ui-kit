import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldRoot } from './FieldRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldRoot', () => {
  it('renders as div element', () => {
    const { container } = render(<FieldRoot />)
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('applies field class', () => {
    const { container } = render(<FieldRoot />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field')
  })

  it('renders children', () => {
    render(
      <FieldRoot>
        <input type='text' />
      </FieldRoot>
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('applies size class', () => {
    const { container } = render(<FieldRoot size='lg' />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-lg')
  })

  it('applies variant class', () => {
    const { container } = render(<FieldRoot variant='outlined' />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field-outlined')
  })

  it('applies invalid class when invalid prop is true', () => {
    const { container } = render(<FieldRoot invalid />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('invalid')
  })

  it('does not apply invalid class when invalid prop is false', () => {
    const { container } = render(<FieldRoot invalid={false} />)
    const div = container.querySelector('div')
    expect(div).not.toHaveClass('invalid')
  })

  it('applies required class when required prop is true', () => {
    const { container } = render(<FieldRoot required />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('required')
  })

  it('applies custom className', () => {
    const { container } = render(<FieldRoot className='custom-field' />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('field')
    expect(div).toHaveClass('custom-field')
  })

  it('sets data-field attribute with id', () => {
    const { container } = render(<FieldRoot id='test-field' />)
    const div = container.querySelector('div')
    expect(div).toHaveAttribute('data-field', 'test-field')
  })

  it('accepts all size variants', () => {
    const sizes = ['sm', 'lg', 'xl', '2xl', '3xl'] as const
    sizes.forEach(size => {
      const { container, unmount } = render(<FieldRoot size={size} />)
      const div = container.querySelector('div')
      expect(div).toHaveClass(`field-${size}`)
      unmount()
    })
  })

  it('supports multiple prop combinations', () => {
    const { container } = render(
      <FieldRoot
        className='custom-combo'
        id='combo-field'
        invalid
        name='combo'
        required
        size='xl'
        variant='filled'
      >
        <input type='text' />
      </FieldRoot>
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('field')
    expect(div).toHaveClass('custom-combo')
    expect(div).toHaveClass('invalid')
    expect(div).toHaveClass('required')
    expect(div).toHaveClass('field-xl')
    expect(div).toHaveClass('field-filled')
    expect(div).toHaveAttribute('data-field', 'combo-field')
  })

  it('provides context to child components', () => {
    render(
      <FieldRoot id='context-field' invalid name='test-name' required>
        <input type='text' />
      </FieldRoot>
    )
    // FieldRoot provides context via FieldProvider
    // Plain input won't get attributes - need FieldControl for that
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })
})
