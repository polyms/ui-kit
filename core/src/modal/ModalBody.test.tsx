import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalBody } from './ModalBody'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalBody', () => {
  it('renders as div element', () => {
    const { container } = render(<ModalBody>Body Text</ModalBody>)
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('renders body text', () => {
    render(<ModalBody>Modal Body Content</ModalBody>)
    expect(screen.getByText('Modal Body Content')).toBeInTheDocument()
  })

  it('applies modal-body class', () => {
    const { container } = render(<ModalBody>Content</ModalBody>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-body')
  })

  it('applies custom className', () => {
    const { container } = render(<ModalBody className='custom-body'>Content</ModalBody>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-body')
    expect(div).toHaveClass('custom-body')
  })

  it('renders with children elements', () => {
    render(
      <ModalBody>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </ModalBody>
    )
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
  })

  it('supports React nodes as children', () => {
    const TestComponent = () => <strong>Bold Text</strong>
    render(
      <ModalBody>
        <TestComponent />
      </ModalBody>
    )
    expect(screen.getByText('Bold Text')).toBeInTheDocument()
  })

  it('can be used standalone without ModalContent', () => {
    const { container } = render(<ModalBody>Standalone Body</ModalBody>)
    expect(container.querySelector('.modal-body')).toBeInTheDocument()
  })

  it('supports all prop combinations', () => {
    const { container } = render(
      <ModalBody className='custom'>
        <em>Emphasized Content</em>
      </ModalBody>
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-body')
    expect(div).toHaveClass('custom')
    expect(screen.getByText('Emphasized Content')).toBeInTheDocument()
  })
})
