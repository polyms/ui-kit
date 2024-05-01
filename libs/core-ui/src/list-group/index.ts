import { ListGroup as Root } from './ListGroup'
import { ListGroupItem } from './ListGroupItem'
import { ListGroupItemButton } from './ListGroupItemButton'
import { ListGroupItemLink } from './ListGroupItemLink'

export const ListGroup = Object.assign(Root, {
  Item: ListGroupItem,
  Link: ListGroupItemLink,
  Button: ListGroupItemButton,
})

export * from './ListGroup.types'
export * from './ListGroupItem'
export * from './ListGroupItemLink'
export * from './ListGroupItemButton'
export * from './useListGroupItem'

export type { ListGroupProps } from './ListGroup'
