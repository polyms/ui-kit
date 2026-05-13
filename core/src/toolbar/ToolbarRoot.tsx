import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarRoot = ({ className, ...props }: Base.Root.Props) => {
  return <Base.Root {...props} className={clsx('toolbar', className)} />
}
