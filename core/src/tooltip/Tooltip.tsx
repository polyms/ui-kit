import { Tooltip as Base } from '@base-ui/react/tooltip'
import type { PropsWithChildren } from 'react'

import { TooltipContent } from './TooltipContent'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type TooltipProps = PropsWithChildren &
  Pick<Base.Root.Props, 'open' | 'onOpenChange' | 'onOpenChangeComplete' | 'disabled'> &
  Pick<Base.Positioner.Props, 'side' | 'align'> & {
    title?: string
  }

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

export function Tooltip({
  children,
  title,
  open,
  onOpenChange,
  onOpenChangeComplete,
  disabled,
  ...props
}: TooltipProps) {
  return (
    <Base.Root
      disabled={disabled}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
    >
      {title ? (
        <>
          <Base.Trigger delay={100} render={children as never} />
          <TooltipContent {...props}>{title}</TooltipContent>
        </>
      ) : (
        children
      )}
    </Base.Root>
  )
}
