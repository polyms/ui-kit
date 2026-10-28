/** biome-ignore-all lint/style/useNamingConvention: Icon component prop */

import { GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Menu, Popover, Select, Switch, Tabs, Tooltip } from '@polyms/ui-kit'
import { Layers, MagicStick3, Palette, SpeedometerMax } from '@solar-icons/react-perf/BoldDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { FaviconFit } from '../assets/FaviconFit'
import { useThemeStore } from '../stores/theme.store'
import homePageStylesUrl from '../styles/home.page.css?url'

export const Route = createFileRoute('/')({
	component: () => (
		<>
			<link href={homePageStylesUrl} precedence='high' rel='stylesheet' />
			<RouteComponent />
		</>
	),
	staticData: {
		layout: 'landing',
	},
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type IconProps = { className?: string }

type SectionProps = {
	className?: string
	children: React.ReactNode
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function RouteComponent() {
	return (
		<main className='landing relative isolate overflow-x-clip' data-testid='home-page'>
			<BackgroundDecor />
			<LandingNav />
			<HeroSection />
			<ComponentShowcaseSection />
			<PillarsSection />
			<ThemingSection />
			<PiecesSection />
			<KeyboardSection />
			<KitSection />
			<InstallSection />
			<MetricsSection />
			<FaqSection />
			<CTASection />
			<FooterSection />
		</main>
	)
}

function BackgroundDecor() {
	return (
		<div aria-hidden='true' className='home-decor'>
			<div className='home-decor-grid' />
			<div className='home-decor-glow home-decor-glow-peach -top-40 left-1/2 h-112 w-240 -translate-x-1/2' />
			<div className='home-decor-glow home-decor-glow-cyan top-160 -left-40 h-96 w-96' />
			<div className='home-decor-glow home-decor-glow-peach top-320 -right-32 h-96 w-96' />
		</div>
	)
}

function Container({ children, className }: SectionProps) {
	return <div className={clsx('mx-auto w-full max-w-6xl px-6', className)}>{children}</div>
}

function LandingNav() {
	return (
		<header className='home-nav'>
			<Container className='flex h-14 items-center gap-6'>
				<Link className='flex items-center' to='/'>
					<FaviconFit className='h-10 w-auto' hexCenterColor='#334155' />
					<span className='ms-1 mb-1.5 font-semibold tracking-tight text-neutral-900 dark:text-fg'>
						olyms
					</span>
					<span className='home-nav-tag ms-2'>UI Kit</span>
				</Link>

				<nav className='hidden items-center gap-1 md:flex'>
					<Link className='home-nav-link' data-testid='home-nav-docs' to='/design-system'>
						Docs
					</Link>
					<Link className='home-nav-link' data-testid='home-nav-typography' to='/typography'>
						Typography
					</Link>
				</nav>

				<div className='ms-auto flex items-center gap-2'>
					<Button
						data-testid='home-get-started'
						render={<Link to='/design-system' />}
						rounded
						size='sm'
						variant='dark'
					>
						Get started
						<ArrowRightIcon className='size-3.5' />
					</Button>
				</div>
			</Container>
		</header>
	)
}

function HeroSection() {
	return (
		<section className='home-hero'>
			<Container>
				<div className='home-hero-grid'>
					<div>
						<div className='home-section-eyebrow'>Polyms UI Kit</div>
						<h1 className='home-hero-title'>
							<span className='home-hero-accent'>Friendly</span> on the surface.
							<span className='home-hero-title-line'>Strict underneath.</span>
						</h1>
						<p className='home-hero-sub'>
							React components that feel easy to use, and stay strict where it counts. Built with{' '}
							<span className='home-hero-em'>Base UI</span> and{' '}
							<span className='home-hero-em'>Tailwind CSS</span>.
						</p>
						<div className='home-hero-actions'>
							<Button
								data-testid='home-browse-components'
								render={<Link to='/design-system' />}
								rounded
								size='lg'
								variant='dark'
							>
								Browse components
								<ArrowRightIcon className='size-4' />
							</Button>
							<a
								className='btn outlined btn-dark btn-lg inline-flex rounded-full'
								href='https://github.com/polyms/ui-kit'
								rel='noopener noreferrer'
								target='_blank'
							>
								<HugeiconsIcon className='size-4' icon={GithubIcon} />
								Star on GitHub
							</a>
						</div>
						<ul aria-label='Highlights' className='home-hero-chips'>
							<li className='home-hero-chip'>Open source</li>
							<li className='home-hero-chip'>React 19</li>
							<li className='home-hero-chip'>Tailwind CSS 4</li>
							<li className='home-hero-chip'>Your colors</li>
						</ul>
					</div>

					<div className='home-hero-stage'>
						<img
							alt={
								'Polyms mascot, a clay character with glasses holding a tablet and pen, ' +
								'surrounded by design tools'
							}
							className='home-hero-mascot'
							src='/mascot.png'
						/>
					</div>
				</div>
			</Container>
		</section>
	)
}

function ComponentShowcaseSection() {
	return (
		<section className='px-6 py-16 md:py-24'>
			<Container>
				<SectionHeader
					eyebrow='Live preview'
					subtitle="Hover, click, and tab through. These aren't pictures."
					title="Try them. They're real."
				/>

				<div className='mt-12 grid auto-rows-52 grid-cols-1 gap-6 sm:grid-cols-6'>
					<ShowcaseCard className='sm:col-span-3 sm:row-span-2 sm:h-auto' label='Button' to='/docs/button'>
						<ButtonsPreview />
					</ShowcaseCard>

					<ShowcaseCard className='sm:col-span-3' label='Tabs' to='/docs/tabs'>
						<TabsPreview />
					</ShowcaseCard>

					<ShowcaseCard className='sm:col-span-3' label='Popover · Tooltip' to='/docs/popover'>
						<PopoverPreview />
					</ShowcaseCard>

					<ShowcaseCard className='sm:col-span-2' label='Switch' to='/docs/switch'>
						<SwitchPreview />
					</ShowcaseCard>

					<ShowcaseCard className='sm:col-span-2' label='Select' to='/docs/select'>
						<SelectPreview />
					</ShowcaseCard>

					<ShowcaseCard className='sm:col-span-2' label='Menu' to='/docs/menu'>
						<MenuPreview />
					</ShowcaseCard>
				</div>
			</Container>
		</section>
	)
}

function ShowcaseCard({
	children,
	label,
	to,
	className,
}: {
	children: React.ReactNode
	label: string
	to: string
	className?: string
}) {
	return (
		<article className={clsx('home-showcase-card group', className)}>
			<div className='flex flex-1 items-center justify-center p-6'>{children}</div>
			<div className='home-showcase-card-footer'>
				<span className='text-xs font-medium text-neutral-500 dark:text-muted'>{label}</span>
				<Link
					aria-label={`Open ${label} docs`}
					className='link link-dark inline-flex items-center gap-1 text-xs'
					data-testid={`home-showcase-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
					to={to}
				>
					Open
					<ArrowRightIcon className='size-3 transition-transform group-hover:translate-x-0.5' />
				</Link>
			</div>
		</article>
	)
}

function ButtonsPreview() {
	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<div className='flex flex-wrap items-center justify-center gap-2'>
				<Button rounded variant='primary'>
					Primary
				</Button>
				<Button rounded variant='success'>
					Success
				</Button>
				<Button rounded variant='warning'>
					Warning
				</Button>
				<Button rounded variant='danger'>
					Danger
				</Button>
			</div>
			<div className='flex flex-wrap items-center justify-center gap-2'>
				<Button outlined rounded variant='primary'>
					Outlined
				</Button>
				<Button rounded size='sm' variant='dark'>
					Small
				</Button>
				<Button rounded size='lg' variant='primary'>
					Large
				</Button>
			</div>
			<div className='flex flex-wrap items-center justify-center gap-2'>
				<span className='badge badge-primary rounded-full'>primary</span>
				<span className='badge badge-success rounded-full'>success</span>
				<span className='badge badge-warning rounded-full'>warning</span>
				<span className='badge badge-danger rounded-full'>danger</span>
				<span className='badge badge-light rounded-full'>light</span>
			</div>
		</div>
	)
}

function TabsPreview() {
	return (
		<Tabs className='w-full' defaultValue='overview'>
			<Tabs.List>
				<Tabs.Tab value='overview'>Overview</Tabs.Tab>
				<Tabs.Tab value='settings'>Settings</Tabs.Tab>
				<Tabs.Tab value='billing'>Billing</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel className='pt-3 text-sm text-neutral-600 dark:text-muted' value='overview'>
				Build accessible tabs with animated indicator out of the box.
			</Tabs.Panel>
			<Tabs.Panel className='pt-3 text-sm text-neutral-600 dark:text-muted' value='settings'>
				Compose with forms, popovers, and menus.
			</Tabs.Panel>
			<Tabs.Panel className='pt-3 text-sm text-neutral-600 dark:text-muted' value='billing'>
				Keyboard navigation and ARIA roles included.
			</Tabs.Panel>
		</Tabs>
	)
}

function PopoverPreview() {
	return (
		<div className='flex flex-wrap items-center justify-center gap-4'>
			<Popover>
				<Popover.Trigger render={<Button rounded variant='primary' />}>Open popover</Popover.Trigger>
				<Popover.Content
					description='Composable, focus-trapped, and animated.'
					side='bottom'
					title='Hello there'
				/>
			</Popover>

			<Tooltip.Provider>
				<Tooltip side='bottom' title='Tooltips work too'>
					<Button outlined rounded variant='light'>
						Hover me
					</Button>
				</Tooltip>
			</Tooltip.Provider>
		</div>
	)
}

function SwitchPreview() {
	return (
		<div className='flex w-full flex-col gap-3 text-sm text-neutral-700 dark:text-fg'>
			<div className='flex items-center justify-between gap-3'>
				<span>Notifications</span>
				<Switch defaultChecked />
			</div>
			<div className='flex items-center justify-between gap-3'>
				<span>Dark mode</span>
				<Switch />
			</div>
			<div className='flex items-center justify-between gap-3 text-neutral-400'>
				<span>Beta features</span>
				<Switch defaultChecked disabled />
			</div>
		</div>
	)
}

function SelectPreview() {
	return (
		<Select defaultValue='vite' items={frameworks}>
			<Select.Trigger className='w-full rounded-full' placeholder='Pick a stack'>
				{item => item?.label ?? 'Pick a stack'}
			</Select.Trigger>
			<Select.Content>
				{frameworks.map(item => (
					<Select.Item key={item.value} value={item.value}>
						{item.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	)
}

const frameworks = [
	{ label: 'Vite', value: 'vite' },
	{ label: 'Next.js', value: 'next' },
	{ label: 'Remix', value: 'remix' },
	{ label: 'Astro', value: 'astro' },
]

function MenuPreview() {
	return (
		<Menu>
			<Menu.Trigger render={<Button outlined rounded variant='primary' />}>Actions</Menu.Trigger>
			<Menu.Content title='Quick actions'>
				<Menu.Item>
					Edit
					<Menu.Command meta sequence='E' />
				</Menu.Item>
				<Menu.Item>
					Duplicate
					<Menu.Command meta sequence='D' />
				</Menu.Item>
				<Menu.Separator />
				<Menu.Item variant='danger'>Delete</Menu.Item>
			</Menu.Content>
		</Menu>
	)
}

const PILLARS = [
	{
		title: 'Components',
		copy: 'Button, Modal, Field, Menu. Real pieces, not pictures.',
	},
	{
		title: 'Variables',
		copy: 'One primary color runs through buttons, badges, and links.',
	},
	{
		title: 'Keyboard',
		copy: 'Focus and keys come with the component.',
	},
	{
		title: 'Light',
		copy: 'No runtime CSS-in-JS. Just Tailwind and CSS.',
	},
] as const

function PillarsSection() {
	return (
		<section className='px-6 pb-8 md:pb-12'>
			<Container>
				<ul className='home-pillar-grid'>
					{PILLARS.map(pillar => (
						<li className='home-pillar' key={pillar.title}>
							<h2 className='home-pillar-title'>{pillar.title}</h2>
							<p className='home-pillar-copy'>{pillar.copy}</p>
						</li>
					))}
				</ul>
			</Container>
		</section>
	)
}

const LANDING_PRIMARY_SWATCHES = ['cyan', 'violet', 'orange', 'rose'] as const

function ThemingSection() {
	const palettes = useThemeStore(state => state.palettes)
	const primaryRamp = useThemeStore(state => state.primaryRamp)
	const setPalette = useThemeStore(state => state.setPalette)

	return (
		<section className='home-band px-6 py-20 md:py-28'>
			<Container>
				<div className='grid items-center gap-12 lg:grid-cols-2'>
					<div>
						<div className='home-section-eyebrow'>Variables</div>
						<h2 className='home-band-title'>Customize easily with variables.</h2>
						<p className='home-band-copy'>Pick a color. Buttons, badges, and links follow. No fork.</p>
						<ul className='home-band-list'>
							<li className='flex items-center gap-3'>
								<div className='home-band-icon'>
									<Palette className='size-4' />
								</div>
								<span>One primary color runs through the kit</span>
							</li>
							<li className='flex items-center gap-3'>
								<div className='home-band-icon'>
									<Layers className='size-4' />
								</div>
								<span>
									Hover and tint use <code className='badge badge-dark'>color-mix()</code>
								</span>
							</li>
							<li className='flex items-center gap-3'>
								<div className='home-band-icon'>
									<MagicStick3 className='size-4' />
								</div>
								<span>Works with Tailwind CSS 4</span>
							</li>
							<li className='flex items-center gap-3'>
								<div className='home-band-icon'>
									<SpeedometerMax className='size-4' />
								</div>
								<span>No CSS-in-JS setup</span>
							</li>
						</ul>
					</div>
					<div className='home-theme-stage'>
						<fieldset className='home-theme-swatches'>
							<legend className='home-theme-legend'>Primary</legend>
							{LANDING_PRIMARY_SWATCHES.map(palette => {
								const selected = palettes.primary === palette && primaryRamp === null
								return (
									<button
										aria-label={`Primary ${palette}`}
										aria-pressed={selected}
										className={clsx('home-theme-swatch', selected && 'is-active')}
										key={palette}
										onClick={() => setPalette('primary', palette)}
										style={{ backgroundColor: `var(--color-${palette}-600)` }}
										type='button'
									/>
								)
							})}
						</fieldset>
						<div className='home-theme-live'>
							<Button rounded variant='primary'>
								Primary
							</Button>
							<Button outlined rounded variant='primary'>
								Outlined
							</Button>
							<span className='badge badge-primary rounded-full'>Primary</span>
							<Link className='link link-primary font-medium' to='/design-system'>
								A primary link
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

function PiecesSection() {
	return (
		<StorySection
			alt='Clay mascot stacking puzzle tiles labeled Header, Field, and Button'
			copy='Name the part you mean. Modal.Header, Field.Control, Button. The props show up in your editor.'
			image='/landing-pieces.png'
			points={[
				'Compound pieces, not one giant component',
				'Every prop shows up in your editor',
				'Import them from one barrel, @polyms/ui-kit',
			]}
			title='Pieces that fit together.'
		/>
	)
}

function KeyboardSection() {
	return (
		<StorySection
			alt='Clay mascot pressing one key on a cream keyboard, with lots of open space'
			copy='Focus, ARIA, and keys come from Base UI. The page stays light: CSS and Tailwind, no runtime CSS-in-JS.'
			flip
			image='/landing-keyboard.png'
			points={[
				'Keyboard and screen readers are already handled',
				'No runtime CSS-in-JS',
				'MIT. Use it on as many apps as you want',
			]}
			title='Keyboard included. Still light.'
		/>
	)
}

function StorySection({
	title,
	copy,
	points,
	image,
	alt,
	flip = false,
}: {
	title: string
	copy: string
	points: string[]
	image: string
	alt: string
	flip?: boolean
}) {
	return (
		<section className='px-6 py-16 md:py-24'>
			<Container>
				<div className={clsx('home-story', flip && 'is-flipped')}>
					<div>
						<h2 className='home-band-title'>{title}</h2>
						<p className='home-band-copy'>{copy}</p>
						<ul className='home-band-list'>
							{points.map(point => (
								<li className='flex items-center gap-3' key={point}>
									<div className='home-band-icon'>
										<CheckIcon className='size-4' />
									</div>
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>
					<img alt={alt} className='home-story-image' src={image} />
				</div>
			</Container>
		</section>
	)
}

const KIT_ITEMS = ['Components', 'CSS variables', 'TypeScript strict', 'MIT license'] as const

function KitSection() {
	return (
		<section className='px-6 pb-4'>
			<Container>
				<div className='home-kit'>
					<h2 className='home-kit-title'>In the kit</h2>
					<ul className='home-kit-list'>
						{KIT_ITEMS.map(item => (
							<li key={item}>
								<CheckIcon className='text-primary-700 dark:text-primary-200 size-4' />
								{item}
							</li>
						))}
					</ul>
				</div>
			</Container>
		</section>
	)
}

function InstallSection() {
	return (
		<section className='px-6 py-20 md:py-28'>
			<Container>
				<SectionHeader
					eyebrow='Get started'
					subtitle={'Point @polyms at registry.polyms.dev in .npmrc, then import from ' + "'@polyms/ui-kit'."}
					title='One install. Then just import.'
				/>

				<div className='mt-12 grid gap-6 lg:grid-cols-5'>
					<InstallCard className='lg:col-span-2' />
					<ExampleCard className='lg:col-span-3' />
				</div>
			</Container>
		</section>
	)
}

function InstallCard({ className }: { className?: string }) {
	return (
		<div className={clsx('home-install-card', className)}>
			<div className='home-install-card-header'>
				<TerminalIcon className='size-4 text-neutral-500 dark:text-muted' />
				<span className='text-sm font-medium'>Install</span>
			</div>
			<Tabs className='flex-1' defaultValue='pnpm'>
				<Tabs.List className='px-2 pt-2'>
					<Tabs.Tab value='pnpm'>pnpm</Tabs.Tab>
					<Tabs.Tab value='npm'>npm</Tabs.Tab>
					<Tabs.Tab value='yarn'>yarn</Tabs.Tab>
					<Tabs.Tab value='bun'>bun</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel className='px-5 py-5' value='pnpm'>
					<CodeBlock>pnpm add @polyms/ui-kit</CodeBlock>
				</Tabs.Panel>
				<Tabs.Panel className='px-5 py-5' value='npm'>
					<CodeBlock>npm install @polyms/ui-kit</CodeBlock>
				</Tabs.Panel>
				<Tabs.Panel className='px-5 py-5' value='yarn'>
					<CodeBlock>yarn add @polyms/ui-kit</CodeBlock>
				</Tabs.Panel>
				<Tabs.Panel className='px-5 py-5' value='bun'>
					<CodeBlock>bun add @polyms/ui-kit</CodeBlock>
				</Tabs.Panel>
			</Tabs>

			<div className='home-install-card-footer'>
				<p>
					Peers: <code>react</code> <code>react-dom</code>{' '}
					<span className='text-neutral-500 dark:text-muted'>&gt;= 19.0.0</span>
				</p>
			</div>
		</div>
	)
}

const EXAMPLE_CODE_HTML = [
	'<span class="tk-keyword">import</span> <span class="tk-punct">{</span> <span class="tk-component">Modal</span><span class="tk-punct">,</span> <span class="tk-component">Button</span> <span class="tk-punct">}</span> <span class="tk-keyword">from</span> <span class="tk-string">\'@polyms/ui-kit\'</span>',
	'',
	'<span class="tk-keyword">export function</span> <span class="tk-attr">App</span><span class="tk-punct">() {</span>',
	'  <span class="tk-keyword">return</span> <span class="tk-punct">(</span>',
	'    <span class="tk-bracket">&lt;</span><span class="tk-component">Modal</span><span class="tk-bracket">&gt;</span>',
	'      <span class="tk-bracket">&lt;</span><span class="tk-component">Modal.Trigger</span> <span class="tk-attr">variant</span><span class="tk-punct">=</span><span class="tk-string">"primary"</span><span class="tk-bracket">&gt;</span>',
	'        Open dialog',
	'      <span class="tk-bracket">&lt;/</span><span class="tk-component">Modal.Trigger</span><span class="tk-bracket">&gt;</span>',
	'      <span class="tk-bracket">&lt;</span><span class="tk-component">Modal.Content</span> <span class="tk-attr">size</span><span class="tk-punct">=</span><span class="tk-string">"lg"</span><span class="tk-bracket">&gt;</span>',
	'        <span class="tk-bracket">&lt;</span><span class="tk-component">Modal.Header</span><span class="tk-bracket">&gt;</span>Confirm<span class="tk-bracket">&lt;/</span><span class="tk-component">Modal.Header</span><span class="tk-bracket">&gt;</span>',
	'        <span class="tk-bracket">&lt;</span><span class="tk-component">Modal.Body</span><span class="tk-bracket">&gt;</span>Save changes?<span class="tk-bracket">&lt;/</span><span class="tk-component">Modal.Body</span><span class="tk-bracket">&gt;</span>',
	'        <span class="tk-bracket">&lt;</span><span class="tk-component">Modal.Footer</span><span class="tk-bracket">&gt;</span>',
	'          <span class="tk-bracket">&lt;</span><span class="tk-component">Button</span> <span class="tk-attr">variant</span><span class="tk-punct">=</span><span class="tk-string">"primary"</span><span class="tk-bracket">&gt;</span>Save<span class="tk-bracket">&lt;/</span><span class="tk-component">Button</span><span class="tk-bracket">&gt;</span>',
	'        <span class="tk-bracket">&lt;/</span><span class="tk-component">Modal.Footer</span><span class="tk-bracket">&gt;</span>',
	'      <span class="tk-bracket">&lt;/</span><span class="tk-component">Modal.Content</span><span class="tk-bracket">&gt;</span>',
	'    <span class="tk-bracket">&lt;/</span><span class="tk-component">Modal</span><span class="tk-bracket">&gt;</span>',
	'  <span class="tk-punct">)</span>',
	'<span class="tk-punct">}</span>',
].join('\n')

function ExampleCard({ className }: { className?: string }) {
	return (
		<div className={clsx('home-example-card', className)}>
			<div className='home-example-card-header'>
				<span className='home-dot close' />
				<span className='home-dot minimize' />
				<span className='home-dot maximize' />
				<span className='label'>App.tsx</span>
			</div>
			<pre className='home-example-code'>
				<code dangerouslySetInnerHTML={{ __html: EXAMPLE_CODE_HTML }} />
			</pre>
		</div>
	)
}

function CodeBlock({ children }: { children: React.ReactNode }) {
	return (
		<div className='home-cmd'>
			<span className='truncate'>
				<span className='home-cmd-prompt'>$</span> {children}
			</span>
			<CopyHintButton text={String(children)} />
		</div>
	)
}

function CopyHintButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [])

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
			if (timerRef.current) clearTimeout(timerRef.current)
			timerRef.current = setTimeout(() => setCopied(false), 1500)
		} catch {
			// noop — clipboard may be unavailable
		}
	}

	return (
		<button
			aria-label='Copy command'
			className={clsx('home-cmd-copy', copied && 'copied')}
			onClick={handleCopy}
			type='button'
		>
			{copied ? <CheckIcon className='size-4' /> : <CopyIcon className='size-4' />}
		</button>
	)
}

function MetricsSection() {
	const metrics: MetricItem[] = [
		{ value: '20+', label: 'Components', sub: 'ready to use' },
		{ value: '100%', label: 'TypeScript', sub: 'strict' },
		{ value: 'CSS', label: 'variables', sub: 'for color' },
		{ value: '0', label: 'Runtime CSS-in-JS', sub: 'just Tailwind and CSS' },
	]

	return (
		<section className='px-6 py-10 md:py-16'>
			<Container>
				<div className='home-metric-grid'>
					{metrics.map(metric => (
						<MetricCell key={metric.label} {...metric} />
					))}
				</div>
			</Container>
		</section>
	)
}

function MetricCell({ value, label, sub }: MetricItem) {
	return (
		<div className='home-metric-cell'>
			<div className='home-metric-value'>{value}</div>
			<div className='mt-2 text-sm font-medium text-neutral-800 dark:text-fg'>{label}</div>
			<div className='text-xs text-neutral-500 dark:text-muted'>{sub}</div>
		</div>
	)
}

function FaqSection() {
	return (
		<section className='px-6 py-20 md:py-28'>
			<Container>
				<SectionHeader
					eyebrow='FAQ'
					subtitle='Short answers. The docs go deeper.'
					title='Questions, answered.'
				/>
				<div className='mx-auto mt-12 max-w-3xl space-y-4'>
					<FaqItem
						answer='You get typed components, keyboard support, and colors you can change without forking. The friendly part is the API. The strict part is what ships.'
						question='Why this kit?'
					/>
					<FaqItem
						answer='Yes. It works with Vite, Next.js, Remix, and other React setups.'
						question='Does it work with Next.js and Vite?'
					/>
					<FaqItem
						answer='Yes. Components use Tailwind CSS 4 utility classes, so Tailwind needs to be in the app.'
						question='Do I need Tailwind?'
					/>
					<FaqItem
						answer='Yes. Override a few CSS variables, or pick a primary color on this page. You do not fork the components.'
						question='Can I change the colors without forking?'
					/>
					<FaqItem
						answer='Yes. Focus, ARIA, and keyboard behavior come from Base UI.'
						question='Is it accessible?'
					/>
					<FaqItem
						answer='Yes. The license is MIT, so you can use it on as many apps as you want.'
						question='Can I use it on more than one app?'
					/>
				</div>
			</Container>
		</section>
	)
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
	return (
		<div className='home-faq'>
			<h3 className='home-faq-q'>{question}</h3>
			<p className='home-faq-a'>{answer}</p>
		</div>
	)
}

function CTASection() {
	return (
		<section className='px-6 pt-8 pb-20 md:pt-12 md:pb-28'>
			<Container>
				<div className='home-cta'>
					<img alt='' aria-hidden='true' className='home-cta-mascot' src='/mascot.png' />
					<div className='home-cta-body'>
						<span className='home-section-eyebrow'>
							<MagicStick3 className='size-3.5' />
							Ready when you are
						</span>
						<h2 className='home-cta-title'>
							Ship the interface.
							<span className='home-cta-accent'> Keep the charm.</span>
						</h2>
						<p className='mt-4 max-w-xl text-neutral-600 md:text-lg dark:text-muted'>
							Open source. MIT licensed. Built in the open by{' '}
							<a
								className='home-cta-link'
								href='https://polyms.dev'
								rel='noopener noreferrer'
								target='_blank'
							>
								Polyms
							</a>
							.
						</p>
						<div className='mt-8 flex flex-wrap items-center gap-3'>
							<Button className='px-6' render={<Link to='/design-system' />} rounded size='xl' variant='dark'>
								Get started
								<ArrowRightIcon className='size-4' />
							</Button>
							<a
								className='btn outlined btn-dark btn-lg inline-flex rounded-full'
								href='https://github.com/polyms/ui-kit'
								rel='noopener noreferrer'
								target='_blank'
							>
								<GitHubIcon className='size-4' />
								Star on GitHub
							</a>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

function FooterSection() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='home-footer'>
			<Container className='flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center'>
				<div className='flex items-center'>
					<FaviconFit className='h-20 w-auto' hexCenterColor='#334155' />
					<div className='ms-1'>
						<div className='text-2xl font-semibold text-neutral-900 dark:text-fg'>olyms</div>
						<div className='text-xs text-neutral-500 dark:text-muted'>
							© 2024-{currentYear} Polyms. MIT Licensed.
						</div>
					</div>
				</div>

				<div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
					<Link className='link link-dark font-semibold' to='/design-system'>
						Components
					</Link>
					<Link className='link link-dark font-semibold' to='/typography'>
						Typography
					</Link>
					<a
						className='link link-dark font-semibold'
						href='https://github.com/polyms/ui-kit'
						rel='noopener noreferrer'
						target='_blank'
					>
						GitHub
					</a>
					<a
						className='link link-dark font-semibold'
						href='https://polyms.dev'
						rel='noopener noreferrer'
						target='_blank'
					>
						polyms.dev
					</a>
				</div>
			</Container>
		</footer>
	)
}

function SectionHeader({
	eyebrow,
	title,
	subtitle,
	align = 'center',
}: {
	eyebrow: string
	title: string
	subtitle: string
	align?: 'center' | 'left'
}) {
	return (
		<div className={clsx('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
			<div className='home-section-eyebrow'>{eyebrow}</div>
			<h2 className='home-section-title'>{title}</h2>
			<p className='home-section-sub'>{subtitle}</p>
		</div>
	)
}

// ── Icons ──────────────────────────────────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: IconProps) {
	return (
		<svg
			aria-hidden='true'
			className={className}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			viewBox='0 0 24 24'
		>
			<path d='M5 12h14' />
			<path d='m13 5 7 7-7 7' />
		</svg>
	)
}

function CheckIcon({ className }: IconProps) {
	return (
		<svg
			aria-hidden='true'
			className={className}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2.25'
			viewBox='0 0 24 24'
		>
			<path d='m5 12 5 5L20 7' />
		</svg>
	)
}

function CopyIcon({ className }: IconProps) {
	return (
		<svg
			aria-hidden='true'
			className={className}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.75'
			viewBox='0 0 24 24'
		>
			<rect height='13' rx='2' ry='2' width='13' x='9' y='9' />
			<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
		</svg>
	)
}

function GitHubIcon({ className }: IconProps) {
	return (
		<svg aria-hidden='true' className={className} fill='currentColor' viewBox='0 0 24 24'>
			<path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.35.78 1.04.78 2.11v3.13c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' />
		</svg>
	)
}

function TerminalIcon({ className }: IconProps) {
	return (
		<svg
			aria-hidden='true'
			className={className}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			viewBox='0 0 24 24'
		>
			<path d='m4 17 6-6-6-6' />
			<path d='M12 19h8' />
		</svg>
	)
}

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type MetricItem = {
	value: string
	label: string
	sub: string
}
