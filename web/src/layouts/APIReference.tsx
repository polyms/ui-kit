/** biome-ignore-all lint/suspicious/noArrayIndexKey: dup prop name */
import { metadataByRoute } from 'virtual:mdx-navigation'
import { AddCircle } from '@polyms/icons/bold-duotone'
import { Accordion } from '@polyms/ui-kit'
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
    <div className='api-reference card mt-4'>
      <Accordion multiple>
        <Accordion.Item className='border-solid bg-surface' disabled value='_header'>
          <Accordion.Header className='font-semibold' render={<div />}>
            <Accordion.Trigger className='font-semibold' disabled>
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
            <Accordion.Item key={`item-${idx}`} value={prop.name}>
              <Accordion.Header render={<div />}>
                <Accordion.Trigger>
                  <AddCircle className='accordion-icon' size={20} />
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
                <p className='text-fg text-sm'>{prop.description}</p>
              </Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </div>
  )
}
