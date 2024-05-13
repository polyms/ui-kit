import * as React from 'react'

import { DialogOptions } from './Dialog.types'
import { DialogContext } from './DialogContext'
import { useDialog } from './useDialog'

export function Dialog({ children, ...options }: React.PropsWithChildren<DialogOptions>) {
  const dialog = useDialog(options)

  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
}
