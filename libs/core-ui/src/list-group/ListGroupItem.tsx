import classNames from 'classnames'
import React from 'react'
import { ForwardedRef, forwardRef } from 'react'

import { ListGroupItemBase } from './ListGroup.types'
import { useListGroupItem } from './useListGroupItem'

export const ListGroupItem = forwardRef(
  (props: ListGroupItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const newProps = useListGroupItem(props)
    return <div {...newProps} ref={ref} />
  }
)

export const ListGroupItemLink = forwardRef(
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

export const ListGroupItemButton = forwardRef(
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

export type ListGroupItemProps = React.JSX.IntrinsicElements['div'] & ListGroupItemBase

export type ListGroupItemLinkProps = React.JSX.IntrinsicElements['a'] & ListGroupItemBase

export type ListGroupItemButtonProps = React.JSX.IntrinsicElements['button'] &
  ListGroupItemBase
