import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

import { ButtonBaseProps } from './Button.types'
import { useButton } from './useButton'

export const Button: ButtonComponent = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const newProps = useButton(props)

    return <button type='button' {...newProps} ref={ref} />
  }
)

// ======================================================================================

export type ButtonProps = JSX.IntrinsicElements['button'] & ButtonBaseProps

type ButtonComponent = ForwardRefExoticComponent<
  Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>
>
