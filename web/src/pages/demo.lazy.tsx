import { Button, Offcanvas, type OffcanvasSize } from '@polyms/ui-kit'
import { ChartSquare, Code2, Layers, MagicStick3 } from '@solar-icons/react-perf/BoldDuotone'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import type { ComponentType } from 'react'

import { Header } from './-views/DemoHeader'

export const Route = createLazyFileRoute('/demo')({
	component: Page,
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type DemoFeature = {
	description: string
	icon: ComponentType<{ className?: string }>
	title: string
}

type OffcanvasSizeSpec = {
	size: OffcanvasSize
	width: string
	height: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const features: DemoFeature[] = [
	{
		description:
			'Sticky app header with the bare-variant NavigationMenu — Accounts, Cards, Transfers and Investments share a single animated viewport.',
		icon: Layers,
		title: 'Mega menu shell',
	},
	{
		description:
			'Local-state login/logout flow next to the search field — perfect for stress-testing button variants, ghost hover and focus rings.',
		icon: MagicStick3,
		title: 'Stateful interactions',
	},
	{
		description:
			'Balance cards, virtual card visuals, recipient avatars and CSS bar charts — all rendered with @polyms/ui-kit tokens and the neutral scale.',
		icon: ChartSquare,
		title: 'Data-driven content',
	},
]

const offcanvasSizes: OffcanvasSizeSpec[] = [
	{ size: 'sm', width: '300px', height: '40%' },
	{ size: 'md', width: '360px', height: '60%' },
	{ size: 'lg', width: '480px', height: '75%' },
	{ size: 'xl', width: '640px', height: '90%' },
	{ size: '2xl', width: '768px', height: '90%' },
	{ size: '3xl', width: '896px', height: '90%' },
	{ size: 'full', width: '100%', height: '100%' },
]

function Page() {
	return (
		<div className='playground-page flex min-h-0 min-w-0 flex-1 flex-col'>
			<Header />

			<div className='docs-demo-shell relative isolate flex-1 overflow-x-clip bg-body text-fg'>
				<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
					<div className='playground-grid absolute inset-x-0 top-0 h-144' />
					<div className='playground-glow-wide bg-primary-700/15 absolute -top-24 left-1/2 h-112 -translate-x-1/2 rounded-full blur-3xl' />
					<div className='bg-primary-700/10 absolute top-48 -right-20 h-72 w-72 rounded-full blur-3xl' />
					<div className='absolute top-80 -left-16 h-64 w-64 rounded-full bg-neutral-300/40 blur-3xl dark:bg-neutral-700/30' />
				</div>

				<main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
					<section className='mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20'>
						<div className='inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-100/80 backdrop-blur-sm dark:border-line dark:bg-surface/80 dark:text-muted dark:ring-line/40'>
							<span className='playground-status-dot bg-success-500 flex size-1.5 rounded-full' />
							Playground
						</div>

						<h1 className='mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl'>
							A fintech-style shell, powered by UI Kit
						</h1>
						<p className='mt-4 max-w-3xl text-base leading-relaxed text-pretty text-muted md:text-lg'>
							Sticky header with a real{' '}
							<span className='font-semibold text-neutral-800 dark:text-fg'>mega menu</span>, global search
							and an auth flow — composed entirely from{' '}
							<code className='rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800 dark:bg-surface dark:text-fg'>
								@polyms/ui-kit
							</code>{' '}
							primitives.
						</p>

						<div className='mt-8 flex flex-wrap items-center gap-3'>
							<Button
								className='shadow-primary-700/20 px-5 shadow-sm'
								render={<Link to='/design-system' />}
								rounded
								size='lg'
								variant='primary'
							>
								Open Design system
							</Button>
							<Button
								outlined
								render={
									<a href='https://github.com/polyms/ui-kit' rel='noopener noreferrer' target='_blank'>
										GitHub
									</a>
								}
								rounded
								variant='light'
							/>
						</div>
					</section>

					<section className='mx-auto w-full max-w-5xl px-5 pb-16 md:px-8'>
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{features.map(({ description, icon: Icon, title }) => (
								<article
									className={clsx(
										'group flex flex-col rounded-2xl border border-neutral-200/90 bg-white/90 p-6 shadow-sm',
										'ring-1 ring-neutral-100/80 transition-shadow duration-200',
										'hover:shadow-md hover:shadow-neutral-200/60 dark:border-line dark:bg-surface/80 dark:ring-line/40',
										'dark:hover:shadow-black/20'
									)}
									key={title}
								>
									<div className='bg-primary-700/10 text-primary-700 group-hover:bg-primary-700/15 dark:bg-primary-700/20 dark:text-primary-300 dark:group-hover:bg-primary-700/25 flex size-11 items-center justify-center rounded-xl transition-colors'>
										<Icon className='size-6' />
									</div>
									<h2 className='mt-4 text-lg font-semibold tracking-tight text-fg'>{title}</h2>
									<p className='mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted'>{description}</p>
								</article>
							))}
						</div>

						<div className='mt-10 flex flex-col gap-6 rounded-2xl border border-neutral-200/90 bg-linear-to-br from-white via-white to-neutral-50/90 p-6 shadow-sm ring-1 ring-neutral-100/80 md:flex-row md:items-start md:gap-8 md:p-8 dark:border-line dark:from-surface dark:via-surface dark:to-surface/80 dark:ring-line/40'>
							<div className='dark:bg-primary-700 dark:text-primary-50 flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white'>
								<Code2 className='size-7' />
							</div>
							<div className='min-w-0 flex-1'>
								<div className='flex flex-wrap items-center gap-2'>
									<span className='badge badge-success badge-lg rounded-full font-semibold'>Tip</span>
									<span className='text-sm font-medium text-muted'>Content layout</span>
								</div>
								<p className='mt-3 leading-relaxed text-pretty text-neutral-600 dark:text-muted'>
									The main content should be in a region with a{' '}
									<code className='rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-800 dark:bg-surface dark:text-fg'>
										max-width
									</code>{' '}
									reasonable width (here using{' '}
									<code className='rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-800 dark:bg-surface dark:text-fg'>
										max-w-5xl
									</code>
									) to keep lines from getting too long on wide screens, while keeping the hero and card grid
									centered with consistent horizontal padding.
								</p>
							</div>
						</div>
					</section>

					<section className='mx-auto w-full max-w-5xl px-5 pb-20 md:px-8'>
						<div className='flex flex-col gap-1'>
							<div className='flex flex-wrap items-center gap-2'>
								<h2 className='text-xl font-semibold tracking-tight text-fg'>Offcanvas sizes</h2>
								<span className='badge badge-primary rounded-full font-semibold'>Live</span>
							</div>
							<p className='max-w-2xl text-sm leading-relaxed text-pretty text-muted'>
								Trigger each panel to test the real{' '}
								<code className='rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-800 dark:bg-surface dark:text-fg'>
									size
								</code>{' '}
								token on{' '}
								<code className='rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-800 dark:bg-surface dark:text-fg'>
									Offcanvas.Content
								</code>
								. These are right-edge drawers, so the value maps to width; on viewports below 768px every
								panel falls back to a full-width bottom sheet.
							</p>
						</div>

						<div className='mt-5 flex flex-wrap gap-3'>
							{offcanvasSizes.map(({ size, width, height }) => (
								<Offcanvas key={size} swipeDirection='right'>
									<Offcanvas.Trigger
										render={<Button className='uppercase' outlined rounded variant='light' />}
									>
										{size}
									</Offcanvas.Trigger>
									<Offcanvas.Content size={size}>
										<Offcanvas.Header>
											<Offcanvas.Title>
												<span className='flex items-center gap-2'>
													Offcanvas
													<span className='badge badge-primary rounded-full uppercase'>{size}</span>
												</span>
											</Offcanvas.Title>
										</Offcanvas.Header>
										<Offcanvas.Description>
											Right-edge drawer rendered with{' '}
											<code className='font-mono'>size=&quot;{size}&quot;</code> — {width} wide on desktop
											(height {height} when used as an up/down drawer), capped at 90% of the viewport.
										</Offcanvas.Description>
										<Offcanvas.Body>
											<div className='space-y-4'>
												<section className='rounded-lg border border-line p-4'>
													<p className='text-sm font-semibold text-fg'>Resolved dimensions</p>
													<dl className='mt-2 space-y-1 text-sm'>
														<div className='flex items-center justify-between'>
															<dt className='text-muted'>Width (left/right)</dt>
															<dd className='font-mono text-fg'>{width}</dd>
														</div>
														<div className='flex items-center justify-between'>
															<dt className='text-muted'>Height (up/down)</dt>
															<dd className='font-mono text-fg'>{height}</dd>
														</div>
													</dl>
												</section>
												<p className='text-sm leading-relaxed text-muted'>
													Resize the window or drag the panel to verify the scroll area, sticky header and
													swipe dismissal behave at this size.
												</p>
											</div>
										</Offcanvas.Body>
									</Offcanvas.Content>
								</Offcanvas>
							))}
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
