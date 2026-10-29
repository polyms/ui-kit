// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export type TokenLevel = 'primitive' | 'semantic' | 'component'

export type TokenUse = {
	order: number
	selector: string
	value: string
}

export type VariantRow = {
	dark: string | null
	light: string | null
	name: string
}

export type VariantSection = {
	label: string
	rows: VariantRow[]
}

export type ComponentTokenLayout = {
	defaults: CatalogToken[]
	variants: VariantSection[]
}

export type CatalogToken = {
	component: string
	level: TokenLevel
	name: string
	uses: TokenUse[]
}

export type TypeToken = {
	className: string
	fontSize: string
	letterSpacing: string | null
	lineHeight: string
	weight: string | null
}

export type DesignTokenCatalog = {
	component: CatalogToken[]
	primitive: CatalogToken[]
	semantic: CatalogToken[]
	typeScale: TypeToken[]
}

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const COLOR_ROLES = ['primary', 'success', 'info', 'danger', 'warning'] as const
const VARIANT_ORDER = ['primary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
const ALERT_PROP_ORDER = ['--alert-bg', '--alert-border', '--alert-color']

const RUNTIME_EXACT = new Set([
	'--gap',
	'--height',
	'--offset-y',
	'--peek',
	'--scale',
	'--shrink',
	'--switch-knob-x',
	'--toast-frontmost-height',
	'--toast-height',
	'--toast-index',
	'--toast-offset-y',
	'--toast-stack-direction',
	'--toast-transform-origin',
])

const COMPONENT_PREFIXES = [
	'--alert-',
	'--avatar-',
	'--badge-',
	'--btn-',
	'--check-',
	'--input-',
	'--navigation-menu-',
	'--offcanvas-',
	'--table-',
	'--toggle-',
	'--toolbar-',
]

const COMPONENT_EXACT = new Set(['--select-icon-size', '--toast-bg', '--toast-border', '--toast-color'])

const FILE_COMPONENTS: Record<string, string> = {
	'_alert.css': 'Alert',
	'_avatar.css': 'Avatar',
	'_badge.css': 'Badge',
	'_button.css': 'Button',
	'_field.css': 'Field',
	'_navigation-menu.css': 'Navigation menu',
	'_offcanvas.css': 'Offcanvas',
	'_select.css': 'Select',
	'_table.css': 'Table',
	'_toast.css': 'Toast',
	'_toggle.css': 'Toggle',
	'_toolbar.css': 'Toolbar',
}

// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

function stripComments(css: string) {
	return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

function isKeyframes(prelude: string) {
	return prelude.toLowerCase().includes('@keyframes')
}

function combineSelector(parent: string, child: string): string {
	if (!parent) return child
	if (parent.includes(',')) {
		return parent
			.split(',')
			.map(part => combineSelector(part.trim(), child))
			.join(', ')
	}
	if (child.includes(',')) {
		return child
			.split(',')
			.map(part => combineSelector(parent, part.trim()))
			.join(', ')
	}
	if (child.includes('&')) return child.replace(/&/g, parent)
	return `${parent} ${child}`
}

function joinSelector(parts: string[]) {
	const selectors = parts
		.map(part => part.trim().replace(/\s+/g, ' '))
		.filter(part => part && !part.startsWith('@'))
	return selectors.reduce((acc, part) => combineSelector(acc, part), '')
}

function isRuntime(name: string) {
	return RUNTIME_EXACT.has(name) || name.startsWith('--toast-swipe-')
}

function tokenLevel(name: string): TokenLevel | null {
	if (isRuntime(name)) return null
	if (new RegExp(`^--color-(${COLOR_ROLES.join('|')})-\\d+$`).test(name)) return 'primitive'
	if (name.startsWith('--shadow-') || name.startsWith('--animate-')) return 'primitive'
	if (new RegExp(`^--color-(${COLOR_ROLES.join('|')})$`).test(name)) return 'semantic'
	if (/^--(body|fg|surface|surface-2|muted|line|input)$/.test(name)) return 'semantic'
	if (/^--color-(body|fg|surface|surface-2|muted|line|input)$/.test(name)) return 'semantic'
	if (name.startsWith('--zindex-')) return 'semantic'
	if (/^--(control|overlay)-/.test(name)) return 'semantic'
	if (/^--(group-radius|popup-radius|popup-shadow|dialog-radius|sheet-radius)$/.test(name)) return 'semantic'
	const isComponent = COMPONENT_EXACT.has(name) || COMPONENT_PREFIXES.some(prefix => name.startsWith(prefix))
	if (isComponent) return 'component'
	return null
}

function isSelfReference(name: string, value: string) {
	return value.replace(/\s+/g, '') === `var(${name})`
}

function componentName(file: string) {
	return FILE_COMPONENTS[file] ?? file.replace(/^_/, '').replace(/\.css$/, '')
}

function parseDeclarations(css: string) {
	const src = stripComments(css)
	const frames: { kind: 'rule' | 'skip'; selector: string }[] = []
	const decls: Array<TokenUse & { name: string }> = []
	let buffer = ''
	let quote: '"' | "'" | null = null

	const pushDecl = () => {
		const decl = buffer.trim()
		buffer = ''
		if (frames.some(frame => frame.kind === 'skip')) return
		const match = decl.match(/^(--[\w-]+)\s*:\s*([\s\S]+)$/)
		if (!match?.[1] || !match[2]) return
		const name = match[1]
		const value = match[2].trim().replace(/\s+/g, ' ')
		if (isSelfReference(name, value)) return
		decls.push({
			name,
			order: decls.length,
			selector: joinSelector(frames.map(frame => frame.selector)),
			value,
		})
	}

	for (let index = 0; index < src.length; index++) {
		const char = src[index] ?? ''
		if (quote) {
			buffer += char
			if (char === '\\') {
				buffer += src[index + 1] ?? ''
				index += 1
				continue
			}
			if (char === quote) quote = null
			continue
		}
		if (char === '"' || char === "'") {
			quote = char
			buffer += char
			continue
		}
		if (char === '{') {
			const prelude = buffer.trim()
			buffer = ''
			const insideSkip = frames.some(frame => frame.kind === 'skip')
			frames.push({ kind: insideSkip || isKeyframes(prelude) ? 'skip' : 'rule', selector: prelude })
			continue
		}
		if (char === '}') {
			frames.pop()
			buffer = ''
			continue
		}
		if (char === ';') {
			pushDecl()
			continue
		}
		buffer += char
	}

	return decls
}

function prop(body: string, name: string) {
	const match = body.match(new RegExp(`${name}\\s*:\\s*([^;]+)`))
	return match?.[1]?.trim().replace(/\s+/g, ' ') ?? null
}

function parseTypeScale(css: string) {
	const src = stripComments(css)
	const steps: TypeToken[] = []
	for (const match of src.matchAll(/\.h([1-6])\s*\{([^}]*)\}/g)) {
		const body = match[2] ?? ''
		const fontSize = prop(body, 'font-size')
		const lineHeight = prop(body, 'line-height')
		if (!fontSize || !lineHeight) continue
		const weight = body.match(/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/)
		steps.push({
			className: `h${match[1]}`,
			fontSize,
			letterSpacing: prop(body, 'letter-spacing'),
			lineHeight,
			weight: weight?.[1] ?? null,
		})
	}
	return steps
}

const ROOT_FONT_PX = 16

function lengthToPx(token: string, viewportPx: number) {
	const match = /^(-?\d*\.?\d+)(rem|px|vw)$/.exec(token.trim())
	if (!match?.[1] || !match[2]) return null
	const amount = Number(match[1])
	if (match[2] === 'rem') return amount * ROOT_FONT_PX
	if (match[2] === 'px') return amount
	if (match[2] === 'vw') return (amount * viewportPx) / 100
	return null
}

function expressionToPx(expression: string, viewportPx: number) {
	let total = 0
	for (const part of expression.split('+')) {
		const px = lengthToPx(part, viewportPx)
		if (px == null) return null
		total += px
	}
	return total
}

export function typeSizePx(fontSize: string, viewportPx: number) {
	const clamp = /^clamp\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+?)\s*\)$/.exec(fontSize.trim())
	if (!clamp) return expressionToPx(fontSize, viewportPx)
	const min = expressionToPx(clamp[1] ?? '', viewportPx)
	const preferred = expressionToPx(clamp[2] ?? '', viewportPx)
	const max = expressionToPx(clamp[3] ?? '', viewportPx)
	if (min == null || preferred == null || max == null) return null
	return Math.min(Math.max(preferred, min), max)
}

