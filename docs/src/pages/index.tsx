/** biome-ignore-all lint/style/useNamingConvention: Icon component prop */

import {
  Accessibility,
  Buildings,
  Code2,
  DiagramUp,
  GamepadOld,
  MagicStick3,
  MonitorSmartphone,
  Rocket,
  RulerCrossPen,
  SpedometerMax,
  Structure,
  Widget5,
} from '@solar-icons/react-perf/BoldDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  staticData: {
    layout: 'landing',
  },
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type IconProps = { className?: string }

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

function WindowIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <rect
        fill='currentColor'
        height='18'
        opacity='0.2'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
        width='18'
        x='3'
        y='3'
      />
      <path d='M3 9H21' stroke='currentColor' strokeWidth='1.5' />
      <circle cx='6.5' cy='6' fill='currentColor' r='0.5' />
      <circle cx='8.5' cy='6' fill='currentColor' r='0.5' />
    </svg>
  )
}

function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z'
        fill='currentColor'
        opacity='0.2'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

function BookmarkIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3H14C16.8284 3 18.2426 3 19.1213 3.87868C20 4.75736 20 6.17157 20 9V20.5C20 21.3284 19.3284 22 18.5 22C18.2373 22 17.9823 21.9115 17.7782 21.7488L12 17L6.22183 21.7488C6.01768 21.9115 5.76271 22 5.5 22C4.67157 22 4 21.3284 4 20.5V9Z'
        fill='currentColor'
        opacity='0.2'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

function RecordIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='12'
        cy='12'
        fill='currentColor'
        opacity='0.2'
        r='10'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle cx='12' cy='12' fill='currentColor' r='4' />
    </svg>
  )
}

function TabsIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <rect
        fill='currentColor'
        height='18'
        opacity='0.2'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
        width='18'
        x='3'
        y='3'
      />
      <path d='M3 9H21' stroke='currentColor' strokeWidth='1.5' />
      <path d='M7.5 6H9.5' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
      <path d='M12 6H14' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
    </svg>
  )
}

function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 7H20' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
      <path d='M4 12H20' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
      <path d='M4 17H20' stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' />
    </svg>
  )
}

function RouteComponent() {
  return (
    <main className='landing'>
      {/* Animated background */}
      <div className='pointer-events-none fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10' />
        <AnimatedOrbs />
      </div>

      <div className='relative z-10'>
        {/* Hero Section */}
        <HeroSection />

        {/* Features */}
        <FeaturesSection />

        {/* Quick Start */}
        <QuickStartSection />

        {/* Code Example */}
        <CodeExampleSection />

        {/* Use Cases */}
        <UseCasesSection />

        {/* Performance */}
        <PerformanceSection />

        {/* Component Showcase */}
        <ComponentShowcaseSection />

        {/* CTA */}
        <CTASection />

        {/* Footer */}
        <FooterSection />
      </div>
    </main>
  )
}

