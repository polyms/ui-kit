import { ListGroup as Root } from './ListGroup'
import { ListGroupItem, ListGroupItemButton, ListGroupItemLink } from './ListGroupItem'

export const ListGroup = Object.assign(Root, {
  Item: ListGroupItem,
  Link: ListGroupItemLink,
  Button: ListGroupItemButton,
})

export * from './ListGroup.types'
export * from './useListGroupItem'
