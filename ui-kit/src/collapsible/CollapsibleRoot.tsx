import { Collapsible as Base, type CollapsibleRootProps } from '@base-ui/react/collapsible'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const CollapsibleRoot = (props: CollapsibleRootProps) => (
  <Base.Root {...props} className={clsx('collapsible', props.className)} />
)