function addUse(token: CatalogToken, use: TokenUse) {
	if (token.uses.some(item => item.selector === use.selector && item.value === use.value)) return
	token.uses.push(use)
}

export function collectDesignTokens(files: Record<string, string>): DesignTokenCatalog {
	const grouped = new Map<string, CatalogToken>()
	const typeScale: TypeToken[] = []

	for (const [path, css] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
		if (typeof css !== 'string' || !css) continue
		const file = path.split('/').pop() ?? path
		if (file === '_typography.css') typeScale.push(...parseTypeScale(css))

		for (const decl of parseDeclarations(css)) {
			const { name } = decl
			const level = tokenLevel(name)
			if (!level) continue
			const component = level === 'component' ? componentName(file) : ''
			const key = `${level}:${component}:${name}`
			const token = grouped.get(key) ?? { component, level, name, uses: [] }
			addUse(token, { order: decl.order, selector: decl.selector, value: decl.value })
			grouped.set(key, token)
		}
	}

	const tokens = [...grouped.values()].filter(token => token.uses.length > 0)
	return {
		component: tokens.filter(token => token.level === 'component'),
		primitive: tokens.filter(token => token.level === 'primitive'),
		semantic: tokens.filter(token => token.level === 'semantic'),
		typeScale,
	}
}

