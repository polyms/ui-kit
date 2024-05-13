import { Popover as Root } from './Popover'
import { PopoverClose } from './PopoverClose'
import { PopoverContent } from './PopoverContent'
import { PopoverContext } from './PopoverContext'
import { PopoverDescription } from './PopoverDescription'
import { PopoverHeading } from './PopoverHeading'
import { PopoverTrigger } from './PopoverTrigger'

export const Popover = Object.assign(Root, {
  Context: PopoverContext,
  Close: PopoverClose,
  Content: PopoverContent,
  Description: PopoverDescription,
  Heading: PopoverHeading,
  Trigger: PopoverTrigger,
})

export * from './Popover.types'
export * from './PopoverContext'
export * from './PopoverClose'
export * from './PopoverContent'
export * from './PopoverDescription'
export * from './PopoverHeading'
export * from './PopoverTrigger'
