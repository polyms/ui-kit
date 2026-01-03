import clsx from 'clsx'
import type { HTMLProps } from 'react'

export const FieldLabel = (props: FieldLabelProps) => (
  <div {...props} className={clsx(props.className, 'field-label')} />
)

// ======================================================================================

type FieldLabelProps = HTMLProps<HTMLDivElement>