function AnimatedOrbs() {
  return (
    <>
      <div className='absolute -top-96 -left-96 h-96 w-96 animate-pulse rounded-full bg-linear-to-br from-blue-400/20 to-transparent blur-3xl dark:from-blue-500/30' />
      <div className='absolute -right-96 -bottom-96 h-96 w-96 animate-pulse rounded-full bg-linear-to-tl from-purple-400/20 to-transparent blur-3xl dark:from-purple-500/30' />
      <div className='absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-linear-to-r from-blue-400/10 to-purple-400/10 blur-3xl dark:from-blue-500/20 dark:to-purple-500/20' />
    </>
  )
}

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className='relative overflow-hidden px-6 py-24 md:py-40'
      ref={sectionRef}
      style={{
        backgroundPosition: `${mousePosition.x * 0.05}px ${mousePosition.y * 0.05}px`,
      }}
    >
      {/* Glow effect on mouse position */}
      <div
        className='pointer-events-none absolute h-96 w-96 rounded-full bg-linear-to-r from-blue-400/10 to-purple-400/10 blur-3xl transition-opacity duration-300'
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      <div className='container relative mx-auto'>
        <div className='mx-auto max-w-3xl text-center'>
          {/* Badge with animation */}
          <div className='mb-6 inline-block'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-0 blur-lg transition-opacity duration-500 hover:opacity-100' />
              <div className='relative rounded-full border border-blue-200 bg-linear-to-r from-blue-50 to-purple-50 px-4 py-2 font-medium text-blue-700 text-sm dark:border-blue-900 dark:bg-linear-to-r dark:from-blue-950 dark:to-purple-950 dark:text-blue-300'>
                ✨ Enterprise-grade UI components
              </div>
            </div>
          </div>

          {/* Animated heading */}
          <h1 className='mb-6 font-bold text-5xl leading-tight tracking-tight md:text-7xl'>
            <span className='block bg-linear-to-b from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent transition-all duration-500 hover:from-blue-600 hover:via-purple-600 hover:to-blue-600 dark:from-white dark:via-slate-300 dark:to-white dark:hover:from-blue-400 dark:hover:via-purple-400 dark:hover:to-blue-400'>
              Production-Ready
            </span>
            <span className='block animate-pulse bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'>
              Design System
            </span>
          </h1>

          <p className='mb-10 text-slate-600 text-xl leading-tight md:text-2xl dark:text-slate-400'>
            Enterprise-grade React components built with TypeScript, accessibility in mind, and zero
            compromises on performance. Trusted by teams building at scale.
          </p>

          <div className='flex flex-wrap items-center justify-center gap-4'>
            <GlowingButton className='btn btn-primary btn-lg' to='/design-system'>
              Get Started →
            </GlowingButton>
            <a
              className='btn btn-secondary btn-lg border-2 border-slate-300 bg-white transition-all duration-300 hover:border-blue-500 hover:bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400 dark:hover:bg-slate-800'
              href='https://github.com/polyms/core-ui'
              rel='noopener noreferrer'
              target='_blank'
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function GlowingButton({
  to,
  children,
  className,
}: {
  to: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className='relative'>
      <div className='absolute inset-0 rounded-lg bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 blur-lg transition-all duration-500 hover:opacity-75' />
      <Link className={`${className} relative transition-all duration-300 hover:shadow-2xl`} to={to}>
        {children}
      </Link>
    </div>
  )
}

