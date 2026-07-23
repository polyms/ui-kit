import { Select } from '@base-ui/react'
import clsx from 'clsx'

export const SelectGroup = ({ className, ...props }: SelectGroupProps) => (
  <Select.Group className={clsx(className, 'select-group')} {...props} />
)

export const SelectGroupLabel = ({ className, ...props }: SelectGroupLabelProps) => (
  <Select.GroupLabel className={clsx(className, 'select-group-label')} {...props} />
)

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type SelectGroupProps = Select.Group.Props

export type SelectGroupLabelProps = Select.GroupLabel.Props
