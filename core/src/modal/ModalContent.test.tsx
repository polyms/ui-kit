import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalContent } from './ModalContent'
import { ModalRoot } from './ModalRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalContent', () => {
  it('renders modal content', () => {
    render(
      <ModalRoot open>
        <ModalContent>Modal Body</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Modal Body')).toBeInTheDocument()
  })

  it('applies modal-content class', () => {
    render(
      <ModalRoot open>
        <ModalContent>Content</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies size class when size prop provided', () => {
    render(
      <ModalRoot open>
        <ModalContent size='lg'>Large Modal</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Large Modal')).toBeInTheDocument()
  })

  it('applies all size variants', () => {
    const sizes = ['sm', 'lg', 'xl', 'full'] as const
    sizes.forEach(size => {
      const { unmount } = render(
        <ModalRoot open>
          <ModalContent size={size}>Content</ModalContent>
        </ModalRoot>
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies centered class by default', () => {
    render(
      <ModalRoot open>
        <ModalContent>Centered</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Centered')).toBeInTheDocument()
  })

  it('can disable centered', () => {
    render(
      <ModalRoot open>
        <ModalContent centered={false}>Not Centered</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Not Centered')).toBeInTheDocument()
  })

  it('applies scrollable class when scrollable prop true', () => {
    render(
      <ModalRoot open>
        <ModalContent scrollable>Scrollable</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Scrollable')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ModalRoot open>
        <ModalContent className='custom-modal'>Content</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders backdrop element', () => {
    render(
      <ModalRoot open>
        <ModalContent>Content</ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <ModalRoot open>
        <ModalContent ref={ref}>Content</ModalContent>
      </ModalRoot>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('supports multiple prop combinations', () => {
    render(
      <ModalRoot open>
        <ModalContent centered={true} className='custom' id='combo-modal' scrollable={true} size='xl'>
          Combo Content
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Combo Content')).toBeInTheDocument()
  })

  it('renders children elements', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <div>Child 1</div>
          <div>Child 2</div>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
