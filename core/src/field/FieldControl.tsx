import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import { useFieldContext } from './FieldContext'

// ── Types ─────────────────────────────------------------------------------------------

export interface FieldControlProps extends useRender.ComponentProps<'input'> {
  rounded?: boolean
}

// ── Components ─────────────────────────────-------------------------------------------

export const FieldControl: FC<FieldControlProps> = ({ className, render, rounded, ...props }) => {
  const { id, name } = useFieldContext()

  const defaultProps = {
    id,
    name,
    className: clsx('field-control', { 'rounded-full': rounded }, className),
  }

  return useRender({
    defaultTagName: 'input',
    props: { ...defaultProps, ...props },
    render,
  })
}
