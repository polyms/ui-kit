import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TabPanel = ({ className, ...props }: BaseTabs.Panel.Props) => {
  return <BaseTabs.Panel {...props} className={clsx('tabs-panel', className)} />
}
