import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasDescriptionProps = Dialog.Description.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasDescription = forwardRef<HTMLDivElement, OffcanvasDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Description className={clsx('offcanvas-description', className)} ref={ref} {...props} />
  )
)

OffcanvasDescription.displayName = 'OffcanvasDescription'
