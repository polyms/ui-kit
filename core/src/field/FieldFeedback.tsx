import { FloatingPortal } from '@floating-ui/react'
import type { FC } from 'react'
import { useFieldContext } from './FieldContext'
import { useValidation } from './useValidation'

// ── Types ─────────────────────────────────────────────────────────────────────────────

export interface FieldFeedbackProps {
  children?: React.ReactNode
  floatingRoot?: string
  defaultShowOnError?: boolean
}

// ── Components ──────────────────────────────────────────────────────────────────────────

export const FieldFeedback: FC<FieldFeedbackProps> = ({
  children,
  floatingRoot: floatingRootId,
  defaultShowOnError,
}) => {
  const { id, invalid } = useFieldContext()
  const { refs, floatingStyles, isOpen, getFloatingProps } = useValidation({ controlId: id })

  if (!((isOpen || defaultShowOnError) && invalid && children)) return null

  return (
    <FloatingPortal id={floatingRootId}>
      <div
        ref={refs.setFloating}
        style={{ ...floatingStyles, zIndex: 99999 }}
        {...getFloatingProps()}
        className='field-feedback'
      >
        {children}
      </div>
    </FloatingPortal>
  )
}
