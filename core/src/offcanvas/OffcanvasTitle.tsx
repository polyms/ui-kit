import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type OffcanvasTitleProps = Dialog.Title.Props

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const OffcanvasTitle = forwardRef<HTMLHeadingElement, OffcanvasTitleProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Title className={clsx('offcanvas-title', className)} ref={ref} {...props} />
  )
)

OffcanvasTitle.displayName = 'OffcanvasTitle'
