import { Dialog } from '@base-ui/react/dialog'
import { forwardRef } from 'react'
import Icons from '../Icons'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalCloseProps extends Dialog.Close.Props {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(({ children, ...props }, ref) => {
  return (
    <Dialog.Close title='Close' {...props} ref={ref}>
      {children ?? <Icons.Close size={22} />}
    </Dialog.Close>
  )
})

ModalClose.displayName = 'ModalClose'
