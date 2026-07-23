import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldDescriptionProps extends useRender.ComponentProps<'div'> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldDescription: FC<FieldDescriptionProps> = ({ className, render, ...props }) => {
  const defaultProps = {
    className: clsx('field-description', className),
  }

  return useRender({
    defaultTagName: 'div',
    props: { ...defaultProps, ...props },
    render,
  })
}