function FeaturesSection() {
  const features = [
    {
      Icon: MagicStick3,
      title: 'LLM-Ready Support',
      description:
        'Built with AI workflows in mind. Includes prompt files and structured outputs for LLM integration',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'from-blue-100 to-cyan-100 border-blue-500 dark:from-blue-900/30 dark:to-cyan-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      Icon: Widget5,
      title: 'Component Library',
      description: 'Includes polished UI elements like modals, popovers, tabs, and form controls',
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'from-purple-100 to-pink-100 border-purple-500 dark:from-purple-900/30 dark:to-pink-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      Icon: SpedometerMax,
      title: 'Design-Ready UI',
      description: 'Speed up design flow with pre-built, accessible components ready to ship',
      gradient: 'from-orange-500/10 to-amber-500/10',
      iconBg: 'from-orange-50 to-orange-200 border-orange-500 dark:from-orange-900/30 dark:to-amber-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      Icon: Accessibility,
      title: 'Accessible by Default',
      description: 'WCAG 2.1 AA compliant with screen reader support and keyboard navigation built-in',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'from-emerald-100 to-teal-100 border-emerald-500 dark:from-emerald-900/30 dark:to-teal-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      Icon: Code2,
      title: 'TypeScript Support',
      description: 'Full type safety out of the box for better DX and fewer runtime errors',
      gradient: 'from-violet-500/10 to-purple-500/10',
      iconBg: 'from-violet-100 to-purple-100 border-violet-500 dark:from-violet-900/30 dark:to-purple-900/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      Icon: Rocket,
      title: 'Quick Start Setup',
      description: 'Well-structured components help teams kick off projects without starting from scratch',
      gradient: 'from-rose-500/10 to-red-500/10',
      iconBg: 'from-rose-100 to-red-100 border-rose-500 dark:from-rose-900/30 dark:to-red-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      Icon: RulerCrossPen,
      title: 'Adaptive by Design',
      description: 'Built to look great on every device, with theme options that fit any brand',
      gradient: 'from-sky-500/10 to-blue-500/10',
      iconBg: 'from-sky-100 to-blue-100 border-sky-500 dark:from-sky-900/30 dark:to-blue-900/30',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      Icon: Structure,
      title: 'Flexible Structure',
      description: 'Easy to tweak, rearrange, or build on top—ideal for teams that need room to grow',
      gradient: 'from-fuchsia-500/10 to-pink-500/10',
      iconBg: 'from-fuchsia-100 to-pink-100 border-fuchsia-500 dark:from-fuchsia-900/30 dark:to-pink-900/30',
      iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    },
  ]

  return (
    <section className='relative px-6 py-24 md:py-32'>
      <div className='container mx-auto'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
            Built for Production
          </h2>
          <p className='text-lg text-slate-600 dark:text-slate-400'>
            From layouts to interactions, every detail is built to deliver clarity, speed, and seamless user
            experience
          </p>
        </div>

        <div className='mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, idx) => (
            <FeatureCard index={idx} key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  Icon,
  title,
  description,
  index,
  gradient,
  iconBg,
  iconColor,
}: {
  Icon: React.ComponentType<IconProps>
  title: string
  description: string
  index: number
  gradient: string
  iconBg: string
  iconColor: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-700 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      ref={ref}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 transition-all duration-300 group-hover:opacity-100`}
      />

      <div className='relative'>
        <div
          className={`mb-4 inline-flex items-center justify-center rounded-xl border border-dashed bg-linear-to-br ${iconBg} p-3 transition-all duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-10 w-10 ${iconColor}`} />
        </div>
        <h3 className='mb-2 font-bold text-lg text-slate-900 dark:text-white'>{title}</h3>
        <p className='text-slate-600 text-sm leading-relaxed dark:text-slate-400'>{description}</p>
      </div>
    </div>
  )
}

function CodeExampleSection() {
  return (
    <section className='relative overflow-hidden px-6 py-24 md:py-32'>
      {/* Gradient background */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute top-0 right-0 h-96 w-96 rounded-full bg-linear-to-bl from-blue-400/10 to-transparent blur-3xl' />
      </div>

      <div className='container relative mx-auto'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
              Simple & Intuitive APIs
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              Code that reads like English, no surprises
            </p>
          </div>

          <div className='overflow-hidden rounded-2xl border border-slate-200 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20 dark:border-slate-700 dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20'>
            {/* Header */}
            <div className='flex items-center gap-3 border-slate-200 border-b bg-linear-to-r from-slate-100 to-slate-50 px-6 py-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900'>
              <div className='h-3 w-3 rounded-full bg-red-500 transition-transform hover:scale-125' />
              <div className='h-3 w-3 rounded-full bg-yellow-500 transition-transform hover:scale-125' />
              <div className='h-3 w-3 rounded-full bg-green-500 transition-transform hover:scale-125' />
              <span className='ml-auto font-medium text-slate-600 text-sm dark:text-slate-400'>App.tsx</span>
            </div>

            {/* Code */}
            <div className='overflow-x-auto bg-slate-900 p-8'>
              <pre className='font-mono text-slate-100 text-sm leading-relaxed'>
                <code>{`import { Modal, Button } from '@polyms/core'

export function App() {
  return (
    <Modal>
      <Modal.Trigger className="btn btn-primary">
        Open Dialog
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Confirm Action</Modal.Header>
        <Modal.Body>
          Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Button variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComponentShowcaseSection() {
  const components = [
    { title: 'Modal', link: '/docs/modal', Icon: WindowIcon },
    { title: 'Popover', link: '/docs/popover', Icon: ChatIcon },
    { title: 'Tooltip', link: '/docs/tooltip', Icon: BookmarkIcon },
    { title: 'Button', link: '/docs/button', Icon: RecordIcon },
    { title: 'Tabs', link: '/docs/tabs', Icon: TabsIcon },
    { title: 'Select', link: '/docs/select', Icon: MenuIcon },
  ]

  return (
    <section className='bg-linear-to-b from-slate-50 to-white px-6 py-24 md:py-32 dark:from-slate-900 dark:to-slate-950'>
      <div className='container mx-auto'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
            Comprehensive Component Library
          </h2>
          <p className='mb-16 text-lg text-slate-600 dark:text-slate-400'>
            Carefully crafted components for every UI need
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {components.map((comp, idx) => (
            <ComponentShowcaseCard index={idx} key={comp.title} {...comp} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <GlowingButton className='btn btn-primary btn-lg inline-flex items-center gap-2' to='/docs'>
            Explore All Components →
          </GlowingButton>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className='relative overflow-hidden px-6 py-24 md:py-32'>
      {/* Gradient backgrounds */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-400/20 blur-3xl' />
        <div className='absolute -right-40 -bottom-40 h-80 w-80 animate-pulse rounded-full bg-purple-400/20 blur-3xl' />
      </div>

      <div className='container relative mx-auto'>
        <div className='mx-auto max-w-2xl overflow-hidden rounded-3xl border border-blue-200/50 bg-linear-to-br from-blue-50 via-purple-50 to-blue-50 p-12 text-center backdrop-blur transition-all duration-300 hover:border-blue-400/50 dark:border-blue-900/50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-blue-950/50 dark:hover:border-blue-400/50'>
          {/* Shine effect */}
          <div className='pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 hover:translate-x-full dark:via-white/5' />

          <h2 className='mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-4xl text-transparent md:text-5xl dark:from-blue-400 dark:to-purple-400'>
            Ready to Build Something Great?
          </h2>
          <p className='mb-8 text-lg text-slate-600 dark:text-slate-300'>
            Join thousands of developers building production applications with Core UI
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <GlowingButton className='btn btn-primary btn-lg' to='/docs'>
              Start Building →
            </GlowingButton>
            <a
              className='btn btn-secondary btn-lg border-2 border-slate-300 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-lg dark:border-slate-600 dark:bg-slate-900 dark:hover:border-blue-400'
              href='https://github.com/polyms/core-ui'
              rel='noopener noreferrer'
              target='_blank'
            >
              Star on GitHub ⭐
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuickStartSection() {
  const steps = [
    {
      number: '01',
      title: 'Install',
      description: 'Add Core UI to your project in seconds',
      code: 'npm install @polyms/core',
    },
    {
      number: '02',
      title: 'Import',
      description: 'Import the components you need',
      code: 'import { Button } from "@polyms/core"',
    },
    {
      number: '03',
      title: 'Use',
      description: 'Start building immediately',
      code: '<Button>Click me</Button>',
    },
    {
      number: '04',
      title: 'Deploy',
      description: 'Ship with confidence',
      code: 'npm run build && npm run deploy',
    },
  ]

  return (
    <section className='relative bg-slate-50 px-6 py-24 md:py-32 dark:bg-slate-900'>
      <div className='container mx-auto'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
            Get Started in Minutes
          </h2>
          <p className='text-lg text-slate-600 dark:text-slate-400'>Simple setup, no complexity required</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {steps.map(step => (
            <div
              className='group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400'
              key={step.number}
            >
              <div className='mb-3 inline-block rounded-lg bg-linear-to-br from-blue-100 to-purple-100 px-3 py-1 font-bold text-blue-600 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-300'>
                {step.number}
              </div>
              <h3 className='mb-2 font-bold text-lg text-slate-900 dark:text-white'>{step.title}</h3>
              <p className='mb-4 text-slate-600 text-sm dark:text-slate-400'>{step.description}</p>
              <code className='block overflow-x-auto rounded bg-slate-900 px-3 py-2 font-mono text-slate-100 text-xs dark:bg-slate-950'>
                {step.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  const usecases = [
    {
      Icon: Buildings,
      title: 'Enterprise SaaS',
      description: 'Build complex dashboards with hundreds of components. Core UI handles the heavy lifting.',
      features: ['Type-safe', 'High Performance', 'Accessible'],
    },
    {
      Icon: MonitorSmartphone,
      title: 'Admin Panels',
      description: 'Responsive design built-in. Perfect for internal tools and dashboards.',
      features: ['Responsive', 'Mobile-friendly', 'Lightweight'],
    },
    {
      Icon: GamepadOld,
      title: 'Interactive UIs',
      description: 'Animation support with Framer Motion. Create delightful user experiences.',
      features: ['Smooth Animations', 'Interactive', 'Customizable'],
    },
    {
      Icon: DiagramUp,
      title: 'Data Apps',
      description: 'Perfect for analytics and data visualization. Tables, charts, and more.',
      features: ['Scalable', 'Theme-able', 'Dark Mode'],
    },
  ]

  return (
    <section className='relative bg-linear-to-b from-blue-50 to-slate-50 px-6 py-24 md:py-32 dark:from-blue-950/20 dark:to-slate-900'>
      <div className='container mx-auto'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
            Perfect for Every Project
          </h2>
          <p className='text-lg text-slate-600 dark:text-slate-400'>
            No matter what you're building, Core UI has you covered
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {usecases.map(item => (
            <div
              className='group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400'
              key={item.title}
            >
              <div className='mb-3 inline-flex text-primary transition-transform duration-300 group-hover:scale-110'>
                <item.Icon className='h-12 w-12' />
              </div>
              <h3 className='mb-2 font-bold text-lg text-slate-900 dark:text-white'>{item.title}</h3>
              <p className='mb-4 text-slate-600 text-sm dark:text-slate-400'>{item.description}</p>
              <div className='flex flex-wrap gap-2'>
                {item.features.map(feature => (
                  <span
                    className='rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700 text-xs dark:bg-blue-900/50 dark:text-blue-300'
                    key={feature}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PerformanceSection() {
  const metrics = [
    { label: 'Bundle Size', value: '23KB', sublabel: 'gzipped' },
    { label: 'Lighthouse Score', value: '98', sublabel: 'average' },
    { label: 'Components', value: '30+', sublabel: 'production-ready' },
    { label: 'TypeScript', value: '100%', sublabel: 'covered' },
  ]

  return (
    <section className='relative px-6 py-24 md:py-32'>
      <div className='container mx-auto'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-white'>
            Performance Optimized
          </h2>
          <p className='text-lg text-slate-600 dark:text-slate-400'>
            Built for speed, accessibility, and excellent user experience
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {metrics.map(metric => (
            <div
              className='group overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-8 text-center transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-blue-400'
              key={metric.label}
            >
              <div className='mb-3 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-5xl text-transparent'>
                {metric.value}
              </div>
              <p className='mb-1 font-bold text-slate-900 dark:text-white'>{metric.label}</p>
              <p className='text-slate-600 text-sm dark:text-slate-400'>{metric.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComponentShowcaseCard({
  title,
  link,
  Icon,
  index,
}: {
  title: string
  link: string
  Icon: React.ComponentType<IconProps>
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <Link
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-6 transition-all duration-700 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      ref={ref}
      to={link}
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10' />

      {/* Border glow */}
      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div className='absolute inset-0 rounded-2xl border border-blue-400/50 blur-sm' />
      </div>

      <div className='relative'>
        <div className='mb-3 inline-flex text-primary transition-all duration-300 group-hover:scale-125'>
          <Icon className='h-12 w-12' />
        </div>
        <h3 className='font-bold text-lg text-slate-900 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary'>
          {title}
        </h3>
      </div>

      {/* Arrow indicator */}
      <div className='absolute top-1/2 right-6 -translate-y-1/2 text-2xl opacity-0 transition-all duration-300 group-hover:right-4 group-hover:opacity-100'>
        →
      </div>
    </Link>
  )
}

function FooterSection() {
  return (
    <footer className='bg-slate-50 dark:border-slate-800 dark:bg-slate-900'>
      <div className='container relative mx-auto overflow-hidden pt-16 pb-20 text-center'>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 flex select-none items-center justify-center font-black text-[clamp(3rem,20vw,12rem)] text-slate-900/5 uppercase'
        >
          Polyms
        </span>
        <p>
          Built with ❤️ by{' '}
          <a
            className='font-medium transition-colors hover:text-primary dark:hover:text-primary'
            href='https://polyms.app'
            rel='noopener noreferrer'
            target='_blank'
          >
            Polyms
          </a>
        </p>
        <p className='mt-2'>© 2026. Open source. MIT License.</p>
      </div>
    </footer>
  )
}
