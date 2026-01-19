import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalContent } from './ModalContent'
import { ModalHeader } from './ModalHeader'
import { ModalRoot } from './ModalRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalHeader', () => {
  it('renders header with title', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Modal Title')).toBeInTheDocument()
  })

  it('applies modal-header class', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader className='custom-header'>Title</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('renders close button by default', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    const closeButton = screen.queryByTitle(/close/i)
    expect(closeButton).toBeTruthy()
  })

  it('hides close button when close prop is false', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader close={false}>Title No Close</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    // When close={false}, ModalClose is not rendered
    expect(screen.getByText('Title No Close')).toBeInTheDocument()
  })

  it('renders with children elements', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader>
            <span>Icon</span> Title
          </ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText(/title/i)).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader ref={ref}>Title</ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('supports HTML attributes', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader data-testid='modal-header' id='header-id'>
            Titled Header
          </ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Titled Header')).toBeInTheDocument()
  })

  it('supports all prop combinations', () => {
    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader className='custom' close={true}>
            <strong>Full Title</strong>
          </ModalHeader>
        </ModalContent>
      </ModalRoot>
    )
    expect(screen.getByText('Full Title')).toBeInTheDocument()
  })
})
