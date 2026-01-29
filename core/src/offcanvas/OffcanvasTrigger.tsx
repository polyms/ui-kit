import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasTriggerProps = Dialog.Trigger.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasTrigger = forwardRef<HTMLButtonElement, OffcanvasTriggerProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Trigger className={clsx('offcanvas-trigger', className)} ref={ref} {...props} />
  )
)

OffcanvasTrigger.displayName = 'OffcanvasTrigger'
