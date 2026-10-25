import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { buildBrandRamp, cssColorToHex, hexToOklchCss, normalizeHex } from './brand-ramp'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const PALETTES = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const

export const BRAND_ROLES = ['primary', 'success', 'info', 'danger', 'warning'] as const

export type ColorStep = (typeof COLOR_STEPS)[number]
export type Palette = (typeof PALETTES)[number]
export type BrandRole = (typeof BRAND_ROLES)[number]
export type BrandPalettes = Record<BrandRole, Palette>
export type PrimaryRamp = Partial<Record<ColorStep, string>>

type BrandState = {
  palettes: BrandPalettes
  primaryRamp: PrimaryRamp | null
  setPalette: (role: BrandRole, palette: Palette) => void
  setPrimaryStep: (step: ColorStep, hex: string) => void
  reset: () => void
}

type StoredBrand = {
  palettes?: Partial<Record<BrandRole, string>>
  primaryRamp?: Partial<Record<ColorStep, unknown>>
  customs?: Partial<Record<BrandRole, unknown>>
  primaryCustom?: unknown
}

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const BRAND_STORAGE_KEY = 'polyms-docs:brand'

export const BRAND_DEFAULTS = {
  primary: 'cyan',
  success: 'emerald',
  info: 'orange',
  danger: 'rose',
  warning: 'amber',
} as const satisfies BrandPalettes

export const BRAND_ANCHORS = {
  primary: 700,
  success: 500,
  info: 500,
  danger: 500,
  warning: 500,
} as const satisfies Record<BrandRole, ColorStep>

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

function isPalette(value: string): value is Palette {
  return (PALETTES as readonly string[]).includes(value)
}

function sanitizePalettes(value: Partial<Record<BrandRole, string>> | undefined): BrandPalettes {
  const next: BrandPalettes = { ...BRAND_DEFAULTS }
  if (!value) return next

  for (const role of BRAND_ROLES) {
    const palette = value[role]
    if (typeof palette === 'string' && isPalette(palette)) next[role] = palette
  }

  return next
}

function sanitizeHex(value: unknown) {
  return typeof value === 'string' ? normalizeHex(value) : null
}

function sanitizePrimaryRamp(value: unknown): PrimaryRamp | null {
  if (!value || typeof value !== 'object') return null
  const record = value as Partial<Record<ColorStep, unknown>>
  const next: PrimaryRamp = {}
  for (const step of COLOR_STEPS) {
    const hex = sanitizeHex(record[step])
    if (hex) next[step] = hex
  }
  return hasPrimaryRamp(next) ? next : null
}

function rampFromSeed(hex: string): PrimaryRamp | null {
  const generated = buildBrandRamp(hex, BRAND_ANCHORS.primary)
  if (!generated) return null
  const next: PrimaryRamp = {}
  for (const step of COLOR_STEPS) {
    const asHex = cssColorToHex(generated[step])
    if (asHex) next[step] = asHex
  }
  return hasPrimaryRamp(next) ? next : null
}

function loadPrimaryRamp(stored: StoredBrand | undefined) {
  return (
    sanitizePrimaryRamp(stored?.primaryRamp) ??
    rampFromSeed(sanitizeHex(stored?.customs?.primary) ?? sanitizeHex(stored?.primaryCustom) ?? '')
  )
}

function loadBrand(): Pick<BrandState, 'palettes' | 'primaryRamp'> {
  const fallback = { palettes: { ...BRAND_DEFAULTS }, primaryRamp: null }
  if (import.meta.env.SSR || typeof localStorage === 'undefined') return fallback

  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as { state?: StoredBrand }
    return {
      palettes: sanitizePalettes(parsed.state?.palettes),
      primaryRamp: loadPrimaryRamp(parsed.state),
    }
  } catch {
    return fallback
  }
}

export function hasPrimaryRamp(ramp: PrimaryRamp | null): ramp is PrimaryRamp {
  return ramp !== null && COLOR_STEPS.some(step => ramp[step] !== undefined)
}

export function applyBrandPalettes(palettes: BrandPalettes, primaryRamp: PrimaryRamp | null) {
  const root = document.documentElement

  for (const role of BRAND_ROLES) {
    const palette = palettes[role]
    for (const step of COLOR_STEPS) {
      const prop = `--color-${role}-${step}`
      const custom = role === 'primary' ? primaryRamp?.[step] : undefined
      const oklch = custom ? hexToOklchCss(custom) : null
      if (oklch) root.style.setProperty(prop, oklch)
      else if (palette === BRAND_DEFAULTS[role]) root.style.removeProperty(prop)
      else root.style.setProperty(prop, `var(--color-${palette}-${step})`)
    }
  }
}

export function buildThemeSnippet(palettes: BrandPalettes, primaryRamp: PrimaryRamp | null) {
  return BRAND_ROLES.map(role => {
    const lines: string[] = []
    for (const step of COLOR_STEPS) {
      const custom = role === 'primary' ? primaryRamp?.[step] : undefined
      const oklch = custom ? hexToOklchCss(custom) : null
      const value = oklch ?? `theme(colors.${palettes[role]}.${step})`
      lines.push(`  --color-${role}-${step}: ${value};`)
    }
    return lines.join('\n')
  }).join('\n\n')
}

export function isDefaultBrand(palettes: BrandPalettes, primaryRamp: PrimaryRamp | null) {
  return (
    !hasPrimaryRamp(primaryRamp) && BRAND_ROLES.every(role => palettes[role] === BRAND_DEFAULTS[role])
  )
}

// ── Store ──────────────────────────────────────────────────────────────────────────────────────────────────

const initialBrand = loadBrand()

export const useBrandStore = create<BrandState>()(
  persist(
    set => ({
      palettes: initialBrand.palettes,
      primaryRamp: initialBrand.primaryRamp,
      setPalette: (role, palette) =>
        set(state => ({
          palettes: { ...state.palettes, [role]: palette },
          primaryRamp: role === 'primary' ? null : state.primaryRamp,
        })),
      setPrimaryStep: (step, hex) => {
        const next = normalizeHex(hex)
        if (!next) return
        set(state => ({ primaryRamp: { ...state.primaryRamp, [step]: next } }))
      },
      reset: () => set({ palettes: { ...BRAND_DEFAULTS }, primaryRamp: null }),
    }),
    {
      name: BRAND_STORAGE_KEY,
      partialize: state => ({ palettes: state.palettes, primaryRamp: state.primaryRamp }),
      merge: (persisted, current) => {
        const stored = persisted as StoredBrand | undefined
        return {
          ...current,
          palettes: sanitizePalettes(stored?.palettes),
          primaryRamp: loadPrimaryRamp(stored),
        }
      },
    }
  )
)

if (!import.meta.env.SSR) {
  applyBrandPalettes(useBrandStore.getState().palettes, useBrandStore.getState().primaryRamp)
  useBrandStore.subscribe((state, prev) => {
    if (state.palettes !== prev.palettes || state.primaryRamp !== prev.primaryRamp) {
      applyBrandPalettes(state.palettes, state.primaryRamp)
    }
  })
}
