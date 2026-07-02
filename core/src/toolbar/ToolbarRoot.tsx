import { Toolbar as Base } from '@base-ui/react/toolbar'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type ToolbarVariant = 'inline'

export interface ToolbarRootProps extends Base.Root.Props {
  /**
   * - default — bordered shell with padding for standalone control clusters.
   * - `inline` — layout-only shell for filter/action bars alongside Field and Button.
   */
  variant?: ToolbarVariant
  /** Pill shell and controls — pairs with `variant='inline'` in filter bars. */
  rounded?: boolean
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const ToolbarRoot = ({ className, variant, rounded, ...props }: ToolbarRootProps) => {
  return (
    <Base.Root
      {...props}
      className={clsx('toolbar', variant && `toolbar-${variant}`, { 'rounded-full': rounded }, className)}
    />
  )
}
