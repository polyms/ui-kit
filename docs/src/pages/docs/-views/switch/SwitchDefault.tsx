import { Switch } from '@polyms/core'

export default function SwitchStory() {
  return (
    <div className='m-auto grid grid-cols-2 gap-6'>
      <Switch />
      <Switch defaultChecked />
      <Switch defaultChecked disabled />
      <Switch disabled />
    </div>
  )
}
