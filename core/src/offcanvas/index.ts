import { Offcanvas as Root } from './Offcanvas'
import { OffcanvasClose } from './OffcanvasClose'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasContext } from './OffcanvasContext'
import { OffcanvasDescription } from './OffcanvasDescription'
import { OffcanvasHeader } from './OffcanvasHeader'
import { OffcanvasItem } from './OffcanvasItem'
import { OffcanvasTrigger } from './OffcanvasTrigger'

export const Offcanvas = Object.assign(Root, {
  Content: OffcanvasContent,
  Context: OffcanvasContext,
  Header: OffcanvasHeader,
  Description: OffcanvasDescription,
  Close: OffcanvasClose,
  Trigger: OffcanvasTrigger,
  Item: OffcanvasItem,
})

export { useOffcanvas } from './useOffcanvas'
