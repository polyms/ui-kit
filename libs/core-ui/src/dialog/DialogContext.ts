import { Dispatch, SetStateAction, createContext, useContext } from 'react'

import { useDialog } from './useDialog'

export const DialogContext = createContext<ContextType>(null)

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />')
  }

  return context
}

// ======================================================================================

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>
    })
  | null
