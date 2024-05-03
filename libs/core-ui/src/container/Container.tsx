import classNames from 'classnames'
import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react'

export const Container: ContainerComponent = forwardRef(
  ({ size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(className, {
          container: !size,
          [`container-${size}`]: size,
        })}
      />
    )
  }
)

// ======================================================================================

export type ContainerProps = JSX.IntrinsicElements['div'] & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'
}

type ContainerComponent = ForwardRefExoticComponent<
  Omit<ContainerProps, 'ref'> & RefAttributes<HTMLDivElement>
>
