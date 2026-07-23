import React from 'react'
import { ModalRoot } from './ModalRoot'
import { useModalStore } from './modal.store'

export function ModalContainer() {
  const modalsMap = useModalStore(s => s.modals)
  const modals = React.useMemo(() => Array.from(modalsMap.values()), [modalsMap])

  return (
    <>
      {modals.map(({ id, open, element }) => (
        <ModalRoot
          key={id}
          onOpenChange={(newOpen, e) => {
            if (!newOpen) {
              useModalStore.getState().closeModal(id, e.reason) // Only close when actually closed
            }
          }}
          open={open}
        >
          {element}
        </ModalRoot>
      ))}
    </>
  )
}
