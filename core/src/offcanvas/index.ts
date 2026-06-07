import { Offcanvas as Root } from './Offcanvas'
import { OffcanvasBody } from './OffcanvasBody'
import { OffcanvasClose } from './OffcanvasClose'
import { OffcanvasContainer } from './OffcanvasContainer'
import { OffcanvasContent } from './OffcanvasContent'
import { OffcanvasDescription } from './OffcanvasDescription'
import { OffcanvasHeader } from './OffcanvasHeader'
import { OffcanvasTitle } from './OffcanvasTitle'
import { OffcanvasTrigger } from './OffcanvasTrigger'

export * from './OffcanvasContainer'
export * from './offcanvas.store'

export const Offcanvas = Object.assign(Root, {
  Trigger: OffcanvasTrigger,
  Content: OffcanvasContent,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
  Description: OffcanvasDescription,
  Close: OffcanvasClose,
  Body: OffcanvasBody,
  Container: OffcanvasContainer,
})
