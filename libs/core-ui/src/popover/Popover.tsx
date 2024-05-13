import { ReactNode } from 'react'

import { PopoverOptions } from './Popover.types'
import { PopoverContext } from './PopoverContext'
import { usePopover } from './usePopover'

export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode
} & PopoverOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions })

  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}
