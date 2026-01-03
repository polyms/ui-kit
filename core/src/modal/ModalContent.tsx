import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import React from 'react'

const sizeMap = {
  sm: 'modal-sm',
  lg: 'modal-lg',
  xl: 'modal-xl',
  full: 'modal-full',
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(function ModalContent(
  { className, size, centered = true, scrollable = false, id, ...props },
  propRef
) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className='modal-backdrop' />
      <div ref={propRef} className={clsx('modal', size && sizeMap[size])} id={id}>
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

// ======================================================================================

type ModalContentProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
  size?: ModalSize
  centered?: boolean
  scrollable?: boolean
}

export type ModalSize = keyof typeof sizeMap
