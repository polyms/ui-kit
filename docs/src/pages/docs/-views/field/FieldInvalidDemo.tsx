import { Field } from '@polyms/core-ui'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FieldInvalidDemo() {
  const [value, setValue] = useState('tifa.lockhart')
  const invalid = value.length > 0 && !EMAIL_RE.test(value)

  return (
    <div className='m-auto w-full max-w-sm'>
      <Field invalid={invalid} required>
        <Field.Label>Email</Field.Label>
        <Field.Control
          onChange={e => setValue(e.target.value)}
          placeholder='tifa.lockhart@polyms.dev'
          value={value}
        />
        <Field.Feedback defaultShowOnError>Enter a valid email address</Field.Feedback>
      </Field>
    </div>
  )
}
