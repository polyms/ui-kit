import { CancelCircleHalfDotIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { useOffcanvasContext } from './OffcanvasContext'

export const OffcanvasClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function OffcanvasClose({ content: _, className, ...props }, ref) {
    const { setOpen } = useOffcanvasContext()
    return (
      <button
        {...props}
        className={clsx(className, 'offcanvas-close')}
        ref={ref}
        onClick={e => {
          e.stopPropagation()
          setOpen(false)
        }}
      >
        <HugeiconsIcon icon={CancelCircleHalfDotIcon} width={22} height={22} strokeWidth={2} />
      </button>
    )
  }
)
