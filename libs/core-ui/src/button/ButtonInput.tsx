import {
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  RefAttributes,
  forwardRef,
} from 'react'

import { ButtonBaseProps } from './Button.types'
import { useButton } from './useButton'

export const ButtonInput: ButtonInputComponent = forwardRef(
  (props: ButtonInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const newProps = useButton(props)

    return <input type='submit' {...newProps} ref={ref} />
  }
)

// ======================================================================================

export type ButtonInputProps = JSX.IntrinsicElements['input'] & ButtonBaseProps

type ButtonInputComponent = ForwardRefExoticComponent<
  Omit<ButtonInputProps, 'ref'> & RefAttributes<HTMLInputElement>
>
