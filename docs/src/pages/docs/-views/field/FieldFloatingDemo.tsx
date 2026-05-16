import { Field } from '@polyms/core'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function FieldFloatingDemo() {
  const [query, setQuery] = useState('')

  return (
    <div className='m-auto w-full max-w-sm'>
      <Field.Floating
        debounce={400}
        label='Search'
        onChange={e => setQuery(e.target.value)}
        placeholder='Type to search (debounced)'
      />
      <p className='mt-2 text-slate-500 text-xs'>Debounced value: {query || '—'}</p>
    </div>
  )
}
