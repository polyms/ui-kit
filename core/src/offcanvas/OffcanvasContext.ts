import { createContext, useContext } from 'react'

import type { OffcanvasContextType } from './useOffcanvas'

export const OffcanvasContext = createContext<OffcanvasContextType | null>(null)
export const OffcanvasProvider = OffcanvasContext.Provider

export const useOffcanvasContext = () => {
  const context = useContext(OffcanvasContext)

  if (context == null) {
    throw new Error('Offcanvas components must be wrapped in <Offcanvas />')
  }

  return context
}
