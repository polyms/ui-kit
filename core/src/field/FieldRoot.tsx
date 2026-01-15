import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import { FieldProvider } from './FieldContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface FieldRootProps extends useRender.ComponentProps<'div'> {
  variant?: string
  rounded?: boolean
  size?: 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
  invalid?: boolean
  name?: string
  required?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const FieldRoot: FC<FieldRootProps> = ({
  variant,
  rounded,
  size,
  className,
  id,
  invalid,
  required,
  name,
  children,
  render,
  ...props
}) => {
  const defaultProps = {
    'data-field': id,
    className: clsx('field', className, {
      invalid,
      [`field-${size}`]: size,
      [`field-${variant}`]: variant,
      required,
    }),
  }

  const element = useRender({
    defaultTagName: 'div',
    props: { ...defaultProps, ...props, children },
    render,
  })

  return (
    <FieldProvider id={id} invalid={invalid} name={name} required={required}>
      {element}
    </FieldProvider>
  )
}
