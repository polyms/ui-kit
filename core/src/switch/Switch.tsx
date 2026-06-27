import clsx from 'clsx'
import { type FC, forwardRef, type InputHTMLAttributes, type RefAttributes, useId } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type SwitchProps = RefAttributes<HTMLInputElement> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    variant?: 'primary'
    label?: string
    labelPos?: 'start' | 'end'
  }

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id: propId, className, variant, label, labelPos = 'end', ...props }, ref) => {
    const genId = useId()
    const id = propId ?? genId

    return (
      <label
        className={clsx('switch', { 'switch-label-start': labelPos === 'start' }, className, variant)}
        htmlFor={id}
      >
        {labelPos === 'start' && label ? <span className='switch-label'>{label}</span> : null}
        <input id={id} {...props} ref={ref} type='checkbox' />
        {labelPos === 'end' && label ? <span className='switch-label'>{label}</span> : null}
      </label>
    )
  }
)
