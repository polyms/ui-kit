import { Button } from '@polyms/core'
import { ChartSquare, Code2, Layers, MagicStick3 } from '@solar-icons/react-perf/BoldDuotone'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import type { ComponentType } from 'react'

import { Header } from './-views/DemoHeader'

export const Route = createFileRoute('/demo')({
  component: Page,
})

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type DemoFeature = {
  description: string
  icon: ComponentType<{ className?: string }>
  title: string
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
      'Balance cards, virtual card visuals, recipient avatars and CSS bar charts — all rendered with @polyms/core tokens and the slate scale.',
    icon: ChartSquare,
    title: 'Data-driven content',
  },
]

function Page() {
  return (
    <div className='playground-page flex min-h-0 min-w-0 flex-1 flex-col'>
      <Header />

      <div className='docs-demo-shell relative isolate flex-1 overflow-x-clip bg-body text-fg'>
        <div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div
            className='mask-[linear-gradient(to_bottom,black_55%,transparent)] absolute inset-x-0 top-0 h-144 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]'
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                '<svg width="42" height="44" viewBox="0 0 42 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#94a3b8" fill-opacity="0.06"><path d="M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z"/></g></g></svg>'
              )}")`,
            }}
          />
          <div className='absolute -top-24 left-1/2 h-112 w-[min(100%,56rem)] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
          <div className='absolute top-48 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute top-80 -left-16 h-64 w-64 rounded-full bg-slate-300/40 blur-3xl dark:bg-slate-700/30' />
        </div>

        <main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
          <section className='mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20'>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 font-medium text-slate-600 text-xs shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm dark:border-line dark:bg-surface/80 dark:text-muted dark:ring-line/40'>
              <span className='flex size-1.5 rounded-full bg-success-500 shadow-[0_0_0_3px_var(--color-success-100)]' />
              Playground
            </div>

            <h1 className='mt-6 max-w-3xl font-semibold text-3xl text-fg tracking-tight md:text-4xl lg:text-5xl'>
              A fintech-style shell, powered by Core UI
            </h1>
            <p className='mt-4 max-w-3xl text-pretty text-base text-muted leading-relaxed md:text-lg'>
              Sticky header with a real{' '}
              <span className='font-semibold text-slate-800 dark:text-fg'>mega menu</span>, global search and
              an auth flow — composed entirely from{' '}
              <code className='rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800 text-sm dark:bg-surface dark:text-fg'>
                @polyms/core
              </code>{' '}
              primitives.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link
                className='btn btn-primary btn-md rounded-full px-5 shadow-primary/20 shadow-sm'
                to='/design-system'
              >
                Open Design system
              </Link>
              <Button
                outlined
                render={
                  <a href='https://github.com/polyms/core-ui' rel='noopener noreferrer' target='_blank'>
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
                    'group flex flex-col rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm',
                    'ring-1 ring-slate-100/80 transition-shadow duration-200',
                    'hover:shadow-md hover:shadow-slate-200/60 dark:border-line dark:bg-surface/80 dark:ring-line/40',
                    'dark:hover:shadow-black/20'
                  )}
                  key={title}
                >
                  <div className='flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary-700 transition-colors group-hover:bg-primary/15 dark:bg-primary/20 dark:text-primary-300 dark:group-hover:bg-primary/25'>
                    <Icon className='size-6' />
                  </div>
                  <h2 className='mt-4 font-semibold text-fg text-lg tracking-tight'>{title}</h2>
                  <p className='mt-2 flex-1 text-pretty text-muted text-sm leading-relaxed'>{description}</p>
                </article>
              ))}
            </div>

            <div className='mt-10 flex flex-col gap-6 rounded-2xl border border-slate-200/90 bg-linear-to-br from-white via-white to-slate-50/90 p-6 shadow-sm ring-1 ring-slate-100/80 md:flex-row md:items-start md:gap-8 md:p-8 dark:border-line dark:from-surface dark:via-surface dark:to-surface/80 dark:ring-line/40'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-primary dark:text-primary-50'>
                <Code2 className='size-7' />
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='badge badge-success badge-lg rounded-full font-semibold'>Tip</span>
                  <span className='font-medium text-muted text-sm'>Content layout</span>
                </div>
                <p className='mt-3 text-pretty text-slate-600 leading-relaxed dark:text-muted'>
                  The main content should be in a region with a{' '}
                  <code className='rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800 text-xs dark:bg-surface dark:text-fg'>
                    max-width
                  </code>{' '}
                  reasonable width (here using{' '}
                  <code className='rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800 text-xs dark:bg-surface dark:text-fg'>
                    max-w-5xl
                  </code>
                  ) to keep lines from getting too long on wide screens, while keeping the hero and card grid
                  centered with consistent horizontal padding.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
