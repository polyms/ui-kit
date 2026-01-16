import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BottomSheetRoot } from './BottomSheetRoot'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('BottomSheetRoot', () => {
  it('renders without crashing', () => {
    const { container } = render(<BottomSheetRoot />)
    expect(container).toBeTruthy()
  })

  it('accepts children', () => {
    const { container } = render(
      <BottomSheetRoot>
        <div>Test Content</div>
      </BottomSheetRoot>
    )
    expect(container.textContent).toContain('Test Content')
  })

  it('forwards Dialog.Root props', () => {
    const { container } = render(
      <BottomSheetRoot open={true}>
        <div>Open Sheet</div>
      </BottomSheetRoot>
    )
    expect(container.textContent).toContain('Open Sheet')
  })
})
