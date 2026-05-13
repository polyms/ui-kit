import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarGroup = ({ className, ...props }: Base.Group.Props) => {
  return <Base.Group {...props} className={clsx('toolbar-group', className)} />
}
