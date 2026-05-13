/** biome-ignore-all lint/style/useNamingConvention: Icon component prop */

import { Button, Menu, Popover, Select, Switch, Tabs, Tooltip } from '@polyms/core'
import {
  Accessibility,
  Code2,
  Layers,
  MagicStick3,
  Palette,
  Rocket,
  SpedometerMax,
} from '@solar-icons/react-perf/BoldDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

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
    <main className='landing relative isolate overflow-x-clip bg-white text-slate-900'>
      <BackgroundDecor />
      <LandingNav />
      <HeroSection />
      <ComponentShowcaseSection />
      <FeaturesSection />
      <InstallSection />
      <MetricsSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      <div
        className='absolute inset-0 opacity-[0.35]'
        style={{
          backgroundImage: 'radial-gradient(var(--color-slate-300) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
        }}
      />
      <div className='absolute -top-48 left-1/2 h-112 w-240 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
      <div className='absolute top-72 -right-40 h-96 w-96 rounded-full bg-info/10 blur-3xl' />
    </div>
  )
}

function Container({ children, className }: SectionProps) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-6', className)}>{children}</div>
}

function LandingNav() {
  return (
    <header className='sticky top-0 z-30 border-slate-200/70 border-b bg-white/70 backdrop-blur-md'>
      <Container className='flex h-14 items-center gap-6'>
        <Link className='flex items-center gap-2' to='/'>
          <img alt='Polyms' className='size-7' src='/favicon.png' />
          <span className='font-semibold text-slate-900 tracking-tight'>Polyms</span>
          <span className='badge badge-primary rounded-full font-semibold'>Core UI</span>
        </Link>

        <nav className='hidden items-center gap-1 text-slate-600 text-sm md:flex'>
          <Link
            className='rounded-md px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900'
            to='/design-system'
          >
            Components
          </Link>
          <Link
            className='rounded-md px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900'
            to='/design-system'
          >
            Docs
          </Link>
          <Link
            className='rounded-md px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900'
            to='/typography'
          >
            Typography
          </Link>
        </nav>

        <div className='ms-auto flex items-center gap-2'>
          <a
            aria-label='GitHub repository'
            className='btn btn-light btn-sm hidden rounded-full sm:inline-flex'
            href='https://github.com/polyms/core-ui'
            rel='noopener noreferrer'
            target='_blank'
          >
            <GitHubIcon className='size-4' />
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
    <section className='relative px-6 pt-20 pb-16 md:pt-28 md:pb-24'>
      <Container className='flex flex-col items-center text-center'>
        <a
          className='group mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 text-xs shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary-700'
          href='https://github.com/polyms/core-ui/releases'
          rel='noopener noreferrer'
          target='_blank'
        >
          <span className='inline-flex size-1.5 rounded-full bg-primary' />
          <span className='font-medium'>v1.0 · MIT Licensed</span>
          <span aria-hidden='true' className='text-slate-300'>
            ·
          </span>
          <span className='text-slate-500'>Now on React 19</span>
          <ArrowRightIcon className='size-3 translate-x-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary' />
        </a>

        <h1 className='max-w-3xl text-balance font-semibold text-5xl tracking-tight md:text-7xl'>
          <span className='bg-linear-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent'>
            Production-ready
          </span>
          <br />
          <span className='bg-linear-to-r from-primary-600 via-primary-500 to-info-500 bg-clip-text text-transparent'>
            React components
          </span>
        </h1>

        <p className='mt-6 max-w-2xl text-balance text-lg text-slate-600 leading-relaxed md:text-xl'>
          Type-safe, accessible, and composable primitives built on{' '}
          <span className='font-medium text-slate-900'>Base UI</span> and{' '}
          <span className='font-medium text-slate-900'>Tailwind CSS</span>. Copy what you need, theme what you
          want — ship faster.
        </p>

        <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
          <Link className='btn btn-primary btn-xl rounded-full px-5' to='/design-system'>
            Browse components
            <ArrowRightIcon className='size-4' />
          </Link>
          <a
            className='btn btn-light btn-xl rounded-full px-5'
            href='https://github.com/polyms/core-ui'
            rel='noopener noreferrer'
            target='_blank'
          >
            <GitHubIcon className='size-4' />
            Star on GitHub
          </a>
        </div>

        <div className='mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-500 text-sm'>
          <HeroChip label='30+ components' />
          <HeroChip label='100% TypeScript' />
          <HeroChip label='WCAG 2.1 AA' />
          <HeroChip label='Tree-shakeable' />
        </div>
      </Container>
    </section>
  )
}

