import { Tooltip as Root } from './Tooltip'
import { TooltipContent } from './TooltipContent'
import { TooltipContext } from './TooltipContext'
import { TooltipTrigger } from './TooltipTrigger'

export const Tooltip = Object.assign(Root, {
  Context: TooltipContext,
  Content: TooltipContent,
  Trigger: TooltipTrigger,
})

export * from './Tooltip.types'
export * from './TooltipContext'
export * from './TooltipContent'
export * from './TooltipTrigger'
