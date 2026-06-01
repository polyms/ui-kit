import { Radio, RadioGroup } from '@polyms/core'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function RadioDefault() {
  const [plan, setPlan] = useState('pro')

  return (
    <RadioGroup
      className='m-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
      onValueChange={setPlan}
      value={plan}
    >
      <Radio value='free'>Free</Radio>
      <Radio value='pro'>Pro</Radio>
      <Radio value='enterprise'>Enterprise</Radio>
    </RadioGroup>
  )
}
