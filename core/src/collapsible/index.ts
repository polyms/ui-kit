import { Collapsible as Base } from '@base-ui/react/collapsible'
import { CollapsibleRoot } from './CollapsibleRoot'

export const Collapsible = Object.assign(CollapsibleRoot, {
  Panel: Base.Panel,
  Trigger: Base.Trigger,
})
