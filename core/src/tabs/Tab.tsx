import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Tab = ({ className, ...props }: BaseTabs.Tab.Props) => {
  return <BaseTabs.Tab {...props} className={clsx('tabs-tab', className)} />
}

export const TabList = ({ className, children, ...props }: BaseTabs.List.Props) => {
  return (
    <BaseTabs.List {...props} className={clsx('tabs-list', className)}>
      {children}
      <BaseTabs.Indicator className='tabs-indicator' />
    </BaseTabs.List>
  )
}
