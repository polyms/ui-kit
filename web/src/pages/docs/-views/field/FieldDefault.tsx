import { Eraser, Letter } from '@polyms/icons/bold-duotone'
import { Field } from '@polyms/ui-kit'
import { useMemo, useRef, useState } from 'react'

export default function FieldDefault() {
  const [value, setValue] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  const showError = useMemo(() => !!ref.current && value === '', [value])

  return (
    <Field className='m-auto w-1/2' invalid={showError} required>
      <Field.Label>Let me know your email?</Field.Label>
      <Letter className='icon-start' />
      <Eraser
        className='icon-end origin-top rotate-180'
        onClick={() => {
          setValue('')
          ref.current?.focus()
        }}
      />
      <Field.Control
        onChange={e => setValue(e.target.value)}
        placeholder='tifa.lockhart@polyms.dev'
        ref={ref}
        rounded
        value={value}
      />
      <Field.Description>We'll never share your email with anyone else.</Field.Description>
      <Field.Feedback>This field is required</Field.Feedback>
    </Field>
  )
}
