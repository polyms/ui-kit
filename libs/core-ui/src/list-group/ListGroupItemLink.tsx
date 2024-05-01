import classNames from 'classnames'
import { ForwardRefExoticComponent, ForwardedRef, RefAttributes, forwardRef } from 'react'

import { ListGroupItemBaseProps } from './ListGroup.types'
import { useListGroupItem } from './useListGroupItem'

export const ListGroupItemLink: ListGroupItemLinkComponent = forwardRef(
  (props: ListGroupItemLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const newProps = useListGroupItem(props)
    return (
      <a
        {...newProps}
        className={classNames('list-group-item-action', newProps.className)}
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type ListGroupItemLinkProps = React.JSX.IntrinsicElements['a'] &
  ListGroupItemBaseProps

type ListGroupItemLinkComponent = ForwardRefExoticComponent<
  Omit<ListGroupItemLinkProps, 'ref'> & RefAttributes<HTMLAnchorElement>
>
