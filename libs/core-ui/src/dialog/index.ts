import { Dialog as Root } from './Dialog'
import { DialogClose } from './DialogClose'
import { DialogContent } from './DialogContent'
import { DialogContext } from './DialogContext'
import { DialogDescription } from './DialogDescription'
import { DialogHeading } from './DialogHeading'
import { DialogTrigger } from './DialogTrigger'

export const Dialog = Object.assign(Root, {
  Context: DialogContext,
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Heading: DialogHeading,
  Trigger: DialogTrigger,
})

export * from './DialogContext'
export * from './DialogClose'
export * from './DialogContent'
export * from './DialogDescription'
export * from './DialogHeading'
export * from './DialogTrigger'
