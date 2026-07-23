import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark'

type AppState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// ── Store ──────────────────────────────────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      theme: 'light',
      setTheme: theme => set({ theme }),
      toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'polyms-docs:app',
      partialize: state => ({ theme: state.theme }),
    }
  )
)

if (!import.meta.env.SSR) {
  const applyTheme = (theme: Theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  applyTheme(useAppStore.getState().theme)
  useAppStore.subscribe((state, prev) => {
    if (state.theme !== prev.theme) applyTheme(state.theme)
  })
}
