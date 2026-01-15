import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalTriggerProps extends Dialog.Trigger.Props {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Dialog.Trigger {...props} className={clsx('modal-trigger', className)} ref={ref}>
        {children}
      </Dialog.Trigger>
    )
  }
)

ModalTrigger.displayName = 'ModalTrigger'
