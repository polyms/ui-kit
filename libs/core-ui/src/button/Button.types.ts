import { Variant } from '../enums.const'

export type ButtonBaseProps = {
  variant?: ButtonVariant
  outline?: boolean
  size?: 'sm' | 'lg'
  disabled?: boolean
  active?: boolean
  className?: string
}

export type ButtonVariant = Variant | 'link'
