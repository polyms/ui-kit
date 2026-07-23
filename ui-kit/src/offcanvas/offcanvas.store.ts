import type { Drawer } from '@base-ui/react/drawer'
import type { ReactNode } from 'react'
import { create } from 'zustand'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface OffcanvasPanel {
  id: string
  element: ReactNode
  open: boolean
  onClose?: CloseFunc
  reason?: string
}

interface OffcanvasState {
  panels: Map<string, OffcanvasPanel>
  showOffcanvas: (id: string, element: ReactNode, options?: { onClose?: CloseFunc }) => void
  closeOffcanvas: (id: string, reason?: Drawer.Root.ChangeEventReason) => void
}

type CloseFunc = (reason?: Drawer.Root.ChangeEventReason) => void

const EXIT_ANIMATION_MS = 300

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const useOffcanvasStore = create<OffcanvasState>((set, get) => ({
  panels: new Map(),

  showOffcanvas: (id, element, options = {}) => {
    const panels = new Map(get().panels)

    // Step 1: Thêm panel với open: false
    panels.set(id, { id, open: false, element, onClose: options.onClose })
    set({ panels })

    // Step 2: Toggle open ở frame kế tiếp để Drawer chạy enter animation (false → true).
    requestAnimationFrame(() => {
      const panels = new Map(get().panels)
      const existing = panels.get(id)
      if (!existing) return

      panels.set(id, { ...existing, open: true })
      set({ panels })
    })
  },

  closeOffcanvas: (id, reason) => {
    const panels = new Map(get().panels)
    const panel = panels.get(id)
    if (!panel) return

    // Step 1: set open = false for exit animation
    panels.set(id, { ...panel, open: false, reason })
    set({ panels })
    panel.onClose?.(reason)

    // Step 2: unmount sau khi exit animation hoàn tất.
    setTimeout(() => {
      const latestPanels = new Map(get().panels)
      latestPanels.delete(id)
      set({ panels: latestPanels })
    }, EXIT_ANIMATION_MS)
  },
}))
