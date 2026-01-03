import clsx from 'clsx'
import type { HTMLProps } from 'react'

export const FieldHelpText = (props: FieldHelpTextProps) => (
  <div {...props} className={clsx(props.className, 'field-help-text')} />
)

// ======================================================================================

type FieldHelpTextProps = HTMLProps<HTMLDivElement>
