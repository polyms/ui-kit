import { Menu as Base } from '@base-ui/react/menu'
import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type MenuContentProps = HTMLProps<HTMLDivElement> &
  Partial<Pick<Base.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'>>

type MenuItemProps = Base.Item.Props & {
  variant?: 'danger'
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

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
    <Base.Portal>
      <Base.Positioner
        align={align}
        alignOffset={alignOffset}
        className='menu z-popover outline-none'
        side={side}
        sideOffset={sideOffset}
      >
        <Base.Popup className={clsx(className, 'menu-popup')} style={style}>
          {children}
        </Base.Popup>
      </Base.Positioner>
    </Base.Portal>
  )
}

export const MenuItem: FC<MenuItemProps> = ({ variant, ...props }) => (
  <Base.Item {...props} className={clsx(props.className, 'menu-item', { [`menu-${variant}`]: !!variant })} />
)

export const MenuSubmenuTrigger: FC<Base.Item.Props> = props => (
  <Base.SubmenuTrigger {...props} className={clsx(props.className, 'menu-item')} />
)

export const MenuSeparator: FC<Base.Separator.Props> = props => (
  <Base.Separator {...props} className={clsx(props.className, 'menu-separator')} />
)

export const MenuGroup: FC<Base.Group.Props> = props => (
  <Base.Group {...props} className={clsx(props.className, 'menu-group')} />
)

export const MenuGroupLabel: FC<Base.GroupLabel.Props> = props => (
  <Base.GroupLabel {...props} className={clsx(props.className, 'menu-group-label')} />
)
