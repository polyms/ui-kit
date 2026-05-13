import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useFieldContext } from './FieldContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldLabelProps extends useRender.ComponentProps<'label'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, render, ...props }, ref) => {
    const { id } = useFieldContext()

    const defaultProps = {
      htmlFor: id,
      className: clsx('field-label', className),
    }

    return useRender({
      defaultTagName: 'label',
      ref,
      props: { ...defaultProps, ...props },
      render,
    })
  }
)
