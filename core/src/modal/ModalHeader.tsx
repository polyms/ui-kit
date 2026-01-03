import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import React from 'react'

import { ModalClose } from './ModalClose'

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(function ModalHeader(
  { children, className, close = true, ...props },
  ref
) {
  return (
    <Dialog.Title {...props} render={<div />} className={clsx('modal-header', className)} ref={ref}>
      {children}

      {close && <ModalClose />}
    </Dialog.Title>
  )
})

// ======================================================================================

type ModalHeaderProps = React.HTMLProps<HTMLDivElement> & {
  close?: boolean
}
