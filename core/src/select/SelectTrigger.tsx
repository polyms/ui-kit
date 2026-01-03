import { Select } from '@base-ui/react/select'
import { UnfoldMoreIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <Select.Trigger {...props} className={clsx('select', className)} ref={ref}>
      <Select.Value>{children}</Select.Value>
      <Select.Icon className='select-icon'>
        <HugeiconsIcon icon={UnfoldMoreIcon} size={16} />
      </Select.Icon>
    </Select.Trigger>
  )
)

SelectTrigger.displayName = 'SelectTrigger'

type SelectTriggerProps = Omit<Select.Trigger.Props, 'children'> & Pick<Select.Value.Props, 'children'>
