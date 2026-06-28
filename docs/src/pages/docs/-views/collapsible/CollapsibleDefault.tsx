import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Collapsible } from '@polyms/core-ui'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function CollapsibleDefault() {
  const [open, setOpen] = useState(false)

  return (
    <div className='grid grid-cols-2 gap-4 p-6'>
      {/* Uncontrolled */}
      <Collapsible className='overflow-clip rounded-lg border border-line' defaultOpen>
        <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-surface'>
          <HugeiconsIcon className='collapsible-icon' icon={ArrowRight01Icon} size={16} />
          Uncontrolled Collapsible (Default Open)
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className='border-line border-t p-4 text-muted'>
            This collapsible starts open by default and manages its own state. Click the trigger to toggle
            visibility.
          </div>
        </Collapsible.Panel>
      </Collapsible>

      {/* Controlled */}
      <Collapsible className='overflow-clip rounded-lg border border-line' onOpenChange={setOpen} open={open}>
        <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-surface'>
          <HugeiconsIcon className='collapsible-icon' icon={ArrowRight01Icon} size={16} />
          Controlled Collapsible ({open ? 'Open' : 'Closed'})
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className='border-line border-t p-4 text-muted'>
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
        <h3 className='h3 mb-2'>FAQ Example</h3>
        {[
          {
            q: 'What is a Collapsible component?',
            a: 'A collapsible shows and hides content on demand — useful for FAQs, order details, and progressive disclosure.',
          },
          {
            q: 'How do I customize the styling?',
            a: 'Style the trigger with className or render={<Button … />}. Panel padding and borders are yours to layout.',
          },
          {
            q: 'Does it support nested collapsibles?',
            a: 'Yes. Nest Collapsible roots inside Collapsible.Panel for hierarchical content.',
          },
        ].map(faq => (
          <Collapsible className='overflow-clip rounded-lg border border-line' key={faq.q}>
            <Collapsible.Trigger className='flex w-full items-center gap-2 p-4 text-left font-medium transition-colors hover:bg-surface'>
              <HugeiconsIcon className='collapsible-icon shrink-0' icon={ArrowRight01Icon} size={16} />
              {faq.q}
            </Collapsible.Trigger>
            <Collapsible.Panel>
              <div className='border-line border-t p-4 text-muted'>{faq.a}</div>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
