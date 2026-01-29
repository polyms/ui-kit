import { Select } from '@base-ui/react/select'

export const SelectItem = ({ children, checked, ...props }: SelectItemProps) => {
  return (
    <Select.Item className='select-item' {...props}>
      <Select.ItemIndicator className='select-item-indicator'>
        <TickIcon />
      </Select.ItemIndicator>
      <Select.ItemText className='select-item-text'>{children}</Select.ItemText>
    </Select.Item>
  )
}

type SelectItemProps = Select.Item.Props & { checked?: boolean }

const TickIcon = () => (
  <svg
    data-src='https://cdn.hugeicons.com/icons/tick-01-stroke-rounded.svg?v=1.0.1'
    fill='none'
    height='24'
    role='img'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7'
      stroke='var(--color-slate-900)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
    ></path>
  </svg>
)
