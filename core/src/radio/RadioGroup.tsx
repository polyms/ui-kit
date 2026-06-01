import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import clsx from 'clsx'
import type { RadioSize, RadioVariant } from './Radio'
import { RadioProvider } from './RadioContext'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type RadioGroupOrientation = 'vertical' | 'horizontal'

export interface RadioGroupProps extends BaseRadioGroup.Props<string> {
  orientation?: RadioGroupOrientation
  size?: RadioSize
  variant?: RadioVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function RadioGroup({
  children,
  className,
  orientation = 'vertical',
  size,
  variant,
  ...props
}: RadioGroupProps) {
  return (
    <RadioProvider size={size} variant={variant}>
      <BaseRadioGroup
        {...props}
        className={clsx('radio-group', className, {
          'radio-group-horizontal': orientation === 'horizontal',
        })}
      >
        {children}
      </BaseRadioGroup>
    </RadioProvider>
  )
}
