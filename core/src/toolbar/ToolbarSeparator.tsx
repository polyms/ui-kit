import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarSeparator = ({ className, ...props }: Base.Separator.Props) => {
  return <Base.Separator {...props} className={clsx('toolbar-separator', className)} />
}
