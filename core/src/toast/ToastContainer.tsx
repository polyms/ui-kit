import { Toast } from '@base-ui/react/toast'
import { FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx'
import { type PropsWithChildren, useEffect } from 'react'
import { CloseToastIcon, DangerToastIcon, SuccessToastIcon, WarningToastIcon } from './ToastIcons'

export const toastManager = Toast.createToastManager()

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
      {/* biome-ignore lint/correctness/useUniqueElementIds: off */}
      <Toast.Viewport id='toast-container' className='toast-container'>
        {toastManager.toasts.map(toast => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            swipeDirection='up'
            className={clsx('toast', {
              'toast-success': toast.type === 'success',
              'toast-danger': toast.type === 'danger',
              'toast-warning': toast.type === 'warning',
              'toast-primary': toast.type === 'primary',
            })}
            style={{
              ['--gap' as string]: '1rem',
              ['--offset-y' as string]:
                'calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))',
            }}
          >
            <div className='flex items-center gap-2xs'>
              {toast.type === 'success' && <SuccessToastIcon />}
              {toast.type === 'danger' && <DangerToastIcon />}
              {toast.type === 'warning' && <WarningToastIcon />}
              <Toast.Title className='toast-title' />
              <Toast.Description className='toast-description' />
              <Toast.Action className='toast-actions btn btn-primary ms-auto rounded-full' />
            </div>
            <Toast.Close className='toast-close' aria-label='Close'>
              <CloseToastIcon />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </FloatingPortal>
  )
}
