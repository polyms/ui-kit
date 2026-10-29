import { seoByRoute } from 'virtual:seo-meta'
import {
	ArrowDown01Icon,
	ArrowRight01Icon,
	CheckmarkCircle02Icon,
	CodeIcon,
	GithubIcon,
	Layers01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Accordion, Button } from '@polyms/ui-kit'
import { ArrowRightUp } from '@solar-icons/react-perf/LineDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
	domAnimation,
	LazyMotion,
	MotionConfig,
	m,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'motion/react'
import { type ReactNode, useRef, useState } from 'react'
import { FaviconFit } from '../assets/FaviconFit'
import { BrandLogo } from '../components/BrandLogo'
import { CopyCommand } from '../components/landing/CopyCommand'
import { HeroShelf } from '../components/landing/HeroShelf'
import { LandingPlayground } from '../components/landing/LandingPlayground'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { homeSeoPage } from '../seo/document'
import { routeHead } from '../seo/head'
import homePageStylesUrl from '../styles/home.page.css?url'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type RevealProps = { children: ReactNode; className?: string; delay?: number }

type AnimatedTitleProps = {
	id?: string
	lines: { text: string; tone?: 'muted' | 'accent' }[]
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/')({
	head: () => routeHead(seoByRoute['/'] ?? homeSeoPage()),
	component: () => (
		<>
			<link href={homePageStylesUrl} precedence='high' rel='stylesheet' />
			<LazyMotion features={domAnimation} strict>
				<MotionConfig reducedMotion='user'>
					<LandingPage />
				</MotionConfig>
			</LazyMotion>
		</>
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
			<section aria-labelledby='playground-title' className='home-section home-wrap' id='playground'>
				<Reveal className='home-section-heading'>
					<div>
						<span className='home-label'>01 — THE PLAYGROUND</span>
						<AnimatedTitle
							id='playground-title'
							lines={[{ text: 'A little play.' }, { text: 'A lot of possibility.', tone: 'muted' }]}
						/>
					</div>
					<p>
						Pick a color. Change the mood. Push a button.
						<br />
						This is your space to see what fits.
					</p>
				</Reveal>
				<Reveal>
					<LandingPlayground />
				</Reveal>
			</section>
			<StorySection />
			<CraftSection />
			<InstallSection />
			<FaqSection />
			<FooterSection />
		</main>
	)
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
	const reduced = useReducedMotion()
	return (
		<m.div
			className={className}
			initial={{ opacity: 0, y: reduced ? 0 : 20 }}
			transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay }}
			viewport={{ once: true, amount: 0.12 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{children}
		</m.div>
	)
}

function AnimatedTitle({ id, lines }: AnimatedTitleProps) {
	const reduced = useReducedMotion()
	return (
		<m.h2
			aria-label={lines.map(line => line.text).join(' ')}
			className='home-animated-title'
			id={id}
			initial={reduced ? false : 'hidden'}
			variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.045 } } }}
			viewport={{ once: true, amount: 0.5 }}
			whileInView='visible'
		>
			{lines.map(line => (
				<span
					aria-hidden='true'
					className={
						line.tone === 'muted'
							? 'home-title-line home-soft-text'
							: line.tone === 'accent'
								? 'home-title-line home-title-accent'
								: 'home-title-line'
					}
					key={line.text}
				>
					{line.text.split(' ').map(word => (
						<span className='home-word-mask' key={word}>
							<m.span
								variants={{
									hidden: { y: reduced ? 0 : '105%', opacity: reduced ? 1 : 0 },
									visible: {
										y: 0,
										opacity: 1,
										transition: { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
									},
								}}
							>
								{word}
							</m.span>
						</span>
					))}
				</span>
			))}
		</m.h2>
	)
}

