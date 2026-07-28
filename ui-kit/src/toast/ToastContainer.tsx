import { Toast } from '@base-ui/react/toast'
import clsx from 'clsx'
import { type PropsWithChildren, useEffect } from 'react'
import Icons from '../Icons'
import { toastManager as defaultToastManager } from './useToastManager'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ToastContainerPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

type ToastManager = ReturnType<typeof Toast.createToastManager>

type ToastProviderProps = PropsWithChildren<{
  toastManager?: ToastManager
}>

type ToastContainerProps = {
  id?: string
  className?: string
  /** Screen-edge placement for stacked toasts. Default: `bottom-right`. */
  position?: ToastContainerPosition
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToastProvider = ({ children, toastManager = defaultToastManager }: ToastProviderProps) => (
  <Toast.Provider toastManager={toastManager}>{children}</Toast.Provider>
)

export const ToastContainer = ({
  id = 'toast-container',
  className,
  position = 'bottom-right',
}: ToastContainerProps) => {
  const toastManager = Toast.useToastManager()
  const isTop = position.startsWith('top')

  useEffect(() => {
    document.addEventListener('toasts:add', (event: Event) => {
      toastManager.add((event as CustomEvent).detail)
    })
    document.addEventListener('toasts:close', (event: Event) => {
      toastManager.close((event as CustomEvent<string>).detail)
    })
  }, [])

  return (
    <Toast.Portal>
      <Toast.Viewport className={clsx('toast-container', `toast-container-${position}`, className)} id={id}>
        {toastManager.toasts.map(toast => (
          <Toast.Root
            className={clsx('toast', {
              'toast-success': toast.type === 'success',
              'toast-danger': toast.type === 'danger',
              'toast-info': toast.type === 'info',
              'toast-warning': toast.type === 'warning',
              'toast-top': isTop,
            })}
            key={toast.id}
            style={{ ['--gap' as string]: '1rem' }}
            swipeDirection={isTop ? 'down' : 'up'}
            toast={toast}
          >
            <Toast.Content className='toast-content'>
              {toast.type === 'success' && <Icons.Success className='toast-icon' />}
              {toast.type === 'danger' && <Icons.Danger className='toast-icon' />}
              {toast.type === 'warning' && <Icons.Warning className='toast-icon' />}
              {toast.type === 'info' && <Icons.Info className='toast-icon' />}
              <Toast.Title className='toast-title' />
              <Toast.Description className='toast-description' />
              <Toast.Action className='toast-actions btn btn-dark btn-xs' />
              <Toast.Close aria-label='Close' className='toast-close'>
                <Icons.Close size={14} />
              </Toast.Close>
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}