function isSchemeClass(name: string) {
	return name === 'dark' || name === 'light'
}

function hasDarkScheme(selector: string) {
	return /(^|[^\w-])\.dark(?![\w-])/.test(selector)
}

function classesIn(selector: string) {
	const source = selector.replace(/:not\(([^)]*)\)/g, '')
	return [...source.matchAll(/\.([\w-]+)/g)].map(match => match[1] ?? '').filter(Boolean)
}

function selectorParts(selector: string) {
	return selector
		.split(',')
		.map(part => part.trim())
		.filter(Boolean)
}

function collectStems(names: string[]) {
	const stems = new Set<string>()
	const prefixes = new Set<string>()
	for (const name of names) {
		const bits = name.split('-')
		for (let index = 1; index < bits.length; index++) prefixes.add(bits.slice(0, index).join('-'))
	}
	for (const prefix of prefixes) {
		if (names.filter(name => name.startsWith(`${prefix}-`)).length >= 2) stems.add(prefix)
	}
	for (const name of names) {
		if (names.some(other => other.startsWith(`${name}-`))) stems.add(name)
	}
	return [...stems]
}

function classSuffix(name: string, stems: string[]) {
	const match = stems.filter(stem => name.startsWith(`${stem}-`)).sort((a, b) => a.length - b.length)[0]
	return match ? name.slice(match.length + 1) : null
}

function propertiesByClass(tokens: CatalogToken[]) {
	const map = new Map<string, Set<string>>()
	for (const token of tokens) {
		for (const use of token.uses) {
			for (const part of selectorParts(use.selector)) {
				for (const name of classesIn(part)) {
					if (isSchemeClass(name)) continue
					const props = map.get(name) ?? new Set<string>()
					props.add(token.name)
					map.set(name, props)
				}
			}
		}
	}
	return map
}

function sharesProperty(left: Set<string>, right: Set<string>) {
	for (const name of left) {
		if (right.has(name)) return true
	}
	return false
}

