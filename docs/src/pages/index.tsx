/** biome-ignore-all lint/style/useNamingConvention: Icon component prop */

import { GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Menu, Popover, Select, Switch, Tabs, Tooltip } from '@polyms/core'
import {
  Accessibility,
  Code2,
  Layers,
  MagicStick3,
  Palette,
  Rocket,
  SpeedometerMax,
} from '@solar-icons/react-perf/BoldDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { FaviconFit } from '../assets/FaviconFit'
import homePageStylesUrl from '../styles/home.page.css?url'

export const Route = createFileRoute('/')({
  component: RouteComponent,
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
    <>
      <link href={homePageStylesUrl} precedence='high' rel='stylesheet' />
      <div className='home-scanline' />
      <main className='landing relative isolate overflow-x-clip bg-slate-950 text-slate-100'>
        <BackgroundDecor />
        <LandingNav />
        <HeroSection />
        <ComponentShowcaseSection />
        <FeaturesSection />
        <ThemingSection />
        <InstallSection />
        <MetricsSection />
        <FaqSection />
        <CTASection />
        <FooterSection />
      </main>
    </>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden='true' className='home-decor'>
      <div className='home-decor-grid' />
      <div className='home-decor-glow -top-60 left-1/2 h-112 w-240 -translate-x-1/2 bg-primary/25' />
      <div className='home-decor-glow top-160 -left-40 h-96 w-96 bg-primary/10' />
      <div className='home-decor-glow top-320 -right-40 h-112 w-md bg-primary/10' />
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
          <FaviconFit className='h-10 w-auto' hexCenterColor='#fff' />
          <span className='ms-1 mb-1.5 font-semibold text-slate-100 tracking-tight'>olyms</span>
          <span className='home-nav-tag ms-2'>Core UI</span>
        </Link>

        <nav className='hidden items-center gap-1 md:flex'>
          <Link className='home-nav-link' to='/design-system'>
            Docs
          </Link>
          <Link className='home-nav-link' to='/typography'>
            Typography
          </Link>
        </nav>

        <div className='ms-auto flex items-center gap-2'>
          <a
            aria-label='GitHub repository'
            className='home-btn-glass sm hidden sm:inline-flex'
            href='https://github.com/polyms/core-ui'
            rel='noopener noreferrer'
            target='_blank'
          >
            <HugeiconsIcon className='size-4' icon={GithubIcon} />
            <span className='hidden sm:inline'>GitHub</span>
          </a>
          <Link className='btn btn-primary btn-sm rounded-full' to='/design-system'>
            Get started
            <ArrowRightIcon className='size-3.5' />
          </Link>
        </div>
      </Container>
    </header>
  )
}

