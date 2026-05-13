import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarLink = ({ className, ...props }: Base.Link.Props) => {
  return <Base.Link {...props} className={clsx('toolbar-link', className)} />
}
