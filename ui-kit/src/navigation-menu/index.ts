import { NavigationMenu as Base } from '@base-ui/react/navigation-menu'

import {
  NavigationMenuContent,
  NavigationMenuFooter,
  NavigationMenuGroupLabel,
  NavigationMenuIcon,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuSeparator,
  NavigationMenuTrigger,
} from './NavigationMenuParts'
import { NavigationMenuViewport } from './NavigationMenuViewport'

export const NavigationMenu = Object.assign(Base.Root, {
  List: NavigationMenuList,
  Item: Base.Item,
  Trigger: NavigationMenuTrigger,
  Icon: NavigationMenuIcon,
  Content: NavigationMenuContent,
  GroupLabel: NavigationMenuGroupLabel,
  Separator: NavigationMenuSeparator,
  Footer: NavigationMenuFooter,
  Link: NavigationMenuLink,
  Viewport: NavigationMenuViewport,
})
