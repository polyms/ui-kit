import { Select as BaseSelect } from '@base-ui/react/select'

import { SelectContent } from './SelectContent'
import { SelectGroup, SelectGroupLabel } from './SelectGroup'
import { SelectItem } from './SelectItem'
import { SelectSeparator } from './SelectSeparator'
import { SelectTrigger } from './SelectTrigger'

export const Select = Object.assign(BaseSelect.Root, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Separator: SelectSeparator,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
})
