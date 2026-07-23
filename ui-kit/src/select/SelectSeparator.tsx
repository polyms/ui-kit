import { Select } from '@base-ui/react'
import clsx from 'clsx'

export const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <Select.Separator className={clsx(className, 'select-separator')} {...props} />
)

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type SelectSeparatorProps = Select.Separator.Props