function InstallSection() {
	const target = useRef<HTMLElement>(null)
	const reduced = useReducedMotion()
	const desktop = useMediaQuery('(min-width: 1024px)')
	const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] })
	const copyY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18])
	const panelY = useTransform(scrollYProgress, [0, 0.5, 1], [38, 0, -28])
	const panelRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -1.5])
	const animateScroll = desktop && !reduced
	return (
		<section
			aria-labelledby='install-title'
			className='home-section home-wrap home-install'
			id='get-started'
			ref={target}
		>
			<m.div style={animateScroll ? { y: copyY } : undefined}>
				<Reveal>
					<span className='home-label'>04 — YOUR NEXT PROJECT</span>
					<AnimatedTitle
						id='install-title'
						lines={[{ text: 'From “what if”' }, { text: 'to your first commit.' }]}
					/>
					<p>Add the kit, import the styles, and make your first component.</p>
					<Link className='home-text-link' to='/installation'>
						Read the installation guide <Arrow />
					</Link>
				</Reveal>
			</m.div>
			<m.div
				className='home-install-motion'
				style={animateScroll ? { y: panelY, rotate: panelRotate } : undefined}
			>
				<Reveal className='home-install-panel' delay={0.12}>
					<span className='home-label'>START SOMETHING GOOD</span>
					<CopyCommand />
					<div className='home-install-notes'>
						<span>React 19</span>
						<span>Tailwind CSS 4</span>
						<span>MIT licensed</span>
					</div>
				</Reveal>
			</m.div>
		</section>
	)
}

function Arrow() {
	return <HugeiconsIcon aria-hidden='true' icon={ArrowRight01Icon} size={18} />
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
						<HugeiconsIcon icon={GithubIcon} size={20} />
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
						Try the playground <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
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
					<HugeiconsIcon icon={CodeIcon} size={23} />
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
					<HugeiconsIcon icon={CheckmarkCircle02Icon} size={21} />
					<span>Ready for your ideas</span>
				</m.div>
				<img
					alt=''
					aria-hidden='true'
					className='home-hero-mascot'
					fetchPriority='high'
					height='2400'
					src='/mascot.png'
					width='2600'
				/>
				<span aria-hidden='true' className='home-stage-caption'>
					REAL COMPONENTS. A LITTLE PERSONALITY.
				</span>
			</div>
		</section>
	)
}

const STORY_STEPS = [
	{
		label: 'Pick',
		caption: 'A few good pieces.',
		badge: 'Your components',
		title: 'Find your starting point.',
		copy: 'Buttons, tabs, fields, dialogs. Start with a small piece that already feels right.',
		link: '/design-system',
		action: 'Explore the components',
	},
	{
		label: 'Compose',
		caption: 'Better, together.',
		badge: 'Your components',
		title: 'Put the pieces together.',
		copy: 'Compose the parts you need. Keep control of your layout, content, and interactions.',
		link: '/docs/modal',
		action: 'See composition in action',
	},
	{
		label: 'Customize',
		caption: 'Feels like you.',
		badge: 'Your brand',
		title: 'Make it unmistakably yours.',
		copy: 'Bring your colors. Switch the theme. Give every component the same point of view.',
		link: '/design-tokens',
		action: 'Meet your design tokens',
	},
] as const

