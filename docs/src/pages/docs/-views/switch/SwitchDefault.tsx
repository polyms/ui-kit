import { Switch } from '@polyms/core'

export default function SwitchStory() {
  return (
    <div className='flex gap-4'>
      <Switch />
      <Switch defaultChecked />
      <Switch defaultChecked disabled />
      <Switch disabled />
    </div>
  )
}
