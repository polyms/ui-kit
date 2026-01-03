import clsx from 'clsx'
import React from 'react'

export const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function ModalFooter({ className, ...props }, ref) {
    return <div {...props} className={clsx('modal-footer', className)} ref={ref} />
  }
)
