import { Popover as Base } from '@base-ui/react/popover'
import { PopoverContent } from './PopoverContent'

export * from './PopoverContent'

export const Popover = Object.assign(Base.Root, {
  Trigger: Base.Trigger,
  Close: Base.Close,
  Content: PopoverContent,
  Description: Base.Description,
})
