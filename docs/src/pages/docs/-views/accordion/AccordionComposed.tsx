import { Accordion } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function AccordionComposed() {
  return (
    <Accordion className='m-auto max-w-lg' defaultValue={['notifications']}>
      <Accordion.Item value='notifications'>
        <Accordion.Header>
          <Accordion.Trigger>How will you notify me?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          We email billing and security updates to tifa.lockhart@polyms.dev. Add more recipients in
          workspace settings.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='access'>
        <Accordion.Header>
          <Accordion.Trigger>Who can change billing?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          Only workspace owners and billing admins. Tifa Lockhart has owner access on this workspace.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
