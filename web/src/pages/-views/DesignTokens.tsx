import { Button } from '@polyms/ui-kit'
import { useLayoutEffect, useRef, useState } from 'react'
import { cssColorToHex } from '../../stores/brand-ramp'
import { useThemeStore } from '../../stores/theme.store'
import {
	type CatalogToken,
	collectDesignTokens,
	groupComponentTokens,
	readCssModule,
	typeSizePx,
	type VariantSection,
} from './design-tokens'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type DesignTokensProps = {
	level: 'component' | 'primitive' | 'semantic'
}

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const COLOR_ROLES = ['primary', 'success', 'info', 'danger', 'warning'] as const
const TYPE_VIEWPORTS = [
	{ label: 'Mobile', width: 375 },
	{ label: 'Tablet', width: 768 },
	{ label: 'Desktop', width: 1280 },
] as const
const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const SURFACES = ['--body', '--fg', '--surface', '--surface-2', '--muted', '--line', '--input'] as const
const cssModules = import.meta.glob('../../../../ui-kit/src/styles/*.css', {
	eager: true,
	import: 'default',
	query: '?raw',
})

const catalog = collectDesignTokens(
	Object.fromEntries(Object.entries(cssModules).map(([file, css]) => [file, readCssModule(css)]))
)

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

function tokenByName(tokens: CatalogToken[], name: string) {
	return tokens.find(token => token.name === name)
}

