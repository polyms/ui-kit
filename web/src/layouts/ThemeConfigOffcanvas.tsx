import { Button, Offcanvas, Select } from '@polyms/ui-kit'
import { Moon, Sun } from '@solar-icons/react-perf/BoldDuotone'
import clsx from 'clsx'
import { type CSSProperties, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore } from '../stores/app.store'
import { hexToOklchCss, normalizeHex, readCssColorAsHex } from '../stores/brand-ramp'
import {
	BRAND_ROLES,
	type BrandPalettes,
	type BrandRole,
	buildThemeSnippet,
	COLOR_STEPS,
	type ColorStep,
	hasPrimaryRamp,
	isDefaultBrand,
	PALETTES,
	type Palette,
	type PrimaryRamp,
	SEMANTIC_DEFAULTS,
	SEMANTIC_TOKENS,
	type SemanticModes,
	type SemanticToken,
	type ThemeMode,
	useThemeStore,
} from '../stores/theme.store'

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const roleLabels: Record<BrandRole, string> = {
	primary: 'Primary',
	success: 'Success',
	info: 'Info',
	danger: 'Danger',
	warning: 'Warning',
}

const semanticLabels: Record<SemanticToken, string> = {
	body: 'Body',
	fg: 'Foreground',
	surface: 'Surface',
	'surface-2': 'Surface 2',
	muted: 'Muted',
	line: 'Line',
	input: 'Input',
}

const paletteItems = PALETTES.map(palette => ({
	label: palette.charAt(0).toUpperCase() + palette.slice(1),
	value: palette,
}))

