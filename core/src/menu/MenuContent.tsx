import { Menu } from '@base-ui/react/menu'
import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'

export const MenuContent = ({
  children,
  style,
  className,
  side,
  sideOffset = 8,
  align,
  alignOffset = 0,
}: MenuContentProps) => {
  return (
    <Menu.Portal>
      <Menu.Positioner
        className='menu z-popover outline-none'
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        side={side}
        align={align}
      >
        <Menu.Popup style={style} className={clsx(className, 'menu-popup')}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

export const MenuItem: FC<MenuItemProps> = ({ variant, ...props }) => (
  <Menu.Item {...props} className={clsx(props.className, 'menu-item', { [`menu-${variant}`]: !!variant })} />
)
export const MenuSubmenuTrigger: FC<Menu.Item.Props> = props => (
  <Menu.SubmenuTrigger {...props} className={clsx(props.className, 'menu-item')} />
)

export const MenuSeparator: FC<Menu.Separator.Props> = props => (
  <Menu.Separator {...props} className={clsx(props.className, 'menu-separator')} />
)
export const MenuGroup: FC<Menu.Group.Props> = props => (
  <Menu.Group {...props} className={clsx(props.className, 'menu-group')} />
)
export const MenuGroupLabel: FC<Menu.GroupLabel.Props> = props => (
  <Menu.GroupLabel {...props} className={clsx(props.className, 'menu-group-label')} />
)

// ======================================================================================

type MenuContentProps = HTMLProps<HTMLDivElement> &
  Partial<Pick<Menu.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'>>

type MenuItemProps = Menu.Item.Props & {
  variant?: 'danger'
}
