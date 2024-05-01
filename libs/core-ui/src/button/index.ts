import { Button as Root } from './Button'
import { ButtonGroup } from './ButtonGroup'
import { ButtonInput } from './ButtonInput'
import { ButtonLink } from './ButtonLink'
import { ButtonToolbar } from './ButtonToolbar'

export const Button = Object.assign(Root, {
  Link: ButtonLink,
  Input: ButtonInput,
  Group: ButtonGroup,
  Toolbar: ButtonToolbar,
})

export * from './useButton'
export * from './ButtonLink'
export * from './ButtonInput'
export * from './ButtonGroup'
export * from './ButtonToolbar'

export type { ButtonProps } from './Button'
