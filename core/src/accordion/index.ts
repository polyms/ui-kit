import type { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { AccordionHeader } from './AccordionHeader'
import type { AccordionItemProps } from './AccordionItem'
import { AccordionItem } from './AccordionItem'
import { AccordionPanel } from './AccordionPanel'
import { AccordionRoot } from './AccordionRoot'
import { AccordionTrigger } from './AccordionTrigger'

export type AccordionRootProps = BaseAccordion.Root.Props
export type AccordionHeaderProps = BaseAccordion.Header.Props
export type AccordionTriggerProps = BaseAccordion.Trigger.Props
export type AccordionPanelProps = BaseAccordion.Panel.Props

export type { AccordionItemProps }

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
})

export declare namespace Accordion {
  type Props = AccordionRootProps

  namespace Item {
    type Props = AccordionItemProps
  }

  namespace Header {
    type Props = AccordionHeaderProps
  }

  namespace Trigger {
    type Props = AccordionTriggerProps
  }

  namespace Panel {
    type Props = AccordionPanelProps
  }
}
