import classNames from 'classnames'
import {
  Children,
  ForwardedRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
} from 'react'

import { Breakpoint } from '../enums.const'
import { ListGroupItemProps } from './ListGroupItem'

export const ListGroup = forwardRef(
  (
    { flush, numbered, horizontal, className, children, ...props }: ListGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const id = useId()

    const childrenWithProps = Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a
      // typescript error too.
      if (isValidElement(child)) {
        return cloneElement(child as ReactElement<ListGroupItemProps>, { groupId: id })
      }
      return child
    })

    return (
      <div
        ref={ref}
        {...props}
        id={id}
        className={classNames(className, 'list-group', {
          'list-group-flush': flush,
          'list-group-numbered': numbered,
          'list-group-horizontal': horizontal === true,
          [`list-group-horizontal-${horizontal}`]: typeof horizontal === 'string',
        })}
      >
        {childrenWithProps}
      </div>
    )
  }
)

// ======================================================================================

export type ListGroupProps = JSX.IntrinsicElements['div'] & {
  flush?: boolean
  numbered?: boolean
  horizontal?: true | Exclude<Breakpoint, 'xs'>
}
