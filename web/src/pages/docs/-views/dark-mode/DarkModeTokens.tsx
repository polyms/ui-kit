// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Token = {
	description: string
	dark: string
	light: string
	name: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const tokens: Token[] = [
	{ name: '--body', light: '#ffffff', dark: '#2e3440', description: 'Page canvas background.' },
	{ name: '--fg', light: 'neutral-900', dark: '#eceff4', description: 'Primary foreground text.' },
	{ name: '--surface', light: 'neutral-100', dark: '#434c5e', description: 'Raised surface (card, panel).' },
	{ name: '--surface-2', light: '#ffffff', dark: '#3b4252', description: 'Elevated popup layer.' },
	{ name: '--muted', light: 'neutral-500', dark: '#c0c8d4', description: 'Secondary / caption text.' },
	{ name: '--line', light: 'neutral-300', dark: '#4c566a', description: 'Default divider color.' },
	{ name: '--input', light: '#ffffff', dark: '#3b4252', description: 'Form control background.' },
]

const lightSwatches: Record<string, string> = {
	'--body': '#ffffff',
	'--fg': 'var(--color-neutral-900)',
	'--surface': 'var(--color-neutral-100)',
	'--surface-2': '#ffffff',
	'--muted': 'var(--color-neutral-500)',
	'--line': 'var(--color-neutral-300)',
	'--input': '#ffffff',
}

export default function DarkModeTokens() {
	return (
		<div className='card'>
			<table className='table-striped table-borderless table-lg table align-middle'>
				<thead className='thead-light'>
					<tr>
						<th>Token</th>
						<th>Light</th>
						<th>Dark</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{tokens.map(token => (
						<tr key={token.name}>
							<td>
								<code className='font-mono text-xs text-fg'>{token.name}</code>
							</td>
							<td>
								<span className='inline-flex items-center gap-2 font-mono text-xs'>
									<span
										aria-hidden
										className='inline-block size-4 rounded ring-1 ring-line'
										style={{ backgroundColor: lightSwatches[token.name] }}
									/>
									{token.light}
								</span>
							</td>
							<td>
								<span className='inline-flex items-center gap-2 font-mono text-xs'>
									<span
										aria-hidden
										className='inline-block size-4 rounded ring-1 ring-line'
										style={{ backgroundColor: token.dark }}
									/>
									{token.dark}
								</span>
							</td>
							<td className='text-sm text-muted'>{token.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
