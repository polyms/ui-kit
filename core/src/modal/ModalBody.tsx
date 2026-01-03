import clsx from 'clsx'
import React from 'react'

export const ModalBody = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function ModalBody(
  { className, ...props },
  ref
) {
  return <div {...props} className={clsx('modal-body', className)} ref={ref} />
})