function HeroSection() {
  return (
    <section className='relative flex h-[calc(100dvh-3.5rem)] min-h-[700px] items-center overflow-hidden'>
      {/* Background Marquee */}
      <div className='pointer-events-none absolute top-[45%] left-0 z-0 w-full -translate-y-1/2'>
        <div className='home-marquee-container'>
          <div className='home-marquee-content'>
            <span className='px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-primary-500/80 italic md:px-8'>
              EDGY {'//'}
            </span>
            <span className='home-text-outline-neon px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-transparent italic md:px-8'>
              UNCOMPROMISING {'//'}
            </span>
            <span className='px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-primary-500/80 italic md:px-8'>
              POLYMS CORE UI {'//'}
            </span>
            <span className='home-text-outline-neon px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-transparent italic md:px-8'>
              CYBERPUNK {'//'}
            </span>
            <span className='px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-primary-500/80 italic md:px-8'>
              EDGY {'//'}
            </span>
            <span className='home-text-outline-neon px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-transparent italic md:px-8'>
              UNCOMPROMISING {'//'}
            </span>
            <span className='px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-primary-500/80 italic md:px-8'>
              POLYMS CORE UI {'//'}
            </span>
            <span className='home-text-outline-neon px-4 font-black text-[clamp(2.5rem,6vw,3.75rem)] text-transparent italic md:px-8'>
              CYBERPUNK {'//'}
            </span>
          </div>
        </div>
      </div>

      <Container className='relative z-10 w-full'>
        <div className='relative z-30 max-w-4xl'>
          <h1 className='text-balance font-black uppercase leading-[0.85] tracking-tighter'>
            <span className='block text-[clamp(4rem,15vw,8rem)] text-slate-100 mix-blend-difference drop-shadow-2xl'>
              STRICT.
            </span>
            <span className='home-text-outline-neon relative z-20 -mt-1 block text-[clamp(5rem,18vw,10rem)] md:-mt-3 lg:-mt-6'>
              EDGY.
            </span>
            <span className='relative z-10 mt-1 block text-[clamp(2.5rem,10vw,6.5rem)] text-primary-400 drop-shadow-[0_0_20px_rgba(var(--color-primary-500),0.8)] md:mt-2 lg:mt-0'>
              PRODUCTION-READY.
            </span>
          </h1>

          <p className='mt-6 max-w-xl text-balance border-primary-500 border-l-4 bg-black/40 p-3 font-medium text-base text-slate-300 drop-shadow-md backdrop-blur-sm md:mt-8 md:p-4 md:text-lg lg:text-xl'>
            Type-safe, accessible, and composable primitives built on{' '}
            <span className='text-white'>Base UI</span> and{' '}
            <span className='text-white'>Tailwind CSS v4</span>. No rounded corners, no safe bets.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-6 md:mt-10 md:gap-8'>
            <Link className='home-cyber-btn' to='/design-system'>
              Browse components
            </Link>
            <a
              className='font-bold text-slate-300 text-sm uppercase tracking-widest transition-all hover:text-white hover:drop-shadow-[0_0_10px_#fff]'
              href='https://github.com/polyms/core-ui'
              rel='noopener noreferrer'
              target='_blank'
            >
              Star on GitHub {'//'}
            </a>
          </div>
        </div>
      </Container>

      {/* Breakout Mascot */}
      <div className='home-mascot-breakout'>
        <img alt='Polyms Anime Mascot' className='w-full' src='/mascot.png' />
      </div>
    </section>
  )
}

function ComponentShowcaseSection() {
  return (
    <section className='px-6 py-16 md:py-24'>
      <Container>
        <SectionHeader
          eyebrow='Live preview'
          subtitle='Real components, not screenshots. Hover, click, focus — everything works.'
          title='See the design system in motion'
        />

        <div className='mt-12 grid auto-rows-[13rem] grid-cols-1 gap-6 sm:grid-cols-6'>
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
        <span className='font-medium text-slate-700 text-xs uppercase tracking-wider'>{label}</span>
        <Link
          aria-label={`Open ${label} docs`}
          className='link link-light inline-flex items-center gap-1 text-xs'
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
        <span className='badge badge-primary'>primary</span>
        <span className='badge badge-success'>success</span>
        <span className='badge badge-warning'>warning</span>
        <span className='badge badge-danger'>danger</span>
        <span className='badge badge-light'>light</span>
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
      <Tabs.Panel className='pt-3 text-slate-600 text-sm' value='overview'>
        Build accessible tabs with animated indicator out of the box.
      </Tabs.Panel>
      <Tabs.Panel className='pt-3 text-slate-600 text-sm' value='settings'>
        Compose with forms, popovers, and menus.
      </Tabs.Panel>
      <Tabs.Panel className='pt-3 text-slate-600 text-sm' value='billing'>
        Keyboard navigation and ARIA roles included.
      </Tabs.Panel>
    </Tabs>
  )
}

function PopoverPreview() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      <Popover>
        <Popover.Trigger className='btn btn-primary rounded-full'>Open popover</Popover.Trigger>
        <Popover.Content
          description='Composable, focus-trapped, and animated.'
          side='bottom'
          title='Hello there'
        />
      </Popover>

      <Tooltip.Provider>
        <Tooltip side='bottom' title='Tooltips work too'>
          <button className='btn btn-light rounded-full' type='button'>
            Hover me
          </button>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  )
}