function StorySection() {
	const target = useRef<HTMLDivElement>(null)
	const [step, setStep] = useState(0)
	const desktop = useMediaQuery('(min-width: 1024px)')
	const { scrollYProgress } = useScroll({ target, offset: ['start center', 'end center'] })
	useMotionValueEvent(scrollYProgress, 'change', value => {
		if (desktop) setStep(Math.min(2, Math.floor(value * 3)))
	})
	return (
		<section aria-labelledby='story-title' className='home-story-section home-wrap' id='how-it-works'>
			<Reveal className='home-section-heading'>
				<div>
					<span className='home-label'>02 — SMALL PIECES, BIG IDEAS</span>
					<AnimatedTitle
						id='story-title'
						lines={[{ text: 'Yours, from' }, { text: 'the first building block.', tone: 'muted' }]}
					/>
				</div>
			</Reveal>
			<div className='home-story-layout'>
				<div className='home-story-sticky'>
					<div aria-hidden='true' className='home-story-scene'>
						<StoryVisual step={step} />
					</div>
					<nav aria-label='Building steps' className='home-story-timeline'>
						<ol>
							{STORY_STEPS.map((item, index) => (
								<li
									data-state={index === step ? 'active' : index < step ? 'complete' : 'upcoming'}
									key={item.label}
								>
									<a aria-current={index === step ? 'step' : undefined} href={`#building-step-${index + 1}`}>
										<span className='home-timeline-marker'>0{index + 1}</span>
										<span>{item.label}</span>
									</a>
								</li>
							))}
						</ol>
					</nav>
					<div className='home-story-progress'>
						<m.div style={{ scaleX: scrollYProgress }} />
					</div>
				</div>
				<div className='home-story-steps' ref={target}>
					{STORY_STEPS.map((item, index) => (
						<m.article
							className='home-story-step'
							data-active={index === step}
							id={`building-step-${index + 1}`}
							key={item.title}
							onViewportEnter={desktop ? undefined : () => setStep(index)}
							viewport={{ margin: '-55% 0px -15% 0px', amount: 0.15 }}
						>
							<Reveal>
								<span className='home-step-number'>0{index + 1}</span>
								<h3>{item.title}</h3>
								<p>{item.copy}</p>
								<Link className='home-text-link' to={item.link}>
									{item.action} <Arrow />
								</Link>
							</Reveal>
						</m.article>
					))}
				</div>
			</div>
		</section>
	)
}

function StoryVisual({ step }: { step: number }) {
	const story = STORY_STEPS[step] ?? STORY_STEPS[0]

	return (
		<div className='home-assembly' data-step={step}>
			<div className='home-assembly-grid' />
			<div className='home-assembly-card'>
				<span className='home-label'>YOUR NEXT IDEA</span>
				<strong>A place to begin.</strong>
				<span className='home-assembly-line' />
				<span className='home-assembly-line short' />
				<span className='home-assembly-action'>
					Let’s make it happen <Arrow />
				</span>
			</div>
			<div className='home-assembly-piece piece-label'>
				<span className='home-piece-dot' /> Workspace
			</div>
			<div className='home-assembly-piece piece-switch'>
				<span>Make it yours</span>
				<span className='home-drawn-switch' />
			</div>
			<div className='home-assembly-piece piece-badge'>
				<HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} /> {story.badge}
			</div>
			<span className='home-assembly-caption'>{story.caption}</span>
		</div>
	)
}

function CraftSection() {
	return (
		<section aria-labelledby='craft-title' className='home-craft'>
			<div className='home-wrap'>
				<Reveal className='home-section-heading'>
					<div>
						<span className='home-label'>03 — THE SERIOUS SIDE</span>
						<AnimatedTitle
							id='craft-title'
							lines={[{ text: 'The charm is visible.' }, { text: 'The care runs deeper.', tone: 'muted' }]}
						/>
					</div>
					<p>
						Clear APIs. Thoughtful defaults.
						<br />
						Room for the way you build.
					</p>
				</Reveal>
				<div className='home-craft-grid'>
					<Reveal className='home-code-panel'>
						<div className='home-code-header'>
							<span>workspace.tsx</span>
							<span>React + TypeScript</span>
						</div>
						<pre>
							<code>
								<span className='home-code-muted'>{'// A small piece of your next interface.'}</span>
								{'\n'}
								<span className='home-code-accent'>import</span>
								{" { Button } from '@polyms/ui-kit'\n"}
								<span className='home-code-accent'>import</span>
								{" { useState } from 'react'\n\n"}
								<span className='home-code-accent'>export function</span>
								{
									' Workspace() {\n  const [done, setDone] = useState(false)\n\n  return (\n    <Button\n      variant="primary"\n      disabled={done}\n      onClick={() => setDone(true)}\n    >\n      {done ? "Complete" : "Finish this step"}\n    </Button>\n  )\n}'
								}
							</code>
						</pre>
						<Link className='home-code-link' to='/docs/button'>
							Explore the Button API <Arrow />
						</Link>
					</Reveal>
					<div className='home-craft-points'>
						<Reveal>
							<span className='home-craft-symbol'>
								<HugeiconsIcon icon={CodeIcon} size={24} />
							</span>
							<h3>A good conversation with your editor.</h3>
							<p>Typed props and composable APIs keep the next step clear.</p>
						</Reveal>
						<Reveal>
							<div aria-hidden='true' className='home-keycaps'>
								<kbd>tab</kbd>
								<kbd>↵</kbd>
								<kbd>esc</kbd>
							</div>
							<h3>Keyboard users are invited.</h3>
							<p>
								Try the tabs and dialog above. Focus and keyboard interactions are part of the experience.
							</p>
						</Reveal>
						<Reveal>
							<span className='home-craft-symbol'>
								<HugeiconsIcon icon={Layers01Icon} size={24} />
							</span>
							<h3>Your styles. Your application.</h3>
							<p>CSS variables and Tailwind. No runtime CSS-in-JS. MIT licensed, ready to make your own.</p>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	)
}

