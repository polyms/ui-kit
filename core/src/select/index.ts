import { Select as BaseSelect } from '@base-ui/react/select'

import { SelectContent } from './SelectContent'
import { SelectItem } from './SelectItem'
import { SelectTrigger } from './SelectTrigger'

export const Select = Object.assign(BaseSelect.Root, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
})
