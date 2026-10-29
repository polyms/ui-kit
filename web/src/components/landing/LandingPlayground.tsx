import { ArrowRight01Icon, CheckmarkCircle02Icon, Layers01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Modal, Offcanvas, Switch, Tabs } from '@polyms/ui-kit'
import type { CSSProperties } from 'react'
import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Palette = 'cyan' | 'violet' | 'orange'

type ColorStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const COLOR_STEPS: ColorStep[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/** Landing brand ramp. Keep in sync with `html:has(#root.landing)` in home.page.css. */
const BRAND_ORANGE: Record<ColorStep, string> = {
	50: 'oklch(97% 0.015 60)',
	100: 'oklch(94% 0.05 58)',
	200: 'oklch(89% 0.08 55)',
	300: 'oklch(86% 0.1 55)',
	400: 'oklch(78% 0.15 50)',
	500: 'oklch(75% 0.19 48)',
	600: 'oklch(68% 0.18 45)',
	700: 'oklch(58% 0.17 40)',
	800: 'oklch(48% 0.15 35)',
	900: 'oklch(40% 0.13 32)',
	950: 'oklch(26% 0.09 30)',
}

const PALETTES: { value: Palette; label: string }[] = [
	{ value: 'orange', label: 'Orange' },
	{ value: 'cyan', label: 'Cyan' },
	{ value: 'violet', label: 'Violet' },
]

export function LandingPlayground() {
	const [palette, setPalette] = useState<Palette>('orange')
	const [dark, setDark] = useState(false)
	const [resetCount, setResetCount] = useState(0)
	const paletteLabel = PALETTES.find(item => item.value === palette)?.label
	const appearance = dark ? 'Dark' : 'Light'
	const theme: CSSProperties = Object.fromEntries(
		COLOR_STEPS.map(step => [
			`--color-primary-${step}`,
			palette === 'orange' ? BRAND_ORANGE[step] : `var(--color-${palette}-${step})`,
		])
	)
	const previewProps = {
		className: dark ? 'home-preview-theme dark' : 'home-preview-theme',
		'data-mode': dark ? 'dark' : 'light',
		'data-palette': palette,
		style: theme,
	}

	return (
		<div className='home-playground'>
			<div className='home-playground-tools'>
				<div>
					<span className='home-label'>01 / YOUR PALETTE</span>
					<fieldset aria-label='Preview color' className='home-swatches'>
						{PALETTES.map(item => (
							<Button
								aria-pressed={palette === item.value}
								className='home-swatch'
								key={item.value}
								onClick={() => {
									if (palette === item.value) return
									setPalette(item.value)
								}}
								rounded
								size='lg'
							>
								<span
									aria-hidden='true'
									style={{
										background:
											item.value === 'orange' ? BRAND_ORANGE[600] : `var(--color-${item.value}-600)`,
									}}
								/>
								{item.label}
							</Button>
						))}
					</fieldset>
				</div>
				<div className='home-mode-control'>
					<span className='home-label'>02 / THE ATMOSPHERE</span>
					<Switch checked={dark} label='Dark preview' onChange={event => setDark(event.target.checked)} />
				</div>
				<Button
					onClick={() => {
						setPalette('orange')
						setDark(false)
						setResetCount(value => value + 1)
					}}
					rounded
					size='lg'
				>
					Reset demo
				</Button>
			</div>
			<div {...previewProps} data-testid='landing-preview'>
				<div className='home-preview-workspace'>
					<div className='home-preview-aside'>
						<span className='home-label'>A LITTLE ROOM TO EXPERIMENT</span>
						<h3>
							Your next
							<br />
							good idea.
						</h3>
						<p>
							Same components.
							<br />A different personality.
						</p>
						<div aria-hidden='true' className='home-palette-fan'>
							{[200, 400, 600, 800].map(step => (
								<span key={step} style={{ background: `var(--color-primary-${step})` }} />
							))}
						</div>
					</div>
					<ProjectPreview key={resetCount} />
				</div>
				<div className='home-preview-bottom'>
					<span>
						<span className='home-live-dot' /> Live components. Go ahead, click around.
					</span>
					<div className='home-overlay-actions'>
						<Modal>
							<Modal.Trigger render={<Button outlined rounded size='lg' variant='primary' />}>
								Try a dialog <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
							</Modal.Trigger>
							<Modal.Content {...previewProps} data-testid='playground-dialog' size='sm'>
								<Modal.Header>A little focus goes a long way.</Modal.Header>
								<Modal.Body>
									<div className='home-overlay-summary'>
										<span className='home-overlay-icon'>
											<HugeiconsIcon icon={Layers01Icon} size={24} />
										</span>
										<span>
											{paletteLabel} palette
											<span className='home-overlay-muted'>{appearance} workspace</span>
										</span>
									</div>
									<p>
										Tab through this dialog. Focus stays here until you close it, then returns to the button.
									</p>
									<p className='mt-3 text-muted'>Press Escape whenever you’re ready.</p>
								</Modal.Body>
								<Modal.Footer>
									<Modal.Close render={<Button rounded size='lg' />}>Back to playing</Modal.Close>
									<Modal.Close render={<Button rounded size='lg' variant='primary' />}>
										Looks good
									</Modal.Close>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Offcanvas>
							<Offcanvas.Trigger render={<Button outlined rounded size='lg' variant='primary' />}>
								Try an offcanvas <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
							</Offcanvas.Trigger>
							<Offcanvas.Content {...previewProps} data-testid='playground-offcanvas' size='md'>
								<Offcanvas.Header>
									<Offcanvas.Title>A little space for the details.</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Description>
									Your workspace palette comes along for the ride.
								</Offcanvas.Description>
								<Offcanvas.Body>
									<div className='home-overlay-summary'>
										<span className='home-overlay-icon'>
											<HugeiconsIcon icon={Layers01Icon} size={24} />
										</span>
										<span>
											Website refresh
											<span className='home-overlay-muted'>A fresh start, in your colors.</span>
										</span>
									</div>
									<dl className='home-overlay-details'>
										<div>
											<dt>Palette</dt>
											<dd>{paletteLabel}</dd>
										</div>
										<div>
											<dt>Appearance</dt>
											<dd>{appearance}</dd>
										</div>
										<div>
											<dt>Built with</dt>
											<dd>Polyms UI Kit</dd>
										</div>
									</dl>
									<Offcanvas.Close
										render={<Button className='mt-6 w-full' rounded size='lg' variant='primary' />}
									>
										Back to the workspace
									</Offcanvas.Close>
								</Offcanvas.Body>
							</Offcanvas.Content>
						</Offcanvas>
					</div>
				</div>
			</div>
		</div>
	)
}

function ProjectPreview() {
	const [complete, setComplete] = useState(false)
	const [digest, setDigest] = useState(true)
	return (
		<div className='home-project' data-complete={complete}>
			<div className='home-project-heading'>
				<span className='home-project-icon'>
					<HugeiconsIcon icon={Layers01Icon} size={23} />
				</span>
				<div>
					<strong>Studio workspace</strong>
					<span>Your ideas, coming together.</span>
				</div>
				<span aria-label='Sample member Tifa' className='home-avatar' role='img'>
					T
				</span>
			</div>
			<Tabs defaultValue='project'>
				<Tabs.List aria-label='Workspace preview'>
					<Tabs.Tab value='project'>Project</Tabs.Tab>
					<Tabs.Tab value='preferences'>Preferences</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value='project'>
					<div className='home-project-body'>
						<div className='home-project-meta'>
							<span>Website refresh</span>
							<span className='badge badge-primary rounded-full'>
								{complete ? 'Complete' : 'In progress'}
							</span>
						</div>
						<h3>A fresh start.</h3>
						<p>A thoughtful interface, one little detail at a time.</p>
						<div className='home-task-row'>
							<HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} /> Find your starting point
						</div>
						<div className='home-task-row'>
							<HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} /> Add a little personality
						</div>
						<div className='home-task-row'>
							<span aria-hidden='true' className={complete ? 'home-task-check is-done' : 'home-task-check'} />{' '}
							Make something yours
						</div>
						<Button
							className='w-full'
							disabled={complete}
							onClick={() => setComplete(true)}
							rounded
							size='lg'
							variant='primary'
						>
							{complete ? 'Step completed' : 'Finish this step'}{' '}
							<HugeiconsIcon icon={complete ? CheckmarkCircle02Icon : ArrowRight01Icon} size={17} />
						</Button>
						<p aria-live='polite' className='home-project-status' role='status'>
							{complete ? 'Step complete. Looking good!' : 'A small demo. A real interaction.'}
						</p>
					</div>
				</Tabs.Panel>
				<Tabs.Panel value='preferences'>
					<div className='home-project-body home-preferences'>
						<h3>A quieter workspace.</h3>
						<p>Choose what comes your way.</p>
						<Switch
							checked={digest}
							label='Daily digest'
							labelPos='start'
							onChange={event => setDigest(event.target.checked)}
						/>
						<p>{digest ? 'Your daily summary is on.' : 'Daily summary paused.'}</p>
					</div>
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}
