import { Dialog } from '@base-ui/react/dialog'
import { CancelCircleHalfDotIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import React from 'react'

export const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  function ModalClose(props, ref) {
    return (
      <Dialog.Close
        type='button'
        title='Close'
        {...props}
        className={clsx('modal-close', props.className)}
        ref={ref}
      >
        <HugeiconsIcon icon={CancelCircleHalfDotIcon} width={22} height={22} strokeWidth={2} />
      </Dialog.Close>
    )
  }
)

// ======================================================================================

type ModalCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>