function SwitchPreview() {
  return (
    <div className='flex w-full flex-col gap-3 text-slate-700 text-sm'>
      <div className='flex items-center justify-between gap-3'>
        <span>Notifications</span>
        <Switch defaultChecked />
      </div>
      <div className='flex items-center justify-between gap-3'>
        <span>Dark mode</span>
        <Switch />
      </div>
      <div className='flex items-center justify-between gap-3 text-slate-400'>
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
      <Menu.Trigger className='btn btn-primary outlined rounded-full'>Actions</Menu.Trigger>
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

function FeaturesSection() {
  const features: FeatureItem[] = [
    {
      Icon: Code2,
      title: 'Type-safe by default',
      description: 'Strict TypeScript with full IntelliSense on every prop and compound subcomponent.',
      tone: 'primary',
    },
    {
      Icon: Accessibility,
      title: 'Accessible out of the box',
      description: 'Built on Base UI primitives — keyboard nav, ARIA, focus management included.',
      tone: 'success',
    },
    {
      Icon: Layers,
      title: 'Composable architecture',
      description: 'Dot-notation compound components (`Modal.Header`, `Field.Control`) for clear intent.',
      tone: 'primary',
    },
    {
      Icon: Palette,
      title: 'Themeable tokens',
      description: 'CSS variables and Tailwind v4 — swap palettes per brand without forking components.',
      tone: 'primary',
    },
    {
      Icon: SpeedometerMax,
      title: 'Performance-first',
      description: 'Tree-shakeable bundle, lazy primitives, and zero runtime CSS-in-JS overhead.',
      tone: 'warning',
    },
    {
      Icon: Rocket,
      title: 'Ready for AI workflows',
      description: 'Ships with a `core-ui` agent skill so assistants compose UI the right way.',
      tone: 'primary',
    },
  ]

  return (
    <section className='relative px-6 py-20 md:py-28'>
      <Container>
        <SectionHeader
          eyebrow='Why Core UI'
          subtitle='Every primitive is opinionated where it matters — accessibility, types, semantics — and flexible everywhere else.'
          title='Built for serious product teams'
        />

        <div className='home-feature-grid mt-12'>
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeatureCard({ Icon, title, description, tone }: FeatureItem) {
  return (
    <div className='home-feature'>
      <div className={clsx('home-feature-icon', `tone-${tone}`)}>
        <Icon className='size-6' />
      </div>
      <h3 className='mt-5 font-semibold text-base text-slate-100'>{title}</h3>
      <p className='mt-2 text-slate-400 text-sm leading-relaxed'>{description}</p>
    </div>
  )
}

function ThemingSection() {
  return (
    <section className='border-slate-800/60 border-y bg-slate-900/30 px-6 py-20 md:py-28'>
      <Container>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div>
            <div className='home-section-eyebrow'>Theming API</div>
            <h2 className='mt-4 text-balance font-semibold text-3xl text-slate-100 tracking-tight md:text-4xl'>
              Make it yours in minutes.
            </h2>
            <p className='mt-4 max-w-xl text-slate-400 md:text-lg'>
              Polyms Core UI is built on CSS variables. You don't need to fork the library to match your
              brand. Just tweak a few variables and the entire design system adapts seamlessly.
            </p>
            <ul className='mt-8 space-y-4 text-slate-300'>
              <li className='flex items-center gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-400'>
                  <Palette className='size-4' />
                </div>
                <span>No complex CSS-in-JS configurations</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-400'>
                  <MagicStick3 className='size-4' />
                </div>
                <span>Tailwind CSS v4 ready out of the box</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-400'>
                  <Layers className='size-4' />
                </div>
                <span>
                  Dynamic colors via{' '}
                  <code className='rounded bg-primary/10 px-1 py-0.5 text-primary-300 text-xs'>
                    color-mix()
                  </code>
                </span>
              </li>
            </ul>
          </div>
          <div className='relative'>
            <div className='home-example-card border-primary/20 shadow-2xl shadow-primary/5'>
              <div className='home-example-card-header'>
                <span className='home-dot close' />
                <span className='home-dot minimize' />
                <span className='home-dot maximize' />
                <span className='label'>theme.css</span>
              </div>
              <pre className='home-example-code'>
                <code dangerouslySetInnerHTML={{ __html: THEME_CODE_HTML }} />
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

const THEME_CODE_HTML = [
  '<span class="tk-keyword">:root</span> <span class="tk-punct">{</span>',
  '  <span class="tk-bracket">/* Brand colors */</span>',
  '  <span class="tk-attr">--color-primary-500</span><span class="tk-punct">:</span> <span class="tk-string">#8b5cf6</span><span class="tk-punct">;</span>',
  '  <span class="tk-attr">--color-slate-900</span><span class="tk-punct">:</span> <span class="tk-string">#0f172a</span><span class="tk-punct">;</span>',
  '',
  '  <span class="tk-bracket">/* Geometry */</span>',
  '  <span class="tk-attr">--radius-base</span><span class="tk-punct">:</span> <span class="tk-string">0.75rem</span><span class="tk-punct">;</span>',
  '<span class="tk-punct">}</span>',
  '',
  '<span class="tk-keyword">.dark</span> <span class="tk-punct">{</span>',
  '  <span class="tk-attr">--color-primary-500</span><span class="tk-punct">:</span> <span class="tk-string">#a78bfa</span><span class="tk-punct">;</span>',
  '<span class="tk-punct">}</span>',
].join('\n')

function InstallSection() {
  return (
    <section className='px-6 py-20 md:py-28'>
      <Container>
        <SectionHeader
          eyebrow='Get started'
          subtitle='Install once, import the components you need from a single barrel. No deep imports required.'
          title='Up and running in 30 seconds'
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
        <TerminalIcon className='size-4 text-slate-500' />
        <span className='font-medium text-sm'>Install</span>
      </div>
      <Tabs className='flex-1' defaultValue='pnpm'>
        <Tabs.List className='px-2 pt-2'>
          <Tabs.Tab value='pnpm'>pnpm</Tabs.Tab>
          <Tabs.Tab value='npm'>npm</Tabs.Tab>
          <Tabs.Tab value='yarn'>yarn</Tabs.Tab>
          <Tabs.Tab value='bun'>bun</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel className='px-5 py-5' value='pnpm'>
          <CodeBlock>pnpm add @polyms/core-ui</CodeBlock>
        </Tabs.Panel>
        <Tabs.Panel className='px-5 py-5' value='npm'>
          <CodeBlock>npm install @polyms/core-ui</CodeBlock>
        </Tabs.Panel>
        <Tabs.Panel className='px-5 py-5' value='yarn'>
          <CodeBlock>yarn add @polyms/core-ui</CodeBlock>
        </Tabs.Panel>
        <Tabs.Panel className='px-5 py-5' value='bun'>
          <CodeBlock>bun add @polyms/core-ui</CodeBlock>
        </Tabs.Panel>
      </Tabs>

      <div className='home-install-card-footer'>
        <p>
          Peers: <code>react</code> <code>react-dom</code>{' '}
          <span className='text-slate-500'>&gt;= 19.0.0</span>
        </p>
      </div>
    </div>
  )
}

const EXAMPLE_CODE_HTML = [
  '<span class="tk-keyword">import</span> <span class="tk-punct">{</span> <span class="tk-component">Modal</span><span class="tk-punct">,</span> <span class="tk-component">Button</span> <span class="tk-punct">}</span> <span class="tk-keyword">from</span> <span class="tk-string">\'@polyms/core-ui\'</span>',
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
    { value: '30+', label: 'Components', sub: 'production-ready' },
    { value: '100%', label: 'TypeScript', sub: 'strict mode' },
    { value: 'WCAG', label: 'AA compliant', sub: 'on every primitive' },
    { value: '0', label: 'Runtime CSS-in-JS', sub: 'just Tailwind + CSS' },
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
      <div className='mt-2 font-medium text-slate-100 text-sm'>{label}</div>
      <div className='text-slate-500 text-xs'>{sub}</div>
    </div>
  )
}

function FaqSection() {
  return (
    <section className='px-6 py-20 md:py-28'>
      <Container>
        <SectionHeader
          eyebrow='FAQ'
          subtitle='Everything you need to know about Polyms Core UI.'
          title='Frequently asked questions'
        />
        <div className='mx-auto mt-12 max-w-3xl space-y-4'>
          <FaqItem
            answer='Yes, Polyms is framework-agnostic when it comes to bundlers. It works perfectly with Vite, Next.js (App Router), Remix, and any modern React framework.'
            question='Is it compatible with Next.js or Vite?'
          />
          <FaqItem
            answer='Yes, Polyms is built on top of Tailwind CSS v4. You will need it to properly compile the utility classes used by the components.'
            question='Do I need to install Tailwind CSS?'
          />
          <FaqItem
            answer='Absolutely. We build our primitives on top of Base UI, which handles complex ARIA states, focus management, and keyboard navigation according to WAI-ARIA guidelines.'
            question='Is it fully accessible?'
          />
          <FaqItem
            answer='Polyms is designed specifically for building complex, edgy, and highly interactive interfaces without sacrificing accessibility. It strikes the perfect balance between strict design systems and chaotic creativity.'
            question='Why another component library?'
          />
        </div>
      </Container>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className='rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-colors hover:border-slate-700 hover:bg-slate-800/40'>
      <h3 className='flex items-center gap-3 font-medium text-lg text-slate-100'>
        <span className='text-primary-400'>Q.</span>
        {question}
      </h3>
      <p className='ms-7 mt-2 text-slate-400 leading-relaxed'>{answer}</p>
    </div>
  )
}

function CTASection() {
  return (
    <section className='px-6 pt-16 pb-24 md:pt-24 md:pb-32'>
      <Container>
        <div className='home-cta'>
          <div
            aria-hidden='true'
            className='home-decor-glow top-0 left-1/2 h-72 w-xl -translate-x-1/2 bg-primary/20'
          />
          <div aria-hidden='true' className='home-decor-glow right-0 -bottom-32 h-72 w-72 bg-primary/10' />
          <div className='relative grid items-end gap-8 md:grid-cols-[1fr_auto]'>
            <div>
              <span className='home-cta-pill'>
                <MagicStick3 className='size-3.5' />
                Ready when you are
              </span>
              <h2 className='mt-4 max-w-2xl text-balance font-semibold text-3xl text-slate-100 tracking-tight md:text-5xl'>
                Stop reinventing the same primitives.
                <br />
                <span className='home-cta-accent'>Start shipping product.</span>
              </h2>
              <p className='mt-4 max-w-xl text-slate-400 md:text-lg'>
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
            </div>
            <div className='flex flex-wrap items-center gap-3 md:flex-col md:items-stretch'>
              <Link className='btn btn-primary btn-xl rounded-full px-6' to='/design-system'>
                Get started
                <ArrowRightIcon className='size-4' />
              </Link>
              <a
                className='home-btn-glass lg'
                href='https://github.com/polyms/core-ui'
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
  return (
    <footer className='border-slate-800 border-t bg-slate-950'>
      <Container className='flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center'>
        <div className='flex items-center'>
          <FaviconFit className='h-20 w-auto' hexCenterColor='#fff' />
          <div className='ms-1'>
            <div className='font-semibold text-2xl text-slate-100'>olyms</div>
            <div className='text-slate-500 text-xs'>© 2026 Polyms. MIT Licensed.</div>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
          <Link className='home-footer-link' to='/design-system'>
            Components
          </Link>
          <Link className='home-footer-link' to='/typography'>
            Typography
          </Link>
          <a
            className='home-footer-link'
            href='https://github.com/polyms/core-ui'
            rel='noopener noreferrer'
            target='_blank'
          >
            GitHub
          </a>
          <a className='home-footer-link' href='https://polyms.dev' rel='noopener noreferrer' target='_blank'>
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
      <h2 className='mt-4 text-balance font-semibold text-3xl text-slate-100 tracking-tight md:text-4xl'>
        {title}
      </h2>
      <p className='mt-3 text-balance text-slate-400 md:text-lg'>{subtitle}</p>
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

type FeatureTone = 'primary' | 'success' | 'warning'

type FeatureItem = {
  Icon: React.ComponentType<IconProps>
  title: string
  description: string
  tone: FeatureTone
}

type MetricItem = {
  value: string
  label: string
  sub: string
}
