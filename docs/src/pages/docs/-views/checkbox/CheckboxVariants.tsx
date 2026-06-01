import { Checkbox, type CheckboxVariant } from '@polyms/core'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants: CheckboxVariant[] = ['primary', 'success', 'info', 'warning', 'danger', 'dark']

export default function CheckboxVariants() {
  return (
    <div className='m-auto flex flex-wrap items-center gap-x-6 gap-y-3'>
      {variants.map(variant => (
        <Checkbox defaultChecked key={variant} variant={variant}>
          {variant}
        </Checkbox>
      ))}
    </div>
  )
}
