import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarButton = ({ className, ...props }: Base.Button.Props) => {
  return <Base.Button {...props} className={clsx('toolbar-button', className)} />
}
