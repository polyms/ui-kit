import { Select } from '@base-ui/react/select'
import { Tick01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export const SelectItem = ({ children, ...props }: SelectItemProps) => {
  return (
    <Select.Item className='select-item' {...props}>
      <Select.ItemIndicator className='select-item-indicator'>
        <HugeiconsIcon icon={Tick01Icon} size={16} />
      </Select.ItemIndicator>
      <Select.ItemText className='select-item-text'>{children}</Select.ItemText>
    </Select.Item>
  )
}

type SelectItemProps = Select.Item.Props
