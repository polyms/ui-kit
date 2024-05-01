import classNames from 'classnames'

import { ListGroupItemBaseProps } from './ListGroup.types'

export function useListGroupItem<
  T extends ListGroupItemBaseProps = ListGroupItemBaseProps
>({ active, disabled, className, variant, groupId, ...props }: T) {
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
