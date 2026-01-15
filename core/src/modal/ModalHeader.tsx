import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ModalClose } from './ModalClose'

// ── Types ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  close?: boolean
}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, close = true, ...props }, ref) => {
    return (
      <Dialog.Title {...props} className={clsx('modal-header', className)} ref={ref} render={<div />}>
        {children}

        {close && <ModalClose />}
      </Dialog.Title>
    )
  }
)

ModalHeader.displayName = 'ModalHeader'
