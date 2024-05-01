import classNames from 'classnames'
import { ForwardRefExoticComponent, ForwardedRef, RefAttributes, forwardRef } from 'react'

import { ListGroupItemBaseProps } from './ListGroup.types'
import { useListGroupItem } from './useListGroupItem'

export const ListGroupItemButton: ListGroupItemButtonComponent = forwardRef(
  (props: ListGroupItemButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const newProps = useListGroupItem(props)
    return (
      <button
        type='button'
        {...newProps}
        className={classNames('list-group-item-action', newProps.className)}
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type ListGroupItemButtonProps = React.JSX.IntrinsicElements['button'] &
  ListGroupItemBaseProps

type ListGroupItemButtonComponent = ForwardRefExoticComponent<
  Omit<ListGroupItemButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>
>
