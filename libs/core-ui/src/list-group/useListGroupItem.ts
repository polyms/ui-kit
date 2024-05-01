import classNames from 'classnames'

import { ListGroupItemBase } from './ListGroup.types'

export function useListGroupItem<T extends ListGroupItemBase = ListGroupItemBase>({
  active,
  disabled,
  className,
  variant,
  groupId,
  ...props
}: T) {
  const newProps = {
    ...props,
    className: classNames(className, 'list-group-item', {
      active,
      disabled,
      [`list-group-item-${variant}`]: variant,
    }),
    'aria-current': active,
    'aria-disabled': disabled,
    'data-group': groupId,
  }

  return newProps
}
