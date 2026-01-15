import { CancelCircleHalfDotIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { useOffcanvasContext } from './OffcanvasContext'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function OffcanvasClose({ content: _, className, ...props }, ref) {
    const { setOpen } = useOffcanvasContext()
    return (
      <button
        {...props}
        className={clsx(className, 'offcanvas-close')}
        onClick={e => {
          e.stopPropagation()
          setOpen(false)
        }}
        ref={ref}
      >
        <HugeiconsIcon height={22} icon={CancelCircleHalfDotIcon} strokeWidth={2} width={22} />
      </button>
    )
  }
)
