import { Dialog } from '@base-ui/react/dialog'
import { CancelCircleHalfDotIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { forwardRef } from 'react'

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
      <HugeiconsIcon height={22} icon={CancelCircleHalfDotIcon} strokeWidth={2} width={22} />
    </Dialog.Close>
  )
})

ModalClose.displayName = 'ModalClose'
