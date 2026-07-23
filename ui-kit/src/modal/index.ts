import { ModalBody } from './ModalBody'
import { ModalClose } from './ModalClose'
import { ModalContainer } from './ModalContainer'
import { ModalContent } from './ModalContent'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'
import { ModalRoot } from './ModalRoot'
import { ModalTrigger } from './ModalTrigger'

export * from './ModalContainer'
export type { ModalSize } from './ModalContent'
export * from './modal.store'

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
  Container: ModalContainer,
})
