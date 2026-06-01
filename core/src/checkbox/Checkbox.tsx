import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type CheckboxSize = 'sm' | 'lg' | 'xl'
export type CheckboxVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark'

export interface CheckboxProps extends BaseCheckbox.Root.Props {
  size?: CheckboxSize
  variant?: CheckboxVariant
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  ({ children, className, size, variant = 'primary', ...props }, ref) => (
    <BaseCheckbox.Root
      {...props}
      className={clsx('checkbox', className, {
        [`checkbox-${size}`]: size,
        [`checkbox-${variant}`]: variant !== 'primary',
      })}
      ref={ref}
    >
      <BaseCheckbox.Indicator className='checkbox-indicator' keepMounted />
      {children ? <span className='checkbox-label'>{children}</span> : null}
    </BaseCheckbox.Root>
  )
)

Checkbox.displayName = 'Checkbox'
