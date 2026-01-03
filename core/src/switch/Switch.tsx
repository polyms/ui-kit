import { type FC, forwardRef, type InputHTMLAttributes, type RefAttributes, useId } from 'react'

export const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id: propId, className, variant, ...props }, ref) => {
    const genId = useId()
    const id = propId ?? genId

    const computedClass = ['switch', className, variant].filter(Boolean).join(' ')
    return <input id={id} {...props} ref={ref} type='checkbox' className={computedClass} />
  }
)

// ======================================================================================

export type SwitchProps = RefAttributes<HTMLInputElement> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    variant?: 'primary'
  }
