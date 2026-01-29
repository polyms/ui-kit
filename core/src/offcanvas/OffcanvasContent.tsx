import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { OffcanvasClose } from './OffcanvasClose'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasContentProps = Dialog.Popup.Props & {
  closeButton?: boolean
  backdrop?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasContent = forwardRef<HTMLDivElement, OffcanvasContentProps>(function OffcanvasContent(
  { children, closeButton = true, backdrop = true, className, ...props },
  ref
) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className='offcanvas-backdrop' />
      <Dialog.Popup className={clsx('offcanvas-content', className)} ref={ref} {...props}>
        {closeButton && <OffcanvasClose aria-label='Close' />}
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  )
})

OffcanvasContent.displayName = 'OffcanvasContent'
