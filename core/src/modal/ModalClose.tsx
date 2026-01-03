import { Dialog } from '@base-ui/react/dialog'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import React from 'react'

export const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  function ModalClose(props, ref) {
    return (
      <Dialog.Close type='button' {...props} className={clsx('modal-close', props.className)} ref={ref}>
        {/* Cancel01Icon */}
        <HugeiconsIcon icon={Cancel01Icon} width={20} height={20} strokeWidth={2.5} />
      </Dialog.Close>
    )
  }
)

// ======================================================================================

type ModalCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>
