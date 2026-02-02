/** biome-ignore-all lint/suspicious/noArrayIndexKey: dup prop name */
import { metadataByRoute } from 'virtual:mdx-navigation'
import { Accordion } from '@base-ui/react/accordion'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'
import { useMemo } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function APIReference() {
  const activePath = useRouterState({ select: s => s.location.pathname })
  const meta = useMemo(
    () => metadataByRoute[activePath] ?? metadataByRoute[activePath.replace(/\/$/, '')] ?? {},
    [activePath]
  )

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

        {meta.apis?.map((prop, idx) => {
          // Render separator
          if (prop.separator) {
            return (
              <div
                className='m-px rounded-xs bg-primary-600 px-9 py-1 font-semibold text-white'
                key={`sep-${prop.separator}`}
              >
                {prop.separator}
              </div>
            )
          }

          // Render prop item
          return (
            <Accordion.Item className='accordion-item' key={`item-${idx}`} value={prop.name}>
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
          )
        })}
      </Accordion.Root>
    </div>
  )
}
