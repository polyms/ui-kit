import React from 'react'
import { Offcanvas } from './Offcanvas'
import { useOffcanvasStore } from './offcanvas.store'

export function OffcanvasContainer() {
  const panelsMap = useOffcanvasStore(s => s.panels)
  const panels = React.useMemo(() => Array.from(panelsMap.values()), [panelsMap])

  return (
    <>
      {panels.map(({ id, open, element }) => (
        <Offcanvas
          key={id}
          onOpenChange={(newOpen, e) => {
            if (!newOpen) {
              useOffcanvasStore.getState().closeOffcanvas(id, e.reason) // Only close when actually closed
            }
          }}
          open={open}
        >
          {element}
        </Offcanvas>
      ))}
    </>
  )
}
