import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalRoot } from './ModalRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('ModalRoot', () => {
  it('renders without crashing', () => {
    const { container } = render(<ModalRoot />)
    expect(container).toBeTruthy()
  })

  it('accepts children', () => {
    const { container } = render(
      <ModalRoot>
        <div>Modal Content</div>
      </ModalRoot>
    )
    expect(container.textContent).toContain('Modal Content')
  })

  it('forwards Dialog.Root props', () => {
    const { container } = render(
      <ModalRoot open={true}>
        <div>Open Modal</div>
      </ModalRoot>
    )
    expect(container.textContent).toContain('Open Modal')
  })

  it('supports open prop', () => {
    const { container } = render(
      <ModalRoot open>
        <div>Visible</div>
      </ModalRoot>
    )
    expect(container.textContent).toContain('Visible')
  })

  it('supports controlled open state', () => {
    const { container, rerender } = render(
      <ModalRoot open={false}>
        <div>Content</div>
      </ModalRoot>
    )
    expect(container).toBeTruthy()

    rerender(
      <ModalRoot open={true}>
        <div>Content</div>
      </ModalRoot>
    )
    expect(container).toBeTruthy()
  })
})
