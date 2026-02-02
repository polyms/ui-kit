import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'
import Icons from '../Icons'

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
      <Icons.Close size={22} />
    </Dialog.Close>
  )
})

ModalClose.displayName = 'ModalClose'
