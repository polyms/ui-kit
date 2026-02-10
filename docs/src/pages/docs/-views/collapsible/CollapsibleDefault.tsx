import { Button, Collapsible } from '@polyms/core'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function CollapsibleDefault() {
  const [open, setOpen] = useState(false)

  return (
    <div className='grid grid-cols-2 gap-4 p-6'>
      {/* Uncontrolled */}
      <Collapsible className='rounded-lg border border-slate-200 dark:border-slate-700' defaultOpen>
        <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800'>
          <svg
            className='collapsible-icon h-4 w-4 transition-transform'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M9 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
          </svg>
          Uncontrolled Collapsible (Default Open)
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className='border-slate-200 border-t p-4 text-slate-600 dark:border-slate-700 dark:text-slate-400'>
            This collapsible starts open by default and manages its own state. Click the trigger to toggle
            visibility.
          </div>
        </Collapsible.Panel>
      </Collapsible>

      {/* Controlled */}
      <Collapsible
        className='rounded-lg border border-slate-200 dark:border-slate-700'
        onOpenChange={setOpen}
        open={open}
      >
        <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800'>
          <svg
            className='collapsible-icon h-4 w-4 transition-transform'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M9 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
          </svg>
          Controlled Collapsible ({open ? 'Open' : 'Closed'})
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className='border-slate-200 border-t p-4 text-slate-600 dark:border-slate-700 dark:text-slate-400'>
            This collapsible is controlled externally. The trigger shows the current state. You can also
            control it programmatically.
            <Button
              className='ms-2'
              onClick={() => setOpen(!open)}
              outlined
              rounded
              size='xs'
              type='button'
              variant='primary'
            >
              Toggle from outside
            </Button>
          </div>
        </Collapsible.Panel>
      </Collapsible>

      {/* FAQ Example */}
      <div className='col-span-2 space-y-2'>
        <h3 className='mb-2 font-semibold text-slate-900 dark:text-white'>FAQ Example</h3>
        {[
          {
            q: 'What is a Collapsible component?',
            a: 'A collapsible is a UI pattern that shows and hides content. Perfect for FAQs, details, and reducing visual clutter.',
          },
          {
            q: 'How do I customize the styling?',
            a: 'You can apply custom classes to any part of the component. The trigger can be styled like any button element.',
          },
          {
            q: 'Does it support nested collapsibles?',
            a: 'Yes! You can nest collapsibles inside other collapsible panels for hierarchical content.',
          },
        ].map(faq => (
          <Collapsible className='rounded-lg border border-slate-200 dark:border-slate-700' key={faq.q}>
            <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800'>
              <svg
                className='collapsible-icon h-4 w-4 shrink-0 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M9 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
              </svg>
              {faq.q}
            </Collapsible.Trigger>
            <Collapsible.Panel>
              <div className='border-slate-200 border-t p-4 text-slate-600 dark:border-slate-700 dark:text-slate-400'>
                {faq.a}
              </div>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
