import { Eraser01Icon, MailAtSign02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Field } from '@polyms/core'
import { useMemo, useRef, useState } from 'react'

export default function FieldDefault() {
  const [value, setValue] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  const showError = useMemo(() => !!ref.current && value === '', [value])

  return (
    <Field className='w-1/2' invalid={showError} required>
      <Field.Label>{'Let me know your email?'}</Field.Label>
      <HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
      <HugeiconsIcon
        className='icon-end origin-top rotate-180'
        icon={Eraser01Icon}
        onClick={() => {
          setValue('')
          ref.current?.focus()
        }}
        strokeWidth={2}
      />
      <Field.Control
        onChange={e => setValue(e.target.value)}
        placeholder={'me@example.com'}
        ref={ref}
        rounded
        value={value}
      />
      <Field.Description>{"We'll never share your email with anyone else."}</Field.Description>
      <Field.Feedback>This field is required</Field.Feedback>
    </Field>
  )
}
