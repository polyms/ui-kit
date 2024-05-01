import classNames from 'classnames'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

export const ButtonToolbar: ButtonToolbarComponent = forwardRef(
  ({ className, ...props }: ButtonToolbarProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        {...props}
        className={classNames(className, 'btn-toolbar')}
        role='toolbar'
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type ButtonToolbarProps = JSX.IntrinsicElements['div']

type ButtonToolbarComponent = ForwardRefExoticComponent<
  Omit<ButtonToolbarProps, 'ref'> & RefAttributes<HTMLDivElement>
>
