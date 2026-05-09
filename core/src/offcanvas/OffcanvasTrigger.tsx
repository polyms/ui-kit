import { Drawer } from '@base-ui/react/drawer'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasTriggerProps = Drawer.Trigger.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasTrigger = forwardRef<HTMLButtonElement, OffcanvasTriggerProps>(
  ({ className, ...props }, ref) => (
    <Drawer.Trigger className={clsx('offcanvas-trigger', className)} ref={ref} {...props} />
  )
)

OffcanvasTrigger.displayName = 'OffcanvasTrigger'
