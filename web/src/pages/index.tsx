import { seoByRoute } from 'virtual:seo-meta'
import { Button } from '@polyms/ui-kit'
import { createFileRoute, Link } from '@tanstack/react-router'
import { domAnimation, LazyMotion, MotionConfig, m, useReducedMotion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Icon } from '../assets/layout-symbols'
import { BrandLogo } from '../components/BrandLogo'
import { HeroShelf } from '../components/landing/HeroShelf'
import { MascotImage } from '../components/landing/MascotImage'
import { homeSeoPage } from '../seo/document'
import { routeHead } from '../seo/head'

import '../styles/home.page.css'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const LandingBelow = lazy(() =>
	import('../components/landing/LandingBelow').then(module => ({ default: module.LandingBelow }))
)

export const Route = createFileRoute('/')({
	head: () => routeHead(seoByRoute['/'] ?? homeSeoPage()),
	component: () => (
		<LazyMotion features={domAnimation} strict>
			<MotionConfig reducedMotion='user'>
				<LandingPage />
			</MotionConfig>
		</LazyMotion>
	),
	staticData: { layout: 'landing' },
})

function LandingPage() {
	return (
		<main className='landing' data-testid='home-page'>
			<a className='home-skip' href='#playground'>
				Skip to the playground
			</a>
			<LandingNav />
			<HeroSection />
			<div className='home-foundations home-wrap'>
				<span>
					GOOD FOUNDATIONS.
					<br />
					MORE ROOM TO CREATE.
				</span>
				<strong>React 19</strong>
				<strong>TypeScript</strong>
				<strong>Tailwind CSS 4</strong>
				<strong>Open source ↗</strong>
			</div>
			<Suspense
				fallback={
					<div className='home-playground-placeholder home-section home-wrap'>
						<div id='playground' />
					</div>
				}
			>
				<LandingBelow />
			</Suspense>
		</main>
	)
}

function Arrow() {
	return <Icon name='arrow-right-01' size={18} />
}

function LandingNav() {
	return (
		<header className='home-nav'>
			<div className='home-wrap home-nav-inner'>
				<Link aria-label='Polyms home' className='home-brand' to='/'>
					<BrandLogo className='gap-0.5' iconClassName='h-10 w-auto'>
						olyms
					</BrandLogo>
					<span className='home-brand-suffix ms-2'> / ui</span>
				</Link>
				<nav aria-label='Main navigation' className='home-nav-links'>
					<a className='item-dark' href='#playground'>
						Playground
					</a>
					<Link className='item-dark' data-testid='home-nav-design-system' to='/design-system'>
						Design system
					</Link>
					<a
						aria-label='GitHub repository'
						className='item-dark aspect-square'
						href='https://github.com/polyms/ui-kit'
						rel='noopener noreferrer'
						target='_blank'
					>
						<Icon name='github' size={20} />
					</a>
				</nav>
				<Button
					data-testid='home-get-started'
					render={<Link to='/installation' />}
					rounded
					size='lg'
					variant='dark'
				>
					Get started <Arrow />
				</Button>
			</div>
		</header>
	)
}

function HeroSection() {
	const reduced = useReducedMotion()
	return (
		<section aria-labelledby='hero-title' className='home-hero home-wrap'>
			<div className='home-hero-copy'>
				<div className='home-label home-hero-label'>
					<span className='home-live-dot' /> LITTLE DETAILS. BIG POSSIBILITIES.
				</div>
				<h1 id='hero-title'>
					<span className='home-title-mask'>
						<span>Friendly on</span>
					</span>
					<span className='home-title-mask'>
						<span>the surface.</span>
					</span>
					<span className='home-title-mask home-title-accent'>
						<span>Strict underneath.</span>
					</span>
				</h1>
				<p>
					Thoughtful React components with a playful side.
					<br className='home-desktop-break' /> Make interfaces that feel as good as they work.
				</p>
				<div className='home-hero-actions'>
					<Button
						data-testid='home-browse-components'
						render={<Link to='/design-system' />}
						rounded
						size='xl'
						variant='dark'
					>
						Explore components <Arrow />
					</Button>
					<Button render={<a href='#playground' />} rounded size='xl'>
						Try the playground <Icon name='arrow-down-01' size={18} />
					</Button>
				</div>
				<div className='home-hero-note'>
					<span aria-hidden='true'>✳</span> Made for the details you care about.
				</div>
			</div>
			<div className='home-hero-stage'>
				<div aria-hidden='true' className='home-stage-orbit' />
				<m.div
					animate={{ opacity: 1, y: 0, rotate: 0 }}
					className='home-hero-project home-preview-theme'
					data-mode='light'
					initial={{ opacity: 0, y: reduced ? 0 : 42, rotate: reduced ? 0 : 5 }}
					transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.15 }}
				>
					<HeroShelf />
				</m.div>
				<m.div
					animate={{ opacity: 1, x: 0, rotate: -7 }}
					aria-hidden='true'
					className='home-floating-note home-note-code'
					initial={{ opacity: 0, x: reduced ? 0 : -36, rotate: 0 }}
					transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3 }}
				>
					<Icon name='code' size={23} />
					<span>
						Typed.
						<br />
						<strong>To the last prop.</strong>
					</span>
				</m.div>
				<m.div
					animate={{ opacity: 1, y: 0 }}
					aria-hidden='true'
					className='home-floating-note home-note-ready'
					initial={{ opacity: 0, y: reduced ? 0 : 28 }}
					transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.5 }}
				>
					<Icon name='checkmark-circle-02' size={21} />
					<span>Ready for your ideas</span>
				</m.div>
				<MascotImage
					className='home-hero-mascot'
					priority='high'
					sizes='(min-width: 1024px) 235px, (min-width: 640px) 215px, 120px'
				/>
				<span aria-hidden='true' className='home-stage-caption'>
					REAL COMPONENTS. A LITTLE PERSONALITY.
				</span>
			</div>
		</section>
	)
}
