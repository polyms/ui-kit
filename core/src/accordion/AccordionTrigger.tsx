import { Accordion as Base } from '@base-ui/react/accordion'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionTrigger = ({ className, ...props }: Base.Trigger.Props) => (
  <Base.Trigger {...props} className={clsx('accordion-trigger', className)} />
)

AccordionTrigger.displayName = 'AccordionTrigger'
