import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import { useFieldContext } from './FieldContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldLabelProps extends useRender.ComponentProps<'label'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldLabel: FC<FieldLabelProps> = ({ className, render, ...props }) => {
  const { id } = useFieldContext()

  const defaultProps = {
    htmlFor: id,
    className: clsx('field-label', className),
  }

  return useRender({
    defaultTagName: 'label',
    props: { ...defaultProps, ...props },
    render,
  })
}
