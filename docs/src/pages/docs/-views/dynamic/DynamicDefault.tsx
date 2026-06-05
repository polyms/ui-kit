import { dynamic, Spinner } from '@polyms/core'
import type { ComponentType } from 'react'
import { useState } from 'react'

const SlowPanel = dynamic(
  () =>
    new Promise<{ default: ComponentType }>(resolve => {
      setTimeout(() => {
        resolve({
          default: function SlowPanelLoaded() {
            return (
              <p className='text-muted text-sm'>
                This panel was loaded with <code>React.lazy</code> and <code>Suspense</code>.
              </p>
            )
          },
        })
      }, 1200)
    }),
  { loadingComponent: <Spinner className='text-primary-600' size={24} /> }
)

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function DynamicDefault() {
  const [show, setShow] = useState(false)

  return (
    <div className='m-auto flex max-w-md flex-col gap-4'>
      <button className='btn btn-primary rounded-full px-6' onClick={() => setShow(true)} type='button'>
        Load lazy panel
      </button>
      {show && <SlowPanel />}
    </div>
  )
}
