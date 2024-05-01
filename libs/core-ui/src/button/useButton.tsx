import classNames from 'classnames'
import { HTMLAttributes } from 'react'

import { ButtonBaseProps } from './Button.types'

export function useButton<T extends ButtonBaseProps = ButtonBaseProps>({
  variant,
  outline,
  size,
  disabled,
  active,
  className,
  ...props
}: T) {
  return {
    ...props,
    className: classNames(className, 'btn', {
      [`btn-${variant}`]: variant && (variant === 'link' || !outline),
      [`btn-outline-${variant}`]: variant && variant !== 'link' && outline,
      [`btn-${size}`]: size,
      active,
    }),
    'aria-disabled': disabled,
  } as T & HTMLAttributes<HTMLElement>
}
