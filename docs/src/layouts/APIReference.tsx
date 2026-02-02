import { metadataByRoute } from 'virtual:mdx-navigation'
import { Accordion } from '@base-ui/react/accordion'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function APIReference() {
  const location = useLocation()
  const routeKey = location.pathname
  const meta = metadataByRoute[routeKey] ?? metadataByRoute[routeKey.replace(/\/$/, '')] ?? {}

  const apis = meta.apis

  return (
    <div className='card'>
      <Accordion.Root className='accordion' multiple>
        <Accordion.Item className='accordion-item border-solid bg-slate-100' disabled value='_header'>
          <Accordion.Header className='accordion-header font-semibold'>
            <Accordion.Trigger className='accordion-trigger font-semibold' disabled>
              <span></span>
              <span>Prop</span>
              <span>Default</span>
              <span>Values</span>
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>

        {apis?.map(prop => (
          <Accordion.Item className='accordion-item' key={prop.name} value={prop.name}>
            <Accordion.Header className='accordion-header'>
              <Accordion.Trigger className='accordion-trigger'>
                <HugeiconsIcon className='accordion-icon' icon={PlusSignIcon} size={16} strokeWidth={2} />
                <span className='font-medium'>{prop.name}</span>
                <span
                  className={clsx('font-mono text-sm', {
                    'text-primary': prop.default !== '-',
                  })}
                >
                  {prop.default}
                </span>
                <span className='font-mono text-primary text-xs'>{prop.values}</span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className='accordion-panel'>
              <p className='p-2 ps-10 text-slate-700 text-sm'>{prop.description}</p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
