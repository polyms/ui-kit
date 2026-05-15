import { Field } from '@polyms/core'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function FieldStates() {
  return (
    <div className='m-auto grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2'>
      <Field>
        <Field.Label>Disabled</Field.Label>
        <Field.Control disabled placeholder='Cannot edit' value='me@example.com' />
        <Field.Description>Blocks interaction; muted border and reduced opacity.</Field.Description>
      </Field>
      <Field>
        <Field.Label>Read-only</Field.Label>
        <Field.Control readOnly value='me@example.com' />
        <Field.Description>Value stays readable; no hover border or focus ring.</Field.Description>
      </Field>
    </div>
  )
}
