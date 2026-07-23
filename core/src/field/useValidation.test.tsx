import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { useValidation } from './useValidation'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function ValidationHarness({ controlId = 'control' }: { controlId?: string }) {
  const { refs, floatingStyles, isOpen, getFloatingProps } = useValidation({ controlId })

  return (
    <div>
      <input id={controlId} />
      {isOpen ? (
        <div data-testid='feedback' ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          Invalid
        </div>
      ) : null}
    </div>
  )
}

describe('useValidation', () => {
  it('opens on focus-visible and exposes tooltip role', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)

    await user.tab()
    expect(screen.getByTestId('feedback')).toHaveAttribute('role', 'tooltip')
    expect(document.getElementById('control')).toHaveFocus()
  })

  it('opens on hover of the control', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)

    await user.hover(screen.getByRole('textbox'))
    expect(screen.getByTestId('feedback')).toBeInTheDocument()
  })

  it('keeps open when pointer moves onto the floating node', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)

    await user.hover(screen.getByRole('textbox'))
    const feedback = screen.getByTestId('feedback')
    await user.hover(feedback)
    expect(feedback).toBeInTheDocument()
  })

  it('toggles open on click of the control', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)
    const control = screen.getByRole('textbox')

    await user.click(control)
    expect(screen.getByTestId('feedback')).toBeInTheDocument()

    await user.click(control)
    expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
  })

  it('dismisses on Escape', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)

    await user.hover(screen.getByRole('textbox'))
    expect(screen.getByTestId('feedback')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
  })

  it('dismisses on outside pointerdown', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <ValidationHarness />
        <button type='button'>outside</button>
      </div>
    )

    await user.hover(screen.getByRole('textbox'))
    expect(screen.getByTestId('feedback')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'outside' }))
    expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
  })

  it('sets aria-describedby on the control while open', async () => {
    const user = userEvent.setup()
    render(<ValidationHarness />)

    await user.hover(screen.getByRole('textbox'))
    const feedback = screen.getByTestId('feedback')
    const control = document.getElementById('control')
    expect(control).toHaveAttribute('aria-describedby', feedback.id)
  })
})
