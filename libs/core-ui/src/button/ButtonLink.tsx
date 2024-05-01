import classNames from 'classnames'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

import { ButtonBaseProps } from './Button.types'
import { useButton } from './useButton'

export const ButtonLink: ButtonLinkComponent = forwardRef(
  (props: ButtonLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { disabled, className, ...newProps } = useButton(props)

    return (
      <a
        {...newProps}
        className={classNames(className, { disabled })}
        role='button'
        ref={ref}
      />
    )
  }
)

// ======================================================================================

export type ButtonLinkProps = JSX.IntrinsicElements['a'] & ButtonBaseProps

type ButtonLinkComponent = ForwardRefExoticComponent<
  Omit<ButtonLinkProps, 'ref'> & RefAttributes<HTMLAnchorElement>
>
