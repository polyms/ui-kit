import { ToolbarButton } from './ToolbarButton'
import { ToolbarGroup } from './ToolbarGroup'
import { ToolbarInput } from './ToolbarInput'
import { ToolbarLink } from './ToolbarLink'
import { ToolbarRoot } from './ToolbarRoot'
import { ToolbarSeparator } from './ToolbarSeparator'

export const Toolbar = Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Link: ToolbarLink,
  Input: ToolbarInput,
  Group: ToolbarGroup,
  Separator: ToolbarSeparator,
})
