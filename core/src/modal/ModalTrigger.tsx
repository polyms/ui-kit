import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import React from 'react'

export const ModalTrigger = React.forwardRef<HTMLButtonElement, Dialog.Trigger.Props>(function ModalTrigger(
  { children, className, ...props },
  propRef
) {
  return (
    <Dialog.Trigger {...props} ref={propRef} className={clsx('modal-trigger', className)}>
      {children}
    </Dialog.Trigger>
  )
})
