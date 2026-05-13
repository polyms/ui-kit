import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarInput = ({ className, ...props }: Base.Input.Props) => {
  return <Base.Input {...props} className={clsx('toolbar-input', className)} />
}
