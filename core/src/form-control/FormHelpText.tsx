import clsx from 'clsx'
import type { HTMLProps } from 'react'

export const FormHelpText = (props: FormHelpTextProps) => (
  <div {...props} className={clsx(props.className, 'form-help-text')} />
)

// ======================================================================================

type FormHelpTextProps = HTMLProps<HTMLDivElement>
