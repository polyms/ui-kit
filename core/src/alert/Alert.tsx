import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import type { FC } from 'react'
import { CloseIcon } from '../CloseIcon'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type AlertVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface AlertProps extends useRender.ComponentProps<'div'> {
  variant?: AlertVariant
  dismissible?: boolean
  onDismiss?: () => void
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Alert: FC<AlertProps> = ({
  className,
  variant = 'primary',
  dismissible,
  onDismiss,
  render,
  children,
  ...props
}) => {
  const defaultProps = {
    className: clsx('alert', `alert-${variant}`, { 'alert-dismissible': dismissible }, className),
    role: 'alert',
    children: (
      <>
        {children}
        {dismissible && (
          <button aria-label='Close' className='alert-close' onClick={onDismiss} type='button'>
            <svg
              color='currentColor'
              fill='none'
              height='18'
              role='img'
              viewBox='0 0 24 24'
              width='18'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <path
                d='M18 6L6.00081 17.9992M17.9992 18L6 6.00085'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></path>
            </svg>
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
