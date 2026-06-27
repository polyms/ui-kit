import { Radio, RadioGroup, type RadioVariant } from '@polyms/core-ui'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants: RadioVariant[] = ['primary', 'success', 'info', 'warning', 'danger', 'dark']

export default function RadioVariants() {
  const [value, setValue] = useState('primary')

  return (
    <RadioGroup onValueChange={setValue} orientation='horizontal' value={value}>
      {variants.map(variant => (
        <Radio key={variant} value={variant} variant={variant}>
          {variant}
        </Radio>
      ))}
    </RadioGroup>
  )
}
