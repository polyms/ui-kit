import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

import { Breakpoint, Breakpoints } from '../enums.const'

export const ListGroup = forwardRef(
  (
    { flush, numbered, horizontal, className, ...props }: ListGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      {...props}
      className={classNames(className, 'list-group', {
        'list-group-flush': flush,
        'list-group-numbered': numbered,
        'list-group-horizontal': horizontal === true,
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === 'string',
      })}
    />
  )
)

// ======================================================================================

export type ListGroupProps = JSX.IntrinsicElements['div'] & {
  flush?: boolean
  numbered?: boolean
  horizontal?: true | Exclude<Breakpoint, 'xs'>
}
