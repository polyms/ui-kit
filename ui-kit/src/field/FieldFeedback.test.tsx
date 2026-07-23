import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FieldControl } from './FieldControl'
import { FieldFeedback } from './FieldFeedback'
import { FieldRoot } from './FieldRoot'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('FieldFeedback', () => {
  it('does not render when the field is valid', () => {
    render(
      <FieldRoot>
        <FieldControl />
        <FieldFeedback>Required</FieldFeedback>
      </FieldRoot>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows on focus when invalid', async () => {
    const user = userEvent.setup()
    render(
      <FieldRoot invalid>
        <FieldControl />
        <FieldFeedback>Required</FieldFeedback>
      </FieldRoot>
    )

    await user.tab()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Required')
  })

  it('stays visible with defaultShowOnError when invalid', () => {
    render(
      <FieldRoot invalid>
        <FieldControl />
        <FieldFeedback defaultShowOnError>Required</FieldFeedback>
      </FieldRoot>
    )
    const feedback = screen.getByRole('tooltip')
    expect(feedback).toHaveTextContent('Required')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', feedback.id)
  })

  it('portals into a custom floatingRoot id', () => {
    const root = document.createElement('div')
    root.id = 'field-portal-root'
    document.body.appendChild(root)

    render(
      <FieldRoot invalid>
        <FieldControl />
        <FieldFeedback defaultShowOnError floatingRoot='field-portal-root'>
          Required
        </FieldFeedback>
      </FieldRoot>
    )

    expect(root.querySelector('.field-feedback')).toHaveTextContent('Required')
    root.remove()
  })
})