function FaqSection() {
	return (
		<section aria-labelledby='faq-title' className='home-wrap home-faq-section'>
			<div>
				<span className='home-label'>A FEW GOOD QUESTIONS</span>
				<AnimatedTitle id='faq-title' lines={[{ text: 'Before you' }, { text: 'jump in.' }]} />
			</div>
			<Accordion className='home-faq'>
				<Accordion.Item title='What do I need to get started?' value='setup'>
					A React 19 app and Tailwind CSS 4. Follow the installation guide for the package, peer dependencies,
					and styles.
				</Accordion.Item>
				<Accordion.Item title='Can I bring my own brand?' value='brand'>
					Yes. Customize the color tokens and compose components around your content. Try the playground above
					to see the same interface in different palettes.
				</Accordion.Item>
				<Accordion.Item title='Does it work with my framework?' value='framework'>
					Use it in React projects with Vite, Next.js, Remix, and other React frameworks. Check the
					installation guide for setup details.
				</Accordion.Item>
				<Accordion.Item title='Can I use it in commercial projects?' value='license'>
					Yes. Polyms UI Kit is open source under the MIT license. Use it in personal and commercial projects
					while keeping the required license notice.
				</Accordion.Item>
			</Accordion>
		</section>
	)
}

function FooterSection() {
	return (
		<footer className='home-footer'>
			<div className='home-wrap'>
				<div className='home-final-cta'>
					<Reveal>
						<span className='home-label'>A LITTLE POLYMS. A LOT OF YOU.</span>
						<AnimatedTitle lines={[{ text: 'Make something' }, { text: 'feel good.', tone: 'accent' }]} />
						<Button render={<Link to='/installation' />} rounded size='xl' variant='dark'>
							Let’s get building <Arrow />
						</Button>
					</Reveal>
					<img alt='' aria-hidden='true' height='2400' loading='lazy' src='/mascot.png' width='2600' />
				</div>
			</div>
			<div className='home-footer-panel dark'>
				<div className='home-wrap'>
					<div className='home-footer-links'>
						<a className='link link-light home-footer-mail' href='mailto:hello@polyms.dev'>
							hello@polyms.dev
						</a>
						<nav aria-label='Footer navigation' className='home-footer-columns'>
							<div className='home-footer-col'>
								<span className='home-label'>Explore</span>
								<Link to='/design-system'>Design system</Link>
								<Link data-testid='home-nav-typography' to='/typography'>
									Typography
								</Link>
								<Link to='/installation'>Installation</Link>
							</div>
							<div className='home-footer-col'>
								<span className='home-label'>Elsewhere</span>
								<a href='https://github.com/polyms/ui-kit' rel='noopener noreferrer' target='_blank'>
									GitHub <ArrowRightUp aria-hidden='true' />
								</a>
								<a href='https://polyms.dev' rel='noopener noreferrer' target='_blank'>
									Polyms <ArrowRightUp aria-hidden='true' />
								</a>
							</div>
						</nav>
					</div>
					<div className='home-footer-brand-row'>
						<Link aria-label='Polyms home' className='home-footer-mark' to='/'>
							<FaviconFit className='home-footer-mark-icon' hexCenterColor='var(--fg)' />
							<span>olyms</span>
						</Link>
						<div className='home-footer-meta'>
							<span>Built with a little care.</span>
							<span>© {new Date().getFullYear()} Polyms · MIT licensed</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
