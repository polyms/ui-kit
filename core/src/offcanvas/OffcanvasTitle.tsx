import { Drawer } from '@base-ui/react/drawer'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasTitleProps = Drawer.Title.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasTitle = forwardRef<HTMLHeadingElement, OffcanvasTitleProps>(
  ({ className, ...props }, ref) => (
    <Drawer.Title className={clsx('offcanvas-title', className)} ref={ref} {...props} />
  )
)

OffcanvasTitle.displayName = 'OffcanvasTitle'
