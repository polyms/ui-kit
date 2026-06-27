import { Accordion as Base } from '@base-ui/react/accordion'
import clsx from 'clsx'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionPanel = ({ className, children, ...props }: Base.Panel.Props) => (
  <Base.Panel {...props} className={clsx('accordion-panel', className)}>
    <div className='accordion-panel-body'>{children}</div>
  </Base.Panel>
)

AccordionPanel.displayName = 'AccordionPanel'
