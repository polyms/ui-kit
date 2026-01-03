import { Select } from '@polyms/core'

export default function SelectDefault() {
  return (
    <Select>
      <Select.Trigger placeholder='Select' />
      <Select.Content>
        <Select.Item value='sans'>Sans-serif</Select.Item>
        <Select.Item value='serif'>Serif</Select.Item>
        <Select.Item value='mono'>Mono</Select.Item>
      </Select.Content>
    </Select>
  )
}
