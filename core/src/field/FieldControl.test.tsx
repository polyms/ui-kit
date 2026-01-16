import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldControl } from './FieldControl'
import { FieldRoot } from './FieldRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldControl', () => {
  it('renders as input element', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('applies field-control class', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveClass('field-control')
  })

  it('inherits id from field context', () => {
    const { container } = render(
      <FieldRoot id='test-input'>
        <FieldControl />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('id', 'test-input')
  })

  it('inherits name from field context', () => {
    const { container } = render(
      <FieldRoot name='test-name'>
        <FieldControl />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('name', 'test-name')
  })

  it('applies rounded-full class when rounded prop is true', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl rounded />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveClass('rounded-full')
  })

  it('does not apply rounded-full when rounded prop is false', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl rounded={false} />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).not.toHaveClass('rounded-full')
  })

  it('applies custom className', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl className='custom-input' />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveClass('field-control')
    expect(input).toHaveClass('custom-input')
  })

  it('supports input type attribute', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl type='email' />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('supports placeholder attribute', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl placeholder='Enter text' />
      </FieldRoot>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('placeholder', 'Enter text')
  })

  it('supports disabled attribute', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl disabled />
      </FieldRoot>
    )
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('supports value attribute', () => {
    const { container } = render(
      <FieldRoot>
        <FieldControl readOnly value='test-value' />
      </FieldRoot>
    )
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('test-value')
  })

  it('supports multiple input types', () => {
    const types = ['text', 'email', 'password', 'number', 'date', 'checkbox', 'radio'] as const
    types.forEach(type => {
      const { container, unmount } = render(
        <FieldRoot>
          <FieldControl type={type} />
        </FieldRoot>
      )
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('type', type)
      unmount()
    })
  })

  it('supports all prop combinations', () => {
    const { container } = render(
      <FieldRoot id='combo-control' name='combo-name'>
        <FieldControl className='custom-control' disabled placeholder='Email' required rounded type='email' />
      </FieldRoot>
    )
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toHaveClass('field-control')
    expect(input).toHaveClass('custom-control')
    expect(input).toHaveClass('rounded-full')
    expect(input).toHaveAttribute('id', 'combo-control')
    expect(input).toHaveAttribute('name', 'combo-name')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Email')
    expect(input).toHaveAttribute('required')
    expect(input.disabled).toBe(true)
  })
})
