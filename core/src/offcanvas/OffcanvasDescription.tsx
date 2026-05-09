import { Drawer } from '@base-ui/react/drawer'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasDescriptionProps = Drawer.Description.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasDescription = forwardRef<HTMLDivElement, OffcanvasDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Drawer.Description className={clsx('offcanvas-description', className)} ref={ref} {...props} />
  )
)

OffcanvasDescription.displayName = 'OffcanvasDescription'