function HeroChip({ label }: { label: string }) {
  return (
    <span className='inline-flex items-center gap-2'>
      <CheckIcon className='size-4 text-success' />
      {label}
    </span>
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

        <div className='mt-12 grid auto-rows-[12rem] grid-cols-1 gap-4 sm:grid-cols-6'>
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
    <article
      className={clsx(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
        className
      )}
    >
      <div className='flex flex-1 items-center justify-center p-6'>{children}</div>
      <div className='flex items-center justify-between border-slate-200/80 border-t bg-slate-50/60 px-4 py-2.5'>
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
      <Select.Trigger className='w-full' placeholder='Pick a stack'>
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
      tone: 'info',
    },
    {
      Icon: Palette,
      title: 'Themeable tokens',
      description: 'CSS variables and Tailwind v4 — swap palettes per brand without forking components.',
      tone: 'warning',
    },
    {
      Icon: SpedometerMax,
      title: 'Performance-first',
      description: 'Tree-shakeable bundle, lazy primitives, and zero runtime CSS-in-JS overhead.',
      tone: 'danger',
    },
    {
      Icon: Rocket,
      title: 'Ready for AI workflows',
      description: 'Ships with `AI.md` consumer notes so assistants compose UI the right way.',
      tone: 'primary',
    },
  ]

  return (
    <section className='border-slate-200/70 border-y bg-slate-50/50 px-6 py-20 md:py-28'>
      <Container>
        <SectionHeader
          eyebrow='Why Core UI'
          subtitle='Every primitive is opinionated where it matters — accessibility, types, semantics — and flexible everywhere else.'
          title='Built for serious product teams'
        />

        <div className='mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeatureCard({ Icon, title, description, tone }: FeatureItem) {
  const toneClasses: Record<FeatureTone, string> = {
    primary: 'text-primary bg-primary/10',
    success: 'text-success-600 bg-success/10',
    info: 'text-info-600 bg-info/10',
    warning: 'text-warning-700 bg-warning/10',
    danger: 'text-danger bg-danger/10',
  }

  return (
    <div className='group relative bg-white p-7 transition-colors hover:bg-slate-50/80'>
      <div className={clsx('inline-flex size-11 items-center justify-center rounded-xl', toneClasses[tone])}>
        <Icon className='size-6' />
      </div>
      <h3 className='mt-5 font-semibold text-base text-slate-900'>{title}</h3>
      <p className='mt-2 text-slate-600 text-sm leading-relaxed'>{description}</p>
    </div>
  )
}

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
    <div
      className={clsx(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white',
        className
      )}
    >
      <div className='flex items-center gap-2 border-slate-200 border-b px-5 py-3'>
        <TerminalIcon className='size-4 text-slate-500' />
        <span className='font-medium text-slate-700 text-sm'>Install</span>
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

      <div className='border-slate-200 border-t bg-slate-50/60 p-5'>
        <p className='text-slate-600 text-xs leading-relaxed'>
          Peers: <code className='rounded bg-slate-200/60 px-1 font-mono'>react</code>{' '}
          <code className='rounded bg-slate-200/60 px-1 font-mono'>react-dom</code>{' '}
          <span className='text-slate-500'>&gt;= 19.0.0</span>
        </p>
      </div>
    </div>
  )
}

function ExampleCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-slate-900/5 shadow-xl',
        className
      )}
    >
      <div className='flex items-center gap-2 border-slate-800 border-b bg-slate-900 px-5 py-3'>
        <span className='size-2.5 rounded-full bg-rose-400/80' />
        <span className='size-2.5 rounded-full bg-amber-400/80' />
        <span className='size-2.5 rounded-full bg-emerald-400/80' />
        <span className='ms-2 font-mono text-slate-400 text-xs'>App.tsx</span>
      </div>
      <pre className='overflow-x-auto p-6 font-mono text-[13px] text-slate-100 leading-relaxed'>
        <code>
          <span className='text-violet-300'>import</span> <span className='text-slate-300'>{'{'}</span>{' '}
          <span className='text-sky-300'>Modal</span>
          <span className='text-slate-300'>,</span> <span className='text-sky-300'>Button</span>{' '}
          <span className='text-slate-300'>{'}'}</span> <span className='text-violet-300'>from</span>{' '}
          <span className='text-emerald-300'>'@polyms/core-ui'</span>
          {'\n\n'}
          <span className='text-violet-300'>export function</span> <span className='text-amber-200'>App</span>
          <span className='text-slate-300'>() {'{'}</span>
          {'\n'}
          {'  '}
          <span className='text-violet-300'>return</span> <span className='text-slate-300'>(</span>
          {'\n'}
          {'    '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'      '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal.Trigger</span> <span className='text-amber-200'>variant</span>
          <span className='text-slate-300'>=</span>
          <span className='text-emerald-300'>"primary"</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'        '}Open dialog
          {'\n'}
          {'      '}
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal.Trigger</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'      '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal.Content</span> <span className='text-amber-200'>size</span>
          <span className='text-slate-300'>=</span>
          <span className='text-emerald-300'>"lg"</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'        '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal.Header</span>
          <span className='text-slate-400'>&gt;</span>Confirm
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal.Header</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'        '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal.Body</span>
          <span className='text-slate-400'>&gt;</span>Save changes?
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal.Body</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'        '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Modal.Footer</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'          '}
          <span className='text-slate-400'>&lt;</span>
          <span className='text-sky-300'>Button</span> <span className='text-amber-200'>variant</span>
          <span className='text-slate-300'>=</span>
          <span className='text-emerald-300'>"primary"</span>
          <span className='text-slate-400'>&gt;</span>Save
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Button</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'        '}
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal.Footer</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'      '}
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal.Content</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'    '}
          <span className='text-slate-400'>&lt;/</span>
          <span className='text-sky-300'>Modal</span>
          <span className='text-slate-400'>&gt;</span>
          {'\n'}
          {'  '}
          <span className='text-slate-300'>)</span>
          {'\n'}
          <span className='text-slate-300'>{'}'}</span>
        </code>
      </pre>
    </div>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-lg bg-slate-950 px-4 py-3 font-mono text-slate-100 text-sm'>
      <span className='truncate'>
        <span className='text-primary-300'>$</span> {children}
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
      className='shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100'
      onClick={handleCopy}
      type='button'
    >
      {copied ? <CheckIcon className='size-4 text-success-400' /> : <CopyIcon className='size-4' />}
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
        <div className='grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-4'>
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
    <div className='bg-white p-6 md:p-8'>
      <div className='bg-linear-to-b from-slate-900 to-primary-600 bg-clip-text font-semibold text-4xl text-transparent tracking-tight md:text-5xl'>
        {value}
      </div>
      <div className='mt-2 font-medium text-slate-900 text-sm'>{label}</div>
      <div className='text-slate-500 text-xs'>{sub}</div>
    </div>
  )
}

function CTASection() {
  return (
    <section className='px-6 pt-16 pb-24 md:pt-24 md:pb-32'>
      <Container>
        <div className='relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-white via-primary-50/60 to-info-50/40 p-10 md:p-16'>
          <div
            aria-hidden='true'
            className='absolute top-0 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl'
          />
          <div className='relative grid items-end gap-8 md:grid-cols-[1fr_auto]'>
            <div>
              <span className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-3 py-1 font-medium text-primary-700 text-xs'>
                <MagicStick3 className='size-3.5' />
                Ready when you are
              </span>
              <h2 className='mt-4 max-w-2xl text-balance font-semibold text-3xl text-slate-900 tracking-tight md:text-5xl'>
                Stop reinventing the same primitives.
                <br />
                <span className='bg-linear-to-r from-primary-600 to-info-500 bg-clip-text text-transparent'>
                  Start shipping product.
                </span>
              </h2>
              <p className='mt-4 max-w-xl text-slate-600 md:text-lg'>
                Open source. MIT licensed. Built in the open by{' '}
                <a
                  className='link link-primary'
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
                className='btn btn-light btn-xl rounded-full px-6'
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
    <footer className='border-slate-200 border-t bg-white'>
      <Container className='flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center'>
        <div className='flex items-center gap-3'>
          <img alt='Polyms' className='size-7' src='/favicon.png' />
          <div>
            <div className='font-semibold text-slate-900'>Polyms Core UI</div>
            <div className='text-slate-500 text-xs'>© 2026 Polyms. MIT Licensed.</div>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 text-sm'>
          <Link className='link link-light' to='/design-system'>
            Components
          </Link>
          <Link className='link link-light' to='/typography'>
            Typography
          </Link>
          <a
            className='link link-light'
            href='https://github.com/polyms/core-ui'
            rel='noopener noreferrer'
            target='_blank'
          >
            GitHub
          </a>
          <a className='link link-light' href='https://polyms.dev' rel='noopener noreferrer' target='_blank'>
            polyms.dev
          </a>
        </div>
      </Container>
    </footer>
  )
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className='mx-auto max-w-2xl text-center'>
      <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary-700 text-xs'>
        {eyebrow}
      </div>
      <h2 className='mt-4 text-balance font-semibold text-3xl text-slate-900 tracking-tight md:text-4xl'>
        {title}
      </h2>
      <p className='mt-3 text-balance text-slate-600 md:text-lg'>{subtitle}</p>
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

type FeatureTone = 'primary' | 'success' | 'info' | 'warning' | 'danger'

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
