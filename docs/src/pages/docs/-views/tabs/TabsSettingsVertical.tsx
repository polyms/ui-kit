import { Tabs } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function TabsSettingsVertical() {
  return (
    <div className='p-6'>
      <p className='mb-4 text-muted text-sm'>
        Vertical tabs stack on small screens and become a side rail from the md breakpoint.
      </p>
      <Tabs
        className='flex flex-col gap-4 md:flex-row md:gap-6'
        defaultValue='profile'
        orientation='vertical'
      >
        <Tabs.List className='w-full shrink-0 md:w-48'>
          <Tabs.Tab value='profile'>Profile</Tabs.Tab>
          <Tabs.Tab value='account'>Account</Tabs.Tab>
          <Tabs.Tab value='notifications'>Notifications</Tabs.Tab>
        </Tabs.List>
        <div className='min-w-0 flex-1'>
          <Tabs.Panel value='profile'>
            <h3 className='h3 mb-2'>Profile</h3>
            <p className='text-muted text-sm'>How others see you on this workspace.</p>
          </Tabs.Panel>
          <Tabs.Panel value='account'>
            <h3 className='h3 mb-2'>Account</h3>
            <p className='text-muted text-sm'>Password, sessions, and security preferences.</p>
          </Tabs.Panel>
          <Tabs.Panel value='notifications'>
            <h3 className='h3 mb-2'>Notifications</h3>
            <p className='text-muted text-sm'>Email and in-app alerts for billing and deploys.</p>
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  )
}
