import clsx from 'clsx'
import type { HTMLProps } from 'react'

export const FormLabel = (props: FormLabelProps) => (
  <div {...props} className={clsx(props.className, 'form-help-text')} />
)

// ======================================================================================

type FormLabelProps = HTMLProps<HTMLDivElement>
