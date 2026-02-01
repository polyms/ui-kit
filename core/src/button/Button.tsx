import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
export type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'dark' | 'light'

export interface ButtonProps extends useRender.ComponentProps<'button'> {
  size?: ButtonSize
  variant?: ButtonVariant
  outlined?: boolean
  rounded?: boolean
  icon?: boolean
  active?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variantMap = {
  primary: 'btn-primary',
  success: 'btn-success',
  light: 'btn-light',
  dark: 'btn-dark',
  danger: 'btn-danger',
  warning: 'btn-warning',
  link: 'btn-link',
  'link-danger': 'btn-link-danger',
}

export const Button: FC<ButtonProps> = ({
  className,
  size,
  variant,
  outlined,
  rounded,
  icon,
  active,
  render,
  ...props
}) => {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] = render ? undefined : 'button'

  const defaultProps = {
    className: clsx(className, 'btn', variant ? variantMap[variant] : 'btn-ghost', {
      outlined,
      'rounded-full': rounded,
      'btn-icon': icon,
      active,
      [`btn-${size}`]: size,
    }),
    'data-slot': 'button',
    type: typeValue,
  }
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(defaultProps, props),
    render,
  })
}
