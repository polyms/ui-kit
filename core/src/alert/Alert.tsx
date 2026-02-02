import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import Icons from '../Icons'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type AlertVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface AlertProps extends useRender.ComponentProps<'div'> {
  variant?: AlertVariant
  onDismiss?: () => void
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Alert: FC<AlertProps> = ({
  className,
  variant = 'primary',
  onDismiss,
  render,
  children,
  ...props
}) => {
  const defaultProps = {
    className: clsx('alert', `alert-${variant}`, { 'alert-dismissible': onDismiss }, className),
    role: 'alert',
    children: (
      <>
        {children}
        {onDismiss && (
          <button aria-label='Close' className='alert-close' onClick={onDismiss} type='button'>
            <Icons.Close />
          </button>
        )}
      </>
    ),
  }

  return useRender({
    defaultTagName: 'div',
    props: { ...defaultProps, ...props },
    render,
  })
}
