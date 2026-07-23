import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalFooter } from './ModalFooter'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalFooter', () => {
  it('renders as div element', () => {
    const { container } = render(<ModalFooter>Footer</ModalFooter>)
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('renders footer content', () => {
    render(<ModalFooter>Modal Footer</ModalFooter>)
    expect(screen.getByText('Modal Footer')).toBeInTheDocument()
  })

  it('applies modal-footer class', () => {
    const { container } = render(<ModalFooter>Footer</ModalFooter>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-footer')
  })

  it('applies custom className', () => {
    const { container } = render(<ModalFooter className='custom-footer'>Footer</ModalFooter>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-footer')
    expect(div).toHaveClass('custom-footer')
  })

  it('renders with button children', () => {
    render(
      <ModalFooter>
        <button type='button'>Cancel</button>
        <button type='button'>Confirm</button>
      </ModalFooter>
    )
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
  })

  it('supports React nodes as children', () => {
    const Actions = () => (
      <>
        <span>Action 1</span>
        <span>Action 2</span>
      </>
    )
    render(
      <ModalFooter>
        <Actions />
      </ModalFooter>
    )
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('can be used standalone without ModalContent', () => {
    const { container } = render(<ModalFooter>Standalone Footer</ModalFooter>)
    expect(container.querySelector('.modal-footer')).toBeInTheDocument()
  })

  it('supports all prop combinations', () => {
    const { container } = render(
      <ModalFooter className='custom'>
        <button type='button'>Action</button>
      </ModalFooter>
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('modal-footer')
    expect(div).toHaveClass('custom')
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })
})
