import { PropsWithChildren } from 'react'

import { TooltipOptions } from './Tooltip.types'
import { TooltipContent } from './TooltipContent'
import { TooltipProvider } from './TooltipContext'
import { TooltipTrigger } from './TooltipTrigger'
import { useTooltip } from './useTooltip'

export function Tooltip({ children, title, ...options }: TooltipProps) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options)

  return (
    <TooltipProvider value={tooltip}>
      {title ? (
        <>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </>
      ) : (
        children
      )}
    </TooltipProvider>
  )
}

// ======================================================================================

export type TooltipProps = PropsWithChildren<TooltipOptions> & {
  title?: string
}
