import { Menu as Base } from '@base-ui/react/menu'

import {
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuSubmenuTrigger,
} from './MenuContent'

export const Menu = Object.assign(Base.Root, {
  Trigger: Base.Trigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  SubmenuRoot: Base.SubmenuRoot,
  SubmenuTrigger: MenuSubmenuTrigger,
})