function displayValue(value: string | null | undefined) {
	if (!value || /theme\(\s*colors\./.test(value)) return null
	return value
}

function themedValue(token: CatalogToken | undefined, mode: 'dark' | 'light') {
	const use = token?.uses.find(item =>
		mode === 'dark' ? item.selector.includes('.dark') : !item.selector.includes('.dark')
	)
	return displayValue(use?.value)
}

function componentGroups(tokens: CatalogToken[]) {
	const groups = new Map<string, CatalogToken[]>()
	for (const token of tokens) {
		const list = groups.get(token.component) ?? []
		list.push(token)
		groups.set(token.component, list)
	}
	return [...groups.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([name, items]) => ({ items, name }))
}

function isSizeVariant(label: string) {
	return /^(?:2xl|3xl|xs|sm|md|lg|xl)(?:\s|$)/.test(label)
}

function formatTypePx(px: number | null) {
	if (px == null) return '—'
	return `${(Math.round(px * 10) / 10).toFixed(1)}px`
}

function headingSlug(value: string) {
	const normalized = value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
	return normalized || 'section'
}

function createHeadingSlugger() {
	const counts: Record<string, number> = {}
	return (value: string) => {
		const base = headingSlug(value)
		const count = counts[base] ?? 0
		counts[base] = count + 1
		return count === 0 ? base : `${base}-${count}`
	}
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function Swatch({ name }: { name: string }) {
	return (
		<span
			aria-hidden
			className='inline-block size-8 shrink-0 rounded-md outline -outline-offset-1 outline-black/10'
			style={{ backgroundColor: `var(${name})` }}
		/>
	)
}

function ValueCode({ value }: { value: string | null }) {
	if (!value) return null
	return <code className='font-mono text-xs break-all text-muted'>{value}</code>
}

function ColorRampSwatch({ hex, name, step }: { hex: string | null; name: string; step: number }) {
	return (
		<div className='min-w-0 text-center'>
			<div
				className='h-10 rounded-md outline -outline-offset-1 outline-black/10'
				data-color-token={name}
				style={{ backgroundColor: `var(${name})` }}
				title={name}
			/>
			<span className='text-2xs mt-1 block text-muted'>{step}</span>
			<span className='text-2xs block whitespace-nowrap text-muted'>{hex}</span>
		</div>
	)
}

function ColorRamps() {
	const rootRef = useRef<HTMLDivElement>(null)
	const [hexByToken, setHexByToken] = useState<Record<string, string>>({})

	useLayoutEffect(() => {
		const root = rootRef.current
		if (!root) return

		const read = () => {
			const next: Record<string, string> = {}
			for (const swatch of root.querySelectorAll<HTMLElement>('[data-color-token]')) {
				const token = swatch.dataset.colorToken
				if (!token) continue
				const hex = cssColorToHex(getComputedStyle(swatch).backgroundColor)
				if (hex) next[token] = hex
			}
			setHexByToken(next)
		}

		read()
		const observer = new MutationObserver(read)
		observer.observe(document.documentElement, { attributeFilter: ['class', 'style'], attributes: true })
		return () => observer.disconnect()
	}, [])

	return (
		<div className='space-y-5' ref={rootRef}>
			{COLOR_ROLES.map(role => (
				<div key={role}>
					<p className='mb-2 text-sm font-medium capitalize'>{role}</p>
					<div className='grid grid-cols-11 gap-1'>
						{COLOR_STEPS.map(step => {
							const name = `--color-${role}-${step}`
							if (!tokenByName(catalog.primitive, name)) return null
							return <ColorRampSwatch hex={hexByToken[name] ?? null} key={step} name={name} step={step} />
						})}
					</div>
				</div>
			))}
		</div>
	)
}

function Elevation() {
	const shadows = catalog.primitive.filter(token => token.name.startsWith('--shadow-'))
	return (
		<div className='grid gap-4 sm:grid-cols-2'>
			{shadows.map(token => (
				<div className='rounded-lg bg-body p-4' key={token.name} style={{ boxShadow: `var(${token.name})` }}>
					<code className='font-mono text-xs'>{token.name}</code>
					<p className='mt-2'>
						<ValueCode value={displayValue(token.uses[0]?.value)} />
					</p>
				</div>
			))}
		</div>
	)
}

function Motion() {
	const motion = catalog.primitive.filter(token => token.name.startsWith('--animate-'))
	return (
		<ul className='space-y-3'>
			{motion.map(token => (
				<li key={token.name}>
					<code className='font-mono text-xs'>{token.name}</code>
					<p className='mt-1'>
						<ValueCode value={displayValue(token.uses[0]?.value)} />
					</p>
				</li>
			))}
		</ul>
	)
}

function TypeScale() {
	return (
		<div>
			<h3 className='h3 mb-3' id={headingSlug('Headings')}>
				Headings
			</h3>
			<p className='mb-3'>
				Headings that use clamp() stay at the minimum on a small screen, grow with the viewport between the
				minimum and the maximum, and stop at the maximum on a large screen. h5 and h6 stay one size. The
				columns are a 375px phone, a 768px tablet, and a 1280px desktop.
			</p>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Step</th>
							<th>Size</th>
							{TYPE_VIEWPORTS.map(viewport => (
								<th key={viewport.width}>
									{viewport.label} {viewport.width}px
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{catalog.typeScale.map(step => (
							<tr key={step.className}>
								<td>
									<p className={step.className}>{step.className}</p>
								</td>
								<td>
									<code className='font-mono text-xs text-nowrap'>{step.fontSize}</code>
								</td>
								{TYPE_VIEWPORTS.map(viewport => (
									<td className='text-nowrap' key={viewport.width}>
										{formatTypePx(typeSizePx(step.fontSize, viewport.width))}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function PrimitiveTokens() {
	const setThemeOpen = useThemeStore(state => state.setOpen)

	return (
		<div className='space-y-8'>
			<Button onClick={() => setThemeOpen(true)} size='sm' variant='primary'>
				Theme
			</Button>
			<ColorRamps />
			<Elevation />
			<Motion />
			<TypeScale />
		</div>
	)
}

function Surfaces() {
	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>Token</th>
						<th>Light</th>
						<th>Dark</th>
					</tr>
				</thead>
				<tbody>
					{SURFACES.map(name => {
						const token = tokenByName(catalog.semantic, name)
						if (!token) return null
						return (
							<tr key={name}>
								<td>
									<span className='inline-flex items-center gap-2'>
										<Swatch name={name} />
										<code className='font-mono text-xs'>{name}</code>
									</span>
								</td>
								<td>
									<ValueCode value={themedValue(token, 'light')} />
								</td>
								<td>
									<ValueCode value={themedValue(token, 'dark')} />
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

function SurfaceAliases() {
	const aliases = SURFACES.flatMap(name => {
		const alias = name.replace(/^--/, '--color-')
		const token = tokenByName(catalog.semantic, alias)
		return token ? [token] : []
	})

	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>Token</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{aliases.map(token => (
						<tr key={token.name}>
							<td>
								<span className='inline-flex items-center gap-2'>
									<Swatch name={token.name} />
									<code className='font-mono text-xs'>{token.name}</code>
								</span>
							</td>
							<td>
								<ValueCode value={displayValue(token.uses[0]?.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function ZIndex() {
	const layers = catalog.semantic
		.filter(token => token.name.startsWith('--zindex-'))
		.sort((a, b) => Number(a.uses[0]?.value) - Number(b.uses[0]?.value))

	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>Token</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{layers.map(token => (
						<tr key={token.name}>
							<td>
								<code className='font-mono text-xs'>{token.name}</code>
							</td>
							<td>
								<ValueCode value={displayValue(token.uses[0]?.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function SemanticTokens() {
	return (
		<div className='space-y-8'>
			<Surfaces />
			<SurfaceAliases />
			<ZIndex />
		</div>
	)
}

function ClassCode({ selector }: { selector: string }) {
	if (!selector) return null
	return <code className='font-mono text-xs break-all text-muted'>{selector}</code>
}

function ComponentTable({ tokens }: { tokens: CatalogToken[] }) {
	const showClass = tokens.some(token => token.uses.some(use => use.selector))
	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th className='w-px'>Token</th>
						<th>Value</th>
						{showClass ? <th>Class</th> : null}
					</tr>
				</thead>
				<tbody>
					{tokens.map(token =>
						token.uses.map((use, index) => {
							const key = `${token.name}:${use.order}:${use.selector}:${use.value}`
							return (
								<tr key={key}>
									{index === 0 ? (
										<td className='align-top' rowSpan={token.uses.length}>
											<code className='font-mono text-xs text-nowrap'>{token.name}</code>
										</td>
									) : null}
									<td className='align-top'>
										<ValueCode value={displayValue(use.value)} />
									</td>
									{showClass ? (
										<td className='align-top'>
											<ClassCode selector={use.selector} />
										</td>
									) : null}
								</tr>
							)
						})
					)}
				</tbody>
			</table>
		</div>
	)
}

function VariantTokens({ variant }: { variant: VariantSection }) {
	const hasDark = variant.rows.some(row => row.dark)
	return (
		<div>
			<h4 className={isSizeVariant(variant.label) ? 'h4 mb-2' : 'h4 mb-2 capitalize'}>{variant.label}</h4>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th className='w-px'>Token</th>
							{hasDark ? (
								<>
									<th>Light</th>
									<th>Dark</th>
								</>
							) : (
								<th>Value</th>
							)}
						</tr>
					</thead>
					<tbody>
						{variant.rows.map(row => (
							<tr key={row.name}>
								<td>
									<code className='font-mono text-xs text-nowrap'>{row.name}</code>
								</td>
								{hasDark ? (
									<>
										<td>
											<ValueCode value={displayValue(row.light)} />
										</td>
										<td>
											<ValueCode value={displayValue(row.dark)} />
										</td>
									</>
								) : (
									<td>
										<ValueCode value={displayValue(row.light ?? row.dark)} />
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function ComponentTokens() {
	const slug = createHeadingSlugger()
	return (
		<div className='space-y-10'>
			{componentGroups(catalog.component).map(group => {
				const layout = groupComponentTokens(group.items)
				return (
					<section key={group.name}>
						<h3 className='h3 mb-3' id={slug(group.name)}>
							{group.name}
						</h3>
						{layout.variants.length ? (
							<div className='space-y-6'>
								{layout.defaults.length ? <ComponentTable tokens={layout.defaults} /> : null}
								{layout.variants.map(variant => (
									<VariantTokens key={variant.label} variant={variant} />
								))}
							</div>
						) : (
							<ComponentTable tokens={layout.defaults} />
						)}
					</section>
				)
			})}
		</div>
	)
}

export default function DesignTokens({ level }: DesignTokensProps) {
	if (level === 'primitive') return <PrimitiveTokens />
	if (level === 'semantic') return <SemanticTokens />
	return <ComponentTokens />
}
