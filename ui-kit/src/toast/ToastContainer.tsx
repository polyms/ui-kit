import { Toast } from '@base-ui/react/toast'
import clsx from 'clsx'
import { type PropsWithChildren, useEffect } from 'react'
import Icons from '../Icons'
import { toastManager } from './useToastManager'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ToastContainerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type ToastPlacement = 'top' | 'right' | 'bottom' | 'left'
type ToastAlignment = 'start' | 'center' | 'end'

type ToastContainerProps = {
  id?: string
  className?: string
  position?: ToastContainerPosition
}

type ToastWithPositioner = {
  id: string
  type?: 'success' | 'danger' | 'info' | 'warning' | 'actions'
  positionerProps?: {
    side?: ToastPlacement
    align?: ToastAlignment
  }
}

type ToastViewportPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'right-center'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'left-center'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const viewportOrder: ToastViewportPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'right-center',
  'bottom-right',
  'bottom-center',
  'bottom-left',
  'left-center',
]

const resolveViewportPosition = (
  toast: ToastWithPositioner,
  fallback: ToastContainerPosition
): ToastViewportPosition => {
  const side = toast.positionerProps?.side
  const align = toast.positionerProps?.align

  if (!side) {
    return fallback
  }

  const resolvedAlign = align ?? 'center'

  if (side === 'top' || side === 'bottom') {
    if (resolvedAlign === 'start') {
      return `${side}-left`
    }
    if (resolvedAlign === 'end') {
      return `${side}-right`
    }
    return `${side}-center`
  }

  if (resolvedAlign === 'start') {
    return 'top-center'
  }
  if (resolvedAlign === 'end') {
    return 'bottom-center'
  }
  return `${side}-center`
}

export const ToastProvider = ({ children }: PropsWithChildren) => (
  <Toast.Provider toastManager={toastManager}>{children}</Toast.Provider>
)

export const ToastContainer = ({ id = 'toast-container', className, position = 'bottom-right' }: ToastContainerProps) => {
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
    <Toast.Portal>
      {viewportOrder.map(viewportPosition => {
        const viewportToasts = toastManager.toasts.filter(
          toast => resolveViewportPosition(toast as ToastWithPositioner, position) === viewportPosition
        )
        const isTopViewport = viewportPosition.startsWith('top')

        if (viewportToasts.length === 0) {
          return null
        }

        return (
          <Toast.Viewport
            className={clsx('toast-container', `toast-container-${viewportPosition}`, className)}
            id={`${id}-${viewportPosition}`}
            key={viewportPosition}
          >
            {viewportToasts.map(toast => (
              <Toast.Root
                className={clsx('toast', {
                  'toast-success': toast.type === 'success',
                  'toast-danger': toast.type === 'danger',
                  'toast-info': toast.type === 'info',
                  'toast-warning': toast.type === 'warning',
                  'toast-top': isTopViewport,
                })}
                key={toast.id}
                style={{ ['--gap' as string]: '1rem' }}
                swipeDirection={isTopViewport ? 'down' : 'up'}
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
        )
      })}
    </Toast.Portal>
  )
}
