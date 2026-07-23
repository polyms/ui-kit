import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const TabRoot = ({ className, ...props }: BaseTabs.Root.Props) => {
  return <BaseTabs.Root {...props} className={clsx('tabs', className)} />
}
