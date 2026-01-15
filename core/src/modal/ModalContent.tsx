import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import React from 'react'

// ── Types ───────────────────────────────────────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: 'modal-sm',
  lg: 'modal-lg',
  xl: 'modal-xl',
  full: 'modal-full',
}

export type ModalSize = keyof typeof sizeMap

export interface ModalContentProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
  size?: ModalSize
  centered?: boolean
  scrollable?: boolean
}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(function ModalContent(
  { className, size, centered = true, scrollable = false, id, ...props },
  propRef
) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className='modal-backdrop' />
      <div className={clsx('modal', size && sizeMap[size])} id={id} ref={propRef}>
        <Dialog.Popup
          className={clsx('modal-dialog', {
            'modal-dialog-centered': centered,
            'modal-dialog-scrollable': scrollable,
          })}
        >
          <div className={clsx('modal-content', className)} {...props} />
        </Dialog.Popup>
      </div>
    </Dialog.Portal>
  )
})