function findVariantClasses(tokens: CatalogToken[]) {
	const props = propertiesByClass(tokens)
	const names = [...props.keys()]
	const stems = collectStems(names)
	const variants = new Set<string>()

	for (const name of names) {
		if (!classSuffix(name, stems)) continue
		const mine = props.get(name) ?? new Set<string>()
		const shared = names.some(other => {
			if (other === name || !classSuffix(other, stems)) return false
			return sharesProperty(mine, props.get(other) ?? new Set())
		})
		if (shared) variants.add(name)
	}

	for (const token of tokens) {
		for (const use of token.uses) {
			for (const part of selectorParts(use.selector)) {
				const partNames = classesIn(part).filter(name => !isSchemeClass(name))
				if (partNames.length < 2) continue
				for (const name of partNames) {
					if (stems.includes(name) || classSuffix(name, stems)) continue
					variants.add(name)
				}
			}
		}
	}

	return { stems, variants }
}

function variantLabel(part: string, variants: Set<string>, stems: string[]) {
	const labels = classesIn(part).flatMap(name => {
		if (!variants.has(name)) return []
		return [classSuffix(name, stems) ?? name]
	})
	return labels.length ? labels.join(' ') : null
}

function rank(order: readonly string[], value: string) {
	const index = order.indexOf(value)
	return index === -1 ? order.length : index
}

export function groupComponentTokens(tokens: CatalogToken[]): ComponentTokenLayout {
	const { stems, variants } = findVariantClasses(tokens)
	if (!variants.size) {
		return { defaults: [...tokens].sort((a, b) => a.name.localeCompare(b.name)), variants: [] }
	}

	const buckets = new Map<string, { order: number; rows: Map<string, VariantRow & { order: number }> }>()
	const defaults: CatalogToken[] = []

	for (const token of tokens) {
		const plain: TokenUse[] = []
		for (const use of token.uses) {
			const parts = selectorParts(use.selector)
			const plainParts = parts.filter(part => !variantLabel(part, variants, stems))
			if (plainParts.length) plain.push({ ...use, selector: plainParts.join(', ') })

			for (const part of parts) {
				const label = variantLabel(part, variants, stems)
				if (!label) continue
				const bucket = buckets.get(label) ?? { order: use.order, rows: new Map() }
				if (use.order < bucket.order) bucket.order = use.order
				const row = bucket.rows.get(token.name) ?? {
					dark: null,
					light: null,
					name: token.name,
					order: use.order,
				}
				if (use.order < row.order) row.order = use.order
				const side = hasDarkScheme(part) ? 'dark' : 'light'
				if (!row[side]) row[side] = use.value
				bucket.rows.set(token.name, row)
				buckets.set(label, bucket)
			}
		}
		if (plain.length) defaults.push({ ...token, uses: plain })
	}

	const sections = [...buckets.entries()].map(([label, bucket]) => ({
		label,
		order: bucket.order,
		rows: [...bucket.rows.values()].sort((a, b) => {
			const byProp = rank(ALERT_PROP_ORDER, a.name) - rank(ALERT_PROP_ORDER, b.name)
			return byProp || a.order - b.order
		}),
	}))

	sections.sort((a, b) => {
		const aKnown = VARIANT_ORDER.indexOf(a.label)
		const bKnown = VARIANT_ORDER.indexOf(b.label)
		if (aKnown !== -1 && bKnown !== -1) return aKnown - bKnown
		if (aKnown !== -1) return -1
		if (bKnown !== -1) return 1
		return a.order - b.order
	})

	return {
		defaults: defaults.sort((a, b) => a.name.localeCompare(b.name)),
		variants: sections.map(({ label, rows }) => ({
			label,
			rows: rows.map(({ dark, light, name }) => ({ dark, light, name })),
		})),
	}
}

export function readCssModule(value: unknown) {
	if (typeof value === 'string') return value
	if (value && typeof value === 'object' && 'default' in value && typeof value.default === 'string') {
		return value.default
	}
	return ''
}
