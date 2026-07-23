import { Radio as BaseRadio } from '@base-ui/react/radio'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useRadioGroupContext } from './RadioContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type RadioSize = 'sm' | 'lg' | 'xl'
export type RadioVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark'

export interface RadioProps extends BaseRadio.Root.Props<string> {
  size?: RadioSize
  variant?: RadioVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Radio = forwardRef<HTMLElement, RadioProps>(
  ({ children, className, size, variant, ...props }, ref) => {
    const group = useRadioGroupContext()
    const resolvedSize = size ?? group?.size
    const resolvedVariant = variant ?? group?.variant ?? 'primary'

    return (
      <BaseRadio.Root
        {...props}
        className={clsx('radio', className, {
          [`radio-${resolvedSize}`]: resolvedSize,
          [`radio-${resolvedVariant}`]: resolvedVariant !== 'primary',
        })}
        ref={ref}
      >
        <BaseRadio.Indicator className='radio-indicator' keepMounted />
        {children ? <span className='radio-label'>{children}</span> : null}
      </BaseRadio.Root>
    )
  }
)

Radio.displayName = 'Radio'
