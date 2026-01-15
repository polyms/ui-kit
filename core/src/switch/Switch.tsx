import clsx from 'clsx'
import { type FC, forwardRef, type InputHTMLAttributes, type RefAttributes, useId } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type SwitchProps = RefAttributes<HTMLInputElement> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    variant?: 'primary'
    label?: string
  }

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id: propId, className, variant, label, ...props }, ref) => {
    const genId = useId()
    const id = propId ?? genId

    return (
      <label className={clsx('switch', className, variant)} htmlFor={id}>
        <input id={id} {...props} ref={ref} type='checkbox' />
        {label && <span className='switch-label'>{label}</span>}
      </label>
    )
  }
)
