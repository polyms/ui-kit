import { Toast } from '@base-ui/react/toast'
import { FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx'
import { type PropsWithChildren, useEffect } from 'react'
import Icons from '../Icons'
import { toastManager } from './useToastManager'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToastProvider = ({ children }: PropsWithChildren) => (
  <Toast.Provider toastManager={toastManager}>{children}</Toast.Provider>
)

export const ToastContainer = () => {
  const toastManager = Toast.useToastManager()

  useEffect(() => {
    document.addEventListener('toasts:add', (event: Event) => {
      toastManager.add((event as CustomEvent).detail)
    })
    document.addEventListener('toasts:close', (event: Event) => {
      toastManager.close((event as CustomEvent<string>).detail)
    })
  }, [])

  return (
    <FloatingPortal>
      <Toast.Viewport className='toast-container' id='toast-container'>
        {toastManager.toasts.map(toast => (
          <Toast.Root
            className={clsx('toast', {
              'toast-success': toast.type === 'success',
              'toast-danger': toast.type === 'danger',
              'toast-info': toast.type === 'info',
              'toast-warning': toast.type === 'warning',
            })}
            key={toast.id}
            style={{
              ['--gap' as string]: '1rem',
              ['--offset-y' as string]:
                'calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))',
            }}
            swipeDirection='up'
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
    </FloatingPortal>
  )
}
