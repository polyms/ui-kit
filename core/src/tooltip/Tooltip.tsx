import { Tooltip as Base } from '@base-ui/react/tooltip'
import type { PropsWithChildren } from 'react'

import { TooltipContent } from './TooltipContent'

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
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      disabled={disabled}
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

// ======================================================================================

type TooltipProps = PropsWithChildren &
  Pick<Base.Root.Props, 'open' | 'onOpenChange' | 'onOpenChangeComplete' | 'disabled'> &
  Pick<Base.Positioner.Props, 'side' | 'align'> & {
    title?: string
  }
