import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { CloseIcon } from '../CloseIcon'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>((props, ref) => {
  return (
    <Dialog.Close
      title='Close'
      type='button'
      {...props}
      className={clsx('modal-close', props.className)}
      ref={ref}
    >
      <CloseIcon size={22} />
    </Dialog.Close>
  )
})

ModalClose.displayName = 'ModalClose'
