import { Tabs } from '@polyms/core'

export default function TabsDefault() {
  return (
    <Tabs className='w-1/2' defaultValue='profile'>
      <Tabs.List>
        <Tabs.Tab value='profile'>Profile</Tabs.Tab>
        <Tabs.Tab value='account'>Account</Tabs.Tab>
        <Tabs.Tab value='notifications'>Notifications</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='profile'>
        <h3 className='mb-2 font-semibold text-lg'>Profile Settings</h3>
        <p className='text-slate-600'>Manage your public profile information and how others see you.</p>
      </Tabs.Panel>
      <Tabs.Panel value='account'>
        <h3 className='mb-2 font-semibold text-lg'>Account Settings</h3>
        <p className='text-slate-600'>Update your account preferences, password, and security options.</p>
      </Tabs.Panel>
      <Tabs.Panel value='notifications'>
        <h3 className='mb-2 font-semibold text-lg'>Notification Preferences</h3>
        <p className='text-slate-600'>Choose how and when you want to receive notifications from us.</p>
      </Tabs.Panel>
    </Tabs>
  )
}
