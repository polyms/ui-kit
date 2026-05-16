import { Accordion as Base } from '@base-ui/react/accordion'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionPanel = ({ className, ...props }: Base.Panel.Props) => (
  <Base.Panel {...props} className={clsx('accordion-panel', className)} />
)

AccordionPanel.displayName = 'AccordionPanel'
