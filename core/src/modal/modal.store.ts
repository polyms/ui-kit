import type { Dialog } from '@base-ui/react/dialog'
import { create } from 'zustand'

export const useModalStore = create<ModalState>((set, get) => ({
  modals: new Map(),

  showModal: (id, element, options = {}) => {
    const modals = new Map(get().modals)

    // Step 1: Thêm modal với open: false
    modals.set(id, { id, open: false, element, onClose: options.onClose })
    set({ modals })

    // Step 2: Delay mở để animation hoạt động
    requestAnimationFrame(() => {
      const modals = new Map(get().modals)
      const existing = modals.get(id)
      if (!existing) return

      modals.set(id, { ...existing, open: true })
      set({ modals })
    })
  },

  closeModal: (id, reason) => {
    const modals = new Map(get().modals)
    const item = modals.get(id)
    if (!item) return

    // Step 1: set open = false for animation
    modals.set(id, { ...item, open: false, reason })
    set({ modals })
    item.onClose?.(reason)

    // Step 2: remove after 300ms
    setTimeout(() => {
      const latestModals = new Map(get().modals)
      latestModals.delete(id)
      set({ modals: latestModals })
    }, 300)
  },
}))

// ======================================================================================

export interface ModalItem {
  id: string
  element: React.ReactNode
  open: boolean
  onClose?: CloseFunc
  reason?: string
}

interface ModalState {
  modals: Map<string, ModalItem>
  showModal: (id: string, element: React.ReactNode, options?: { onClose?: CloseFunc }) => void
  closeModal: (id: string, reason?: Dialog.Root.ChangeEventReason) => void
}

type CloseFunc = (reason?: Dialog.Root.ChangeEventReason) => void
