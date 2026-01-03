import type { PropsWithChildren } from 'react'

import { OffcanvasProvider } from './OffcanvasContext'
import { type OffcanvasOptions, useOffcanvas } from './useOffcanvas'

export function Offcanvas({ children, ...options }: PropsWithChildren<OffcanvasOptions>) {
  const offcanvas = useOffcanvas(options)

  return <OffcanvasProvider value={offcanvas}>{children}</OffcanvasProvider>
}

// ======================================================================================
