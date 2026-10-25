import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { buildBrandRamp, cssColorToHex, hexToOklchCss, normalizeHex } from './brand-ramp'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const PALETTES = [
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

export const SEMANTIC_TOKENS = ['body', 'fg', 'surface', 'surface-2', 'muted', 'line', 'input'] as const

export type SemanticToken = (typeof SEMANTIC_TOKENS)[number]
export type ThemeMode = 'light' | 'dark'
export type SemanticColors = Partial<Record<SemanticToken, string>>
export type SemanticModes = Record<ThemeMode, SemanticColors>

type BrandState = {
	open: boolean
	palettes: BrandPalettes
	primaryDarkRamp: PrimaryRamp | null
	primaryRamp: PrimaryRamp | null
	semantics: SemanticModes
	setOpen: (open: boolean) => void
	setPalette: (role: BrandRole, palette: Palette) => void
	setPrimaryDarkStep: (step: ColorStep, hex: string) => void
	setPrimaryStep: (step: ColorStep, hex: string) => void
	setSemantic: (mode: ThemeMode, token: SemanticToken, hex: string) => void
	reset: () => void
}

type StoredBrand = {
	palettes?: Partial<Record<BrandRole, string>>
	primaryDarkRamp?: Partial<Record<ColorStep, unknown>>
	primaryRamp?: Partial<Record<ColorStep, unknown>>
	semantics?: {
		dark?: Partial<Record<SemanticToken, unknown>>
		light?: Partial<Record<SemanticToken, unknown>>
	}
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

export const SEMANTIC_DEFAULTS = {
	light: {
		body: '#ffffff',
		fg: 'var(--color-neutral-900)',
		surface: 'var(--color-neutral-100)',
		'surface-2': '#ffffff',
		muted: 'var(--color-neutral-500)',
		line: 'var(--color-neutral-300)',
		input: '#ffffff',
	},
	dark: {
		body: '#2e3440',
		fg: '#eceff4',
		surface: '#434c5e',
		'surface-2': '#3b4252',
		muted: '#c0c8d4',
		line: '#4c566a',
		input: '#3b4252',
	},
} as const satisfies Record<ThemeMode, Record<SemanticToken, string>>

const EMPTY_SEMANTICS: SemanticModes = { dark: {}, light: {} }
const THEME_STYLE_ID = 'polyms-docs-theme'

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

function isPalette(value: string): value is Palette {
	return (PALETTES as readonly string[]).includes(value)
}

function sanitizePalettes(value: Partial<Record<BrandRole, string>> | undefined): BrandPalettes {
	const next: BrandPalettes = { ...BRAND_DEFAULTS }
	if (!value) return next

	for (const role of BRAND_ROLES) {
		const stored = value[role] === 'slate' ? 'neutral' : value[role]
		if (typeof stored === 'string' && isPalette(stored)) next[role] = stored
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

function sanitizeSemantics(value: Partial<Record<SemanticToken, unknown>> | undefined): SemanticColors {
	const next: SemanticColors = {}
	if (!value) return next

	for (const token of SEMANTIC_TOKENS) {
		const hex = sanitizeHex(value[token])
		if (hex) next[token] = hex
	}

	return next
}

function sanitizeSemanticModes(value: StoredBrand['semantics']): SemanticModes {
	return {
		dark: sanitizeSemantics(value?.dark),
		light: sanitizeSemantics(value?.light),
	}
}

function loadBrand(): Pick<BrandState, 'palettes' | 'primaryDarkRamp' | 'primaryRamp' | 'semantics'> {
	const fallback = {
		palettes: { ...BRAND_DEFAULTS },
		primaryDarkRamp: null,
		primaryRamp: null,
		semantics: EMPTY_SEMANTICS,
	}
	if (import.meta.env.SSR || typeof localStorage === 'undefined') return fallback

	try {
		const raw = localStorage.getItem(BRAND_STORAGE_KEY)
		if (!raw) return fallback
		const parsed = JSON.parse(raw) as { state?: StoredBrand }
		return {
			palettes: sanitizePalettes(parsed.state?.palettes),
			primaryDarkRamp: sanitizePrimaryRamp(parsed.state?.primaryDarkRamp),
			primaryRamp: loadPrimaryRamp(parsed.state),
			semantics: sanitizeSemanticModes(parsed.state?.semantics),
		}
	} catch {
		return fallback
	}
}

export function hasPrimaryRamp(ramp: PrimaryRamp | null): ramp is PrimaryRamp {
	return ramp !== null && COLOR_STEPS.some(step => ramp[step] !== undefined)
}

export function applyBrandPalettes(palettes: BrandPalettes) {
	const root = document.documentElement

	for (const role of BRAND_ROLES) {
		const palette = palettes[role]
		for (const step of COLOR_STEPS) {
			const prop = `--color-${role}-${step}`
			if (role === 'primary') {
				root.style.removeProperty(prop)
				continue
			}
			if (palette === BRAND_DEFAULTS[role]) root.style.removeProperty(prop)
			else root.style.setProperty(prop, `var(--color-${palette}-${step})`)
		}
	}
}

function primaryDeclarations(palette: Palette, ramp: PrimaryRamp | null, darkOnly: boolean) {
	const lines: string[] = []
	for (const step of COLOR_STEPS) {
		const custom = ramp?.[step]
		const oklch = custom ? hexToOklchCss(custom) : null
		if (oklch) {
			lines.push(`  --color-primary-${step}: ${oklch};`)
			continue
		}
		if (!darkOnly && palette !== BRAND_DEFAULTS.primary) {
			lines.push(`  --color-primary-${step}: var(--color-${palette}-${step});`)
		}
	}
	return lines
}

function semanticDeclarations(colors: SemanticColors) {
	return SEMANTIC_TOKENS.flatMap(token => {
		const hex = colors[token]
		return hex ? [`  --${token}: ${hex};`] : []
	})
}

function ruleBlock(selector: string, lines: string[]) {
	if (lines.length === 0) return ''
	return `${selector} {\n${lines.join('\n')}\n}`
}

function semanticBlock(selector: string, colors: SemanticColors) {
	return ruleBlock(selector, semanticDeclarations(colors))
}

export function applySemanticColors(
	semantics: SemanticModes,
	palettes: BrandPalettes = BRAND_DEFAULTS,
	primaryRamp: PrimaryRamp | null = null,
	primaryDarkRamp: PrimaryRamp | null = null
) {
	const light = [
		...primaryDeclarations(palettes.primary, primaryRamp, false),
		...semanticDeclarations(semantics.light),
	]
	const dark = [
		...primaryDeclarations(palettes.primary, primaryDarkRamp, true),
		...semanticDeclarations(semantics.dark),
	]
	const css = [ruleBlock(':root', light), ruleBlock('.dark', dark)].filter(Boolean).join('\n\n')
	const current = document.getElementById(THEME_STYLE_ID)

	if (!css) {
		current?.remove()
		return
	}

	const style = current ?? document.createElement('style')
	style.id = THEME_STYLE_ID
	style.textContent = css
	if (!current) document.head.append(style)
}

export function buildThemeSnippet(
	palettes: BrandPalettes,
	primaryRamp: PrimaryRamp | null,
	semantics: SemanticModes,
	primaryDarkRamp: PrimaryRamp | null = null
) {
	const ramps = BRAND_ROLES.map(role => {
		const lines: string[] = []
		for (const step of COLOR_STEPS) {
			const custom = role === 'primary' ? primaryRamp?.[step] : undefined
			const oklch = custom ? hexToOklchCss(custom) : null
			const value = oklch ?? `theme(colors.${palettes[role]}.${step})`
			lines.push(`  --color-${role}-${step}: ${value};`)
		}
		return lines.join('\n')
	}).join('\n\n')

	const surfaces = [
		semanticBlock(':root', semantics.light),
		ruleBlock('.dark', [
			...primaryDeclarations(palettes.primary, primaryDarkRamp, true),
			...semanticDeclarations(semantics.dark),
		]),
	]
		.filter(Boolean)
		.join('\n\n')

	return surfaces ? `${ramps}\n\n${surfaces}` : ramps
}

export function isDefaultSemantics(semantics: SemanticModes) {
	return SEMANTIC_TOKENS.every(token => !semantics.light[token] && !semantics.dark[token])
}

export function isDefaultBrand(
	palettes: BrandPalettes,
	primaryRamp: PrimaryRamp | null,
	semantics: SemanticModes,
	primaryDarkRamp: PrimaryRamp | null = null
) {
	return (
		!hasPrimaryRamp(primaryRamp) &&
		!hasPrimaryRamp(primaryDarkRamp) &&
		isDefaultSemantics(semantics) &&
		BRAND_ROLES.every(role => palettes[role] === BRAND_DEFAULTS[role])
	)
}

// ── Store ──────────────────────────────────────────────────────────────────────────────────────────────────

const initialBrand = loadBrand()

export const useThemeStore = create<BrandState>()(
	persist(
		set => ({
			open: false,
			palettes: initialBrand.palettes,
			primaryDarkRamp: initialBrand.primaryDarkRamp,
			primaryRamp: initialBrand.primaryRamp,
			semantics: initialBrand.semantics,
			setOpen: open => set({ open }),
			setPalette: (role, palette) =>
				set(state => ({
					palettes: { ...state.palettes, [role]: palette },
					primaryDarkRamp: role === 'primary' ? null : state.primaryDarkRamp,
					primaryRamp: role === 'primary' ? null : state.primaryRamp,
				})),
			setPrimaryDarkStep: (step, hex) => {
				const next = normalizeHex(hex)
				if (!next) return
				set(state => ({ primaryDarkRamp: { ...state.primaryDarkRamp, [step]: next } }))
			},
			setPrimaryStep: (step, hex) => {
				const next = normalizeHex(hex)
				if (!next) return
				set(state => ({ primaryRamp: { ...state.primaryRamp, [step]: next } }))
			},
			setSemantic: (mode, token, hex) => {
				const next = normalizeHex(hex)
				if (!next) return
				set(state => ({
					semantics: { ...state.semantics, [mode]: { ...state.semantics[mode], [token]: next } },
				}))
			},
			reset: () =>
				set({
					palettes: { ...BRAND_DEFAULTS },
					primaryDarkRamp: null,
					primaryRamp: null,
					semantics: { dark: {}, light: {} },
				}),
		}),
		{
			name: BRAND_STORAGE_KEY,
			partialize: state => ({
				palettes: state.palettes,
				primaryDarkRamp: state.primaryDarkRamp,
				primaryRamp: state.primaryRamp,
				semantics: state.semantics,
			}),
			merge: (persisted, current) => {
				const stored = persisted as StoredBrand | undefined
				return {
					...current,
					palettes: sanitizePalettes(stored?.palettes),
					primaryDarkRamp: sanitizePrimaryRamp(stored?.primaryDarkRamp),
					primaryRamp: loadPrimaryRamp(stored),
					semantics: sanitizeSemanticModes(stored?.semantics),
				}
			},
		}
	)
)

function applyTheme(state: Pick<BrandState, 'palettes' | 'primaryDarkRamp' | 'primaryRamp' | 'semantics'>) {
	applyBrandPalettes(state.palettes)
	applySemanticColors(state.semantics, state.palettes, state.primaryRamp, state.primaryDarkRamp)
}

if (!import.meta.env.SSR) {
	applyTheme(useThemeStore.getState())
	useThemeStore.subscribe((state, prev) => {
		if (
			state.palettes !== prev.palettes ||
			state.primaryDarkRamp !== prev.primaryDarkRamp ||
			state.primaryRamp !== prev.primaryRamp ||
			state.semantics !== prev.semantics
		) {
			applyTheme(state)
		}
	})
}
