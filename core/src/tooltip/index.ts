import { Tooltip as Base } from '@base-ui/react/tooltip'

import { Tooltip as Root } from './Tooltip'
import { TooltipContent } from './TooltipContent'

export const Tooltip = Object.assign(Root, {
  Provider: Base.Provider,
  Trigger: Base.Trigger,
  Content: TooltipContent,
})
