import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionRoot = ({ className, ...props }: BaseAccordion.Root.Props) => {
  return <BaseAccordion.Root {...props} className={clsx('accordion', className)} />
}
