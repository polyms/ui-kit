import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useFieldContext } from './FieldContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldControlProps extends useRender.ComponentProps<'input'> {
  rounded?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldControl = forwardRef<HTMLInputElement, FieldControlProps>(
  ({ className, render, rounded, ...props }, ref) => {
    const { id, name } = useFieldContext()

    const defaultProps = {
      id,
      name,
      className: clsx('field-control', { 'rounded-full': rounded }, className),
    }

    return useRender({
      defaultTagName: 'input',
      ref,
      props: { ...defaultProps, ...props },
      render,
    })
  }
)
