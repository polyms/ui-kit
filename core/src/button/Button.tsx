import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { forwardRef, Suspense, useEffect, useState } from 'react'
import { Tooltip } from '../tooltip'

// const TooltipLazy = lazy(async () => {
//   const { Tooltip } = await import('../tooltip')
//   return { default: Tooltip }
// })

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
export type ButtonVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light'

export interface ButtonProps extends useRender.ComponentProps<'button'> {
  size?: ButtonSize
  variant?: ButtonVariant
  outlined?: boolean
  rounded?: boolean
  icon?: boolean
  active?: boolean
  tooltip?: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variantMap = {
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  light: 'btn-light',
  dark: 'btn-dark',
  danger: 'btn-danger',
  warning: 'btn-warning',
  link: 'btn-link',
  'link-danger': 'btn-link-danger',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, outlined, rounded, icon, active, tooltip, title, render, ...props }, ref) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const useRichTooltip = Boolean(tooltip)
    const resolvedTitle = useRichTooltip ? (mounted ? undefined : tooltip) : title

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
      ...(resolvedTitle !== undefined && resolvedTitle !== '' ? { title: resolvedTitle } : {}),
    }

    const button = useRender({
      defaultTagName: 'button',
      ref,
      props: mergeProps<'button'>(defaultProps, props),
      render,
    })

    if (useRichTooltip && mounted) {
      return (
        <Suspense fallback={button}>
          <Tooltip title={tooltip}>{button}</Tooltip>
        </Suspense>
      )
    }

    return button
  }
)
