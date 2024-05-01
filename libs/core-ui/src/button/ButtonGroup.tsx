import classNames from 'classnames'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

export const ButtonGroup: ButtonGroupComponent = forwardRef(
  (
    { className, size, vertical, ...props }: ButtonGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        className={classNames(className, {
          'btn-group': !vertical,
          'btn-group-vertical': vertical,
          [`btn-group-${size}`]: size,
        })}
        role='group'
        ref={ref}
      />
    )
  }
)

// ======================================================================================

type ButtonGroupProps = JSX.IntrinsicElements['div'] & {
  size?: 'sm' | 'lg'
  vertical?: boolean
}

type ButtonGroupComponent = ForwardRefExoticComponent<
  Omit<ButtonGroupProps, 'ref'> & RefAttributes<HTMLDivElement>
>
