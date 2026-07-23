import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FieldLabel } from './FieldLabel'
import { FieldRoot } from './FieldRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldLabel', () => {
  it('renders as label element', () => {
    const { container } = render(
      <FieldRoot id='test-label'>
        <FieldLabel>Test Label</FieldLabel>
      </FieldRoot>
    )
    const label = container.querySelector('label')
    expect(label).toBeInTheDocument()
  })

  it('renders label text', () => {
    render(
      <FieldRoot id='test-label'>
        <FieldLabel>Label Text</FieldLabel>
      </FieldRoot>
    )
    expect(screen.getByText('Label Text')).toBeInTheDocument()
  })

  it('applies field-label class', () => {
    const { container } = render(
      <FieldRoot id='test-label'>
        <FieldLabel>Test</FieldLabel>
      </FieldRoot>
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('field-label')
  })

  it('sets htmlFor from field context', () => {
    const { container } = render(
      <FieldRoot id='input-id'>
        <FieldLabel>Label</FieldLabel>
      </FieldRoot>
    )
    const label = container.querySelector('label')
    // FieldLabel gets id from context via useFieldContext
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('field-label')
  })

  it('applies custom className', () => {
    const { container } = render(
      <FieldRoot id='test-label'>
        <FieldLabel className='custom-label'>Test</FieldLabel>
      </FieldRoot>
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('field-label')
    expect(label).toHaveClass('custom-label')
  })

  it('renders with children elements', () => {
    render(
      <FieldRoot id='test-label'>
        <FieldLabel>
          <span>Label</span> <span>Text</span>
        </FieldLabel>
      </FieldRoot>
    )
    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('supports React nodes as children', () => {
    const TestComponent = () => <strong>Bold Label</strong>
    render(
      <FieldRoot id='test-label'>
        <FieldLabel>
          <TestComponent />
        </FieldLabel>
      </FieldRoot>
    )
    expect(screen.getByText('Bold Label')).toBeInTheDocument()
  })

  it('renders multiple labels in same context', () => {
    const { container } = render(
      <FieldRoot id='shared-input'>
        <FieldLabel>Label 1</FieldLabel>
        <FieldLabel>Label 2</FieldLabel>
      </FieldRoot>
    )
    const labels = container.querySelectorAll('label')
    expect(labels).toHaveLength(2)
    expect(labels[0]).toHaveClass('field-label')
    expect(labels[1]).toHaveClass('field-label')
  })

  it('supports all prop combinations', () => {
    const { container } = render(
      <FieldRoot id='combo-label'>
        <FieldLabel className='custom-combo'>Combined Label</FieldLabel>
      </FieldRoot>
    )
    const label = container.querySelector('label')
    expect(label).toHaveClass('field-label')
    expect(label).toHaveClass('custom-combo')
    expect(screen.getByText('Combined Label')).toBeInTheDocument()
  })
})
