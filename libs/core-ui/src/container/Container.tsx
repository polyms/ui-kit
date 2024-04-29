import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

export const Container = forwardRef(
  ({ size, className, ...props }: ContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
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