const swatchClass: Record<BrandRole, Record<ColorStep, string>> = {
	primary: {
		50: 'bg-primary-50',
		100: 'bg-primary-100',
		200: 'bg-primary-200',
		300: 'bg-primary-300',
		400: 'bg-primary-400',
		500: 'bg-primary-500',
		600: 'bg-primary-600',
		700: 'bg-primary-700',
		800: 'bg-primary-800',
		900: 'bg-primary-900',
		950: 'bg-primary-950',
	},
	success: {
		50: 'bg-success-50',
		100: 'bg-success-100',
		200: 'bg-success-200',
		300: 'bg-success-300',
		400: 'bg-success-400',
		500: 'bg-success-500',
		600: 'bg-success-600',
		700: 'bg-success-700',
		800: 'bg-success-800',
		900: 'bg-success-900',
		950: 'bg-success-950',
	},
	info: {
		50: 'bg-info-50',
		100: 'bg-info-100',
		200: 'bg-info-200',
		300: 'bg-info-300',
		400: 'bg-info-400',
		500: 'bg-info-500',
		600: 'bg-info-600',
		700: 'bg-info-700',
		800: 'bg-info-800',
		900: 'bg-info-900',
		950: 'bg-info-950',
	},
	danger: {
		50: 'bg-danger-50',
		100: 'bg-danger-100',
		200: 'bg-danger-200',
		300: 'bg-danger-300',
		400: 'bg-danger-400',
		500: 'bg-danger-500',
		600: 'bg-danger-600',
		700: 'bg-danger-700',
		800: 'bg-danger-800',
		900: 'bg-danger-900',
		950: 'bg-danger-950',
	},
	warning: {
		50: 'bg-warning-50',
		100: 'bg-warning-100',
		200: 'bg-warning-200',
		300: 'bg-warning-300',
		400: 'bg-warning-400',
		500: 'bg-warning-500',
		600: 'bg-warning-600',
		700: 'bg-warning-700',
		800: 'bg-warning-800',
		900: 'bg-warning-900',
		950: 'bg-warning-950',
	},
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function defaultSemanticHex(mode: ThemeMode, token: SemanticToken) {
	const source = SEMANTIC_DEFAULTS[mode][token]
	return normalizeHex(source) ?? readCssColorAsHex(source) ?? '#000000'
}

function SemanticColor({
	mode,
	onChange,
	token,
	value,
}: {
	mode: ThemeMode
	onChange: (mode: ThemeMode, token: SemanticToken, hex: string) => void
	token: SemanticToken
	value: string | undefined
}) {
	const applied = value ?? defaultSemanticHex(mode, token)
	const [draft, setDraft] = useState(applied)
	const label = `${semanticLabels[token]} ${mode}`

	useEffect(() => {
		setDraft(applied)
	}, [applied])

	const apply = (next: string) => {
		setDraft(next)
		const hex = normalizeHex(next)
		if (hex) onChange(mode, token, hex)
	}

	return (
		<div className='flex items-center gap-1'>
			<input
				aria-label={label}
				className='size-8 shrink-0 cursor-pointer rounded-md border border-line bg-input p-0.5'
				onChange={event => apply(event.target.value)}
				type='color'
				value={normalizeHex(draft) ?? applied}
			/>
			<input
				aria-label={`${label} hex`}
				className='h-8 w-full min-w-0 rounded-md border border-line bg-input px-2 font-mono text-xs text-fg'
				onBlur={() => setDraft(applied)}
				onChange={event => apply(event.target.value)}
				spellCheck={false}
				value={draft}
			/>
		</div>
	)
}

function SemanticFields() {
	const semantics = useThemeStore(state => state.semantics)
	const setSemantic = useThemeStore(state => state.setSemantic)

	return (
		<section className='space-y-3'>
			<p className='text-sm font-medium text-fg'>Surfaces</p>
			<div className='grid grid-cols-[5.5rem_1fr_1fr] items-center gap-x-2 gap-y-2'>
				<span />
				<span className='text-xs text-muted'>Light</span>
				<span className='text-xs text-muted'>Dark</span>
				{SEMANTIC_TOKENS.map(token => (
					<SemanticTokenRow
						dark={semantics.dark[token]}
						key={token}
						light={semantics.light[token]}
						onChange={setSemantic}
						token={token}
					/>
				))}
			</div>
		</section>
	)
}

function SemanticTokenRow({
	dark,
	light,
	onChange,
	token,
}: {
	dark: string | undefined
	light: string | undefined
	onChange: (mode: ThemeMode, token: SemanticToken, hex: string) => void
	token: SemanticToken
}) {
	return (
		<>
			<span className='font-mono text-xs text-fg'>{semanticLabels[token]}</span>
			<SemanticColor mode='light' onChange={onChange} token={token} value={light} />
			<SemanticColor mode='dark' onChange={onChange} token={token} value={dark} />
		</>
	)
}

function previewSurface(mode: ThemeMode, semantics: SemanticModes): CSSProperties {
	const style: CSSProperties & Record<`--${string}`, string> = { colorScheme: mode }
	for (const token of SEMANTIC_TOKENS) {
		style[`--${token}`] = semantics[mode][token] ?? SEMANTIC_DEFAULTS[mode][token]
	}
	return style
}

// Light badge recipe, pinned so this preview stays light while the page has .dark.
const lightPrimaryBadge: CSSProperties & Record<`--${string}`, string> = {
	'--badge-bg': 'color-mix(in oklab, var(--color-primary-700) 10%, transparent)',
	'--badge-border': 'var(--color-primary-600)',
	'--badge-color': 'var(--color-primary-600)',
}

function isPalette(value: string | null): value is Palette {
	return value !== null && (PALETTES as readonly string[]).includes(value)
}

function readPaletteHexes(palette: Palette): PrimaryRamp {
	const next: PrimaryRamp = {}
	for (const step of COLOR_STEPS) {
		next[step] = readCssColorAsHex(`var(--color-${palette}-${step})`) ?? '#000000'
	}
	return next
}

function PaletteField({ palettes, role }: { palettes: BrandPalettes; role: BrandRole }) {
	const setPalette = useThemeStore(state => state.setPalette)
	const label = roleLabels[role]

	return (
		<section className='space-y-3'>
			<div className='flex items-center justify-between gap-3'>
				<p className='text-sm font-medium text-fg'>{label}</p>
				<div className='flex items-center gap-2'>
					<span className={clsx('badge rounded-full', `badge-${role}`)}>{label}</span>
					<Button size='sm' variant={role}>
						{label}
					</Button>
				</div>
			</div>
			<Select
				items={paletteItems}
				onValueChange={value => {
					if (isPalette(value)) setPalette(role, value)
				}}
				value={palettes[role]}
			>
				<Select.Trigger className='w-full' placeholder={label}>
					{item => item?.label ?? label}
				</Select.Trigger>
				<Select.Content>
					{paletteItems.map(item => (
						<Select.Item key={item.value} value={item.value}>
							{item.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select>
			<div className='flex gap-1'>
				{COLOR_STEPS.map(step => (
					<span
						aria-hidden
						className={clsx(
							swatchClass[role][step],
							'size-5 flex-1 rounded-md outline -outline-offset-1 outline-black/10'
						)}
						key={step}
						title={`${role} ${step}`}
					/>
				))}
			</div>
		</section>
	)
}

function primaryVars(ramp: PrimaryRamp): CSSProperties & Record<`--${string}`, string> {
	const style: CSSProperties & Record<`--${string}`, string> = {}
	for (const step of COLOR_STEPS) {
		const hex = ramp[step]
		const oklch = hex ? hexToOklchCss(hex) : null
		if (oklch) style[`--color-primary-${step}`] = oklch
	}
	return style
}

function PrimaryPreview({
	mode,
	ramp,
	semantics,
}: {
	mode: ThemeMode
	ramp: PrimaryRamp
	semantics: SemanticModes
}) {
	const isDark = mode === 'dark'

	return (
		<div className='min-w-0 space-y-1'>
			<span className='text-xs text-muted'>{isDark ? 'Dark' : 'Light'}</span>
			<div
				aria-label={isDark ? 'Primary on a dark surface' : 'Primary on a light surface'}
				className={clsx('space-y-2 rounded-lg border border-line bg-body p-2', isDark && 'dark')}
				role='group'
				style={{ ...previewSurface(mode, semantics), ...primaryVars(ramp) }}
			>
				<div className='flex flex-wrap items-center gap-2'>
					<span className='badge badge-primary rounded-full' style={isDark ? undefined : lightPrimaryBadge}>
						Primary
					</span>
					<Button size='sm' tabIndex={-1} variant='primary'>
						Primary
					</Button>
					<span
						className='link link-primary text-xs'
						style={isDark ? undefined : { color: 'var(--color-primary-700)' }}
					>
						Link
					</span>
				</div>
				<div className='flex gap-0.5'>
					{COLOR_STEPS.map(step => (
						<span
							aria-hidden
							className={clsx(
								swatchClass.primary[step],
								'h-2 min-w-0 flex-1 rounded-sm outline -outline-offset-1 outline-line'
							)}
							key={step}
							title={`primary ${step}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function PrimaryStepControl({
	hex,
	label,
	onChange,
}: {
	hex: string
	label: string
	onChange: (value: string) => void
}) {
	const [draft, setDraft] = useState(hex)

	useEffect(() => {
		setDraft(hex)
	}, [hex])

	const apply = (value: string) => {
		setDraft(value)
		onChange(value)
	}

	const color = normalizeHex(draft) ?? normalizeHex(hex) ?? '#000000'

	return (
		<div className='flex min-w-0 items-center gap-1'>
			<span
				aria-hidden
				className='size-5 shrink-0 rounded-md outline -outline-offset-1 outline-black/10'
				style={{ backgroundColor: color }}
			/>
			<input
				aria-label={label}
				className='size-8 shrink-0 cursor-pointer rounded-md border border-line bg-input p-0.5'
				onChange={event => apply(event.target.value)}
				type='color'
				value={color}
			/>
			<input
				aria-label={`${label} hex`}
				className='h-8 min-w-0 flex-1 rounded-md border border-line bg-input px-2 font-mono text-xs text-fg'
				onBlur={() => setDraft(hex)}
				onChange={event => apply(event.target.value)}
				spellCheck={false}
				value={draft}
			/>
		</div>
	)
}

function PrimaryField({ palettes }: { palettes: BrandPalettes }) {
	const setPalette = useThemeStore(state => state.setPalette)
	const primaryRamp = useThemeStore(state => state.primaryRamp)
	const primaryDarkRamp = useThemeStore(state => state.primaryDarkRamp)
	const setPrimaryStep = useThemeStore(state => state.setPrimaryStep)
	const setPrimaryDarkStep = useThemeStore(state => state.setPrimaryDarkStep)
	const semantics = useThemeStore(state => state.semantics)
	const paletteHexes = useMemo(() => readPaletteHexes(palettes.primary), [palettes.primary])
	const appliedLight = useMemo(() => ({ ...paletteHexes, ...primaryRamp }), [paletteHexes, primaryRamp])
	const appliedDark = useMemo(
		() => ({ ...appliedLight, ...primaryDarkRamp }),
		[appliedLight, primaryDarkRamp]
	)
	const custom = hasPrimaryRamp(primaryRamp) || hasPrimaryRamp(primaryDarkRamp)

	const commit = (mode: ThemeMode, step: ColorStep, value: string) => {
		const hex = normalizeHex(value)
		if (!hex) return
		if (mode === 'dark') setPrimaryDarkStep(step, hex)
		else setPrimaryStep(step, hex)
	}

	return (
		<section className='space-y-3'>
			<p className='text-sm font-medium text-fg'>Primary</p>
			<div className='grid grid-cols-2 gap-2'>
				<PrimaryPreview mode='light' ramp={appliedLight} semantics={semantics} />
				<PrimaryPreview mode='dark' ramp={appliedDark} semantics={semantics} />
			</div>
			<Select
				items={paletteItems}
				onValueChange={value => {
					if (!isPalette(value)) return
					setPalette('primary', value)
				}}
				value={custom ? null : palettes.primary}
			>
				<Select.Trigger className='w-full' placeholder={custom ? 'Custom' : 'Primary'}>
					{item => item?.label ?? 'Custom'}
				</Select.Trigger>
				<Select.Content>
					{paletteItems.map(item => (
						<Select.Item key={item.value} value={item.value}>
							{item.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select>
			<div className='grid grid-cols-[2rem_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-2 gap-y-2'>
				<span />
				<span className='text-xs text-muted'>Light</span>
				<span className='text-xs text-muted'>Dark</span>
				{COLOR_STEPS.map(step => (
					<Fragment key={step}>
						<span className='font-mono text-xs text-muted'>{step}</span>
						<PrimaryStepControl
							hex={appliedLight[step] ?? '#000000'}
							label={`Primary ${step} light`}
							onChange={value => commit('light', step, value)}
						/>
						<PrimaryStepControl
							hex={appliedDark[step] ?? '#000000'}
							label={`Primary ${step} dark`}
							onChange={value => commit('dark', step, value)}
						/>
					</Fragment>
				))}
			</div>
		</section>
	)
}

export function ThemeConfigOffcanvas() {
	const open = useThemeStore(state => state.open)
	const setOpen = useThemeStore(state => state.setOpen)
	const theme = useAppStore(state => state.theme)
	const setTheme = useAppStore(state => state.setTheme)
	const palettes = useThemeStore(state => state.palettes)
	const primaryRamp = useThemeStore(state => state.primaryRamp)
	const primaryDarkRamp = useThemeStore(state => state.primaryDarkRamp)
	const semantics = useThemeStore(state => state.semantics)
	const reset = useThemeStore(state => state.reset)
	const isDark = theme === 'dark'
	const [copied, setCopied] = useState(false)
	const copiedTimer = useRef<number | null>(null)

	useEffect(() => {
		return () => {
			if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
		}
	}, [])

	const copyTheme = async () => {
		try {
			await navigator.clipboard.writeText(
				buildThemeSnippet(palettes, primaryRamp, semantics, primaryDarkRamp)
			)
			setCopied(true)
			if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
			copiedTimer.current = window.setTimeout(() => setCopied(false), 2000)
		} catch {
			setCopied(false)
		}
	}

	return (
		<Offcanvas onOpenChange={setOpen} open={open} swipeDirection='right'>
			<Offcanvas.Content closeButton size='xl'>
				<Offcanvas.Header>
					<Offcanvas.Title>Theme</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Description>
					Semantic colors update across the site. Copy the theme snippet when you want to keep a palette.
				</Offcanvas.Description>
				<Offcanvas.Body className='space-y-6'>
					<section className='flex items-center justify-between gap-3'>
						<p className='text-sm font-medium text-fg'>Appearance</p>
						<div className='flex items-center gap-2'>
							<Button
								active={!isDark}
								aria-pressed={!isDark}
								onClick={() => setTheme('light')}
								size='sm'
								variant='light'
							>
								<Sun className='size-4' />
								Light
							</Button>
							<Button
								active={isDark}
								aria-pressed={isDark}
								onClick={() => setTheme('dark')}
								size='sm'
								variant='light'
							>
								<Moon className='size-4' />
								Dark
							</Button>
						</div>
					</section>

					<SemanticFields />

					{BRAND_ROLES.map(role =>
						role === 'primary' ? (
							<PrimaryField key={role} palettes={palettes} />
						) : (
							<PaletteField key={role} palettes={palettes} role={role} />
						)
					)}

					<div className='flex items-center gap-2'>
						<Button
							disabled={isDefaultBrand(palettes, primaryRamp, semantics, primaryDarkRamp)}
							onClick={reset}
							outlined
							size='sm'
							variant='light'
						>
							Reset
						</Button>
						<Button onClick={copyTheme} size='sm' variant='primary'>
							{copied ? 'Copied' : 'Copy theme'}
						</Button>
					</div>
				</Offcanvas.Body>
			</Offcanvas.Content>
		</Offcanvas>
	)
}
