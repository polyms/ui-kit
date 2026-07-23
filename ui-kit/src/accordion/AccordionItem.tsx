import { Accordion as Base } from '@base-ui/react/accordion'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { AccordionHeader } from './AccordionHeader'
import { AccordionPanel } from './AccordionPanel'
import { AccordionTrigger } from './AccordionTrigger'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type AccordionItemProps = Base.Item.Props & {
  title?: ReactNode
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const AccordionItem = ({ className, children, title, ...props }: AccordionItemProps) => (
  <Base.Item {...props} className={clsx('accordion-item', className)}>
    {title ? (
      <>
        <AccordionHeader>
          <AccordionTrigger>{title}</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>{children}</AccordionPanel>
      </>
    ) : (
      children
    )}
  </Base.Item>
)

AccordionItem.displayName = 'AccordionItem'
