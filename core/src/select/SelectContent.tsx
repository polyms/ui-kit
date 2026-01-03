import { Select } from '@base-ui/react/select'

export const SelectContent = ({ children, ...props }: SelectContentProps) => {
  return (
    <Select.Portal>
      <Select.Positioner className='select-positioner' sideOffset={8} {...props}>
        <Select.ScrollUpArrow className='select-scroll-arrow' />
        <Select.Popup className='select-popup'>{children}</Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  )
}

type SelectContentProps = Select.Positioner.Props & {
  children: React.ReactNode
}
