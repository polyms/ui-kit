import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { ForwardedRef, forwardRef } from 'react'

import { ListGroupItemBaseProps } from './ListGroup.types'
import { useListGroupItem } from './useListGroupItem'

export const ListGroupItem: ListGroupItemComponent = forwardRef(
  (props: ListGroupItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const newProps = useListGroupItem(props)
    return <div {...newProps} ref={ref} />
  }
)

// ======================================================================================

export type ListGroupItemProps = React.JSX.IntrinsicElements['div'] &
  ListGroupItemBaseProps

type ListGroupItemComponent = ForwardRefExoticComponent<
  Omit<ListGroupItemProps, 'ref'> & RefAttributes<HTMLDivElement>
>
