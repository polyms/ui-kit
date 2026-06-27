import { Accordion } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function AccordionMultiple() {
  return (
    <Accordion className='m-auto max-w-lg' defaultValue={['shipping', 'returns']} multiple>
      <Accordion.Item title='Shipping' value='shipping'>
        Free shipping on orders over $50. Standard delivery 3–5 business days.
      </Accordion.Item>
      <Accordion.Item title='Billing' value='billing'>
        We accept major cards and PayPal. Invoices are emailed after checkout.
      </Accordion.Item>
      <Accordion.Item title='Returns' value='returns'>
        30-day return window. Items must be unused and in original packaging.
      </Accordion.Item>
    </Accordion>
  )
}
