import { Accordion as Base } from '@base-ui/react/accordion'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionHeader = ({ className, ...props }: Base.Header.Props) => (
  <Base.Header render={<div />} {...props} className={clsx('accordion-header', className)} />
)

AccordionHeader.displayName = 'AccordionHeader'
