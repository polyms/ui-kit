import { create } from 'zustand'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type IconDefaults = {
  color: string
  secondaryColor: string
  secondaryOpacity: number
  size: number | string
  strokeWidth: number | string
}

type IconStoreState = {
  defaults: IconDefaults
  setIconDefaults: (defaults: Partial<IconDefaults>) => void
}

// ── Store ──────────────────────────────────────────────────────────────────────────────────────────────────

const defaultIconDefaults: IconDefaults = {
  color: 'currentColor',
  secondaryColor: 'currentColor',
  secondaryOpacity: 0.3,
  size: 24,
  strokeWidth: 1.5,
}

/** Global icon defaults — Zustand, not React Context. Icons read this when a prop is omitted. */
export const useIconStore = create<IconStoreState>(set => ({
  defaults: { ...defaultIconDefaults },
  setIconDefaults: partial => set(state => ({ defaults: { ...state.defaults, ...partial } })),
}))

/** Non-hook ergonomic setter — equivalent to `useIconStore.getState().setIconDefaults(...)`. */
export function setIconDefaults(defaults: Partial<IconDefaults>) {
  useIconStore.getState().setIconDefaults(defaults)
}

/** Reset store to package defaults (tests / app teardown). */
export function resetIconDefaults() {
  useIconStore.setState({ defaults: { ...defaultIconDefaults } })
}
