import {
  ArrowRight,
  Book,
  Book2,
  Box,
  Buildings,
  Calendar,
  ChefHat,
  Compass,
  Document2,
  Global,
  GraphNewUp,
  Health,
  type IconProps,
  Leaf,
  Login3,
  MagicStick,
  MagicStick2,
  Pulse,
  Rocket,
  ShieldStar,
  SmartSpeaker,
  Star,
  UsersGroupTwoRounded,
  Widget5,
} from '@polyms/icons/bold-duotone'
import { NavigationMenu } from '@polyms/ui-kit'
import clsx from 'clsx'
import type { ComponentType } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ColumnEntry = {
  title: string
  description: string
  icon: ComponentType<IconProps>
  href: string
  badge?: string
}

type Column = {
  label: string
  items: ColumnEntry[]
}

type ResourceEntry = {
  title: string
  description: string
  icon: ComponentType<IconProps>
  href: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const platformColumns: Column[] = [
  {
    label: 'Products',
    items: [
      {
        title: 'Launchpad',
        description: 'Ship features faster',
        icon: Rocket,
        href: '#launchpad',
      },
      {
        title: 'Analytics',
        description: 'Realtime product metrics',
        icon: GraphNewUp,
        href: '#analytics',
      },
      {
        title: 'Composer',
        description: 'Drag-and-drop builder',
        icon: Box,
        href: '#composer',
      },
      {
        title: 'Workflows',
        description: 'Automate the boring parts',
        icon: Widget5,
        href: '#workflows',
        badge: 'Beta',
      },
    ],
  },
  {
    label: 'Solutions',
    items: [
      {
        title: 'For startups',
        description: 'Go from zero to scale',
        icon: MagicStick2,
        href: '#startups',
      },
      {
        title: 'For agencies',
        description: 'White-label kits',
        icon: Buildings,
        href: '#agencies',
      },
      {
        title: 'For enterprise',
        description: 'SSO, audit logs, SLA',
        icon: ShieldStar,
        href: '#enterprise',
      },
      {
        title: 'Open source',
        description: 'Self-host & contribute',
        icon: Global,
        href: '#oss',
      },
    ],
  },
]

const customerStats = [
  { label: 'Teams shipping', value: '12k+' },
  { label: 'Avg setup time', value: '< 5m' },
  { label: 'Uptime SLA', value: '99.99%' },
]

const customerLinks: ResourceEntry[] = [
  {
    title: 'Customer stories',
    description: 'How teams ship 4× faster with Polyms.',
    icon: SmartSpeaker,
    href: '#stories',
  },
  {
    title: 'Showcase gallery',
    description: 'Real apps built on Polyms UI Kit.',
    icon: Compass,
    href: '#showcase',
  },
  {
    title: 'Community',
    description: 'Connect with builders shipping today.',
    icon: UsersGroupTwoRounded,
    href: '#community',
  },
]

const blogEntries: ResourceEntry[] = [
  {
    title: 'Knowledge & Experience',
    description: 'Organic farming insights and sustainable cultivation tips.',
    icon: Book2,
    href: '#blog-knowledge',
  },
  {
    title: 'Daily Delicious Recipes',
    description: 'Tasty, nutritious recipes that are easy to make every day.',
    icon: ChefHat,
    href: '#blog-recipes',
  },
  {
    title: 'Health & Nutrition',
    description: 'Tips for healthy living, nutrition and natural beauty.',
    icon: Health,
    href: '#blog-health',
  },
  {
    title: 'Events',
    description: 'Fairs, workshops and events from Sophie Farm Organic.',
    icon: Calendar,
    href: '#blog-events',
  },
]

const resources: ResourceEntry[] = [
  {
    title: 'Documentation',
    description: 'Step-by-step guides',
    icon: Book,
    href: '#docs',
  },
  {
    title: 'Status page',
    description: 'Realtime platform health',
    icon: Pulse,
    href: '#status',
  },
  {
    title: 'Changelog',
    description: 'What shipped this week',
    icon: GraphNewUp,
    href: '#changelog',
  },
]

export default function NavigationMenuDefault() {
  return (
    <div className='m-auto flex w-full max-w-3xl justify-center p-6'>
      <NavigationMenu>
        <NavigationMenu.List className='list-none'>
          <NavigationMenu.Item value='platform'>
            <NavigationMenu.Trigger>
              Platform
              <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div className='flex w-2xl flex-col gap-3'>
                <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3'>
                  <NavigationMenu.Link
                    className='group relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl p-4 text-white'
                    href='#cloud'
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, var(--color-primary-700), color-mix(in oklab, var(--color-primary-700) 60%, black))',
                    }}
                  >
                    <span
                      aria-hidden='true'
                      className='pointer-events-none absolute -top-6 -right-6 size-28 rounded-full opacity-40 blur-2xl'
                      style={{
                        background:
                          'radial-gradient(circle, color-mix(in oklab, white 50%, transparent), transparent 70%)',
                      }}
                    />
                    <span className='flex items-center gap-2'>
                      <span className='badge badge-light inline-flex items-center gap-1 rounded-full text-[10px] uppercase tracking-wider'>
                        <MagicStick2 size={11} />
                        New
                      </span>
                      <span className='text-white/80 text-xs'>v2.0</span>
                    </span>
                    <span className='flex flex-col gap-1.5'>
                      <MagicStick size={28} />
                      <span className='font-semibold text-base text-white'>Polyms Cloud 2.0</span>
                      <span className='text-sm text-white/80 leading-snug'>
                        AI-native primitives, zero-config edge.
                      </span>
                    </span>
                    <span className='inline-flex items-center gap-1 font-medium text-sm text-white/90 transition-transform group-hover:translate-x-0.5'>
                      Read the launch
                      <ArrowRight size={14} />
                    </span>
                  </NavigationMenu.Link>

                  {platformColumns.map(column => (
                    <div className='flex min-w-0 flex-col gap-1' key={column.label}>
                      <NavigationMenu.GroupLabel>{column.label}</NavigationMenu.GroupLabel>
                      <ul className='m-0 flex list-none flex-col gap-0.5 p-0'>
                        {column.items.map(item => (
                          <li key={item.href}>
                            <NavigationMenu.Link className='flex items-start gap-2.5' href={item.href}>
                              <item.icon className='mt-0.5 shrink-0 text-primary' size={16} />
                              <span className='flex min-w-0 flex-col gap-0.5'>
                                <span className='flex items-center gap-1.5 font-medium text-sm'>
                                  {item.title}
                                  {item.badge && (
                                    <span className='badge badge-primary rounded-full text-[10px]'>
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                <span className='truncate text-muted text-xs'>{item.description}</span>
                              </span>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <NavigationMenu.Footer>
                  <span className='flex items-center gap-2 text-muted text-xs'>
                    <Star className='text-primary' size={14} />
                    <strong className='font-semibold text-fg'>Postgres branching</strong>
                    is now in general availability.
                  </span>
                  <a className='link link-primary inline-flex items-center gap-1 text-xs' href='#changelog'>
                    Read changelog
                    <ArrowRight size={12} />
                  </a>
                </NavigationMenu.Footer>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value='customers'>
            <NavigationMenu.Trigger>
              Customers
              <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div className='grid w-136 grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3'>
                <div className='flex flex-col gap-3 rounded-xl border border-line bg-surface p-4'>
                  <div className='flex items-center gap-2'>
                    <Star className='text-warning' size={14} />
                    <Star className='text-warning' size={14} />
                    <Star className='text-warning' size={14} />
                    <Star className='text-warning' size={14} />
                    <Star className='text-warning' size={14} />
                  </div>
                  <blockquote className='m-0 text-fg text-sm italic leading-snug'>
                    "We replaced four internal tools with Polyms in a single sprint."
                  </blockquote>
                  <div className='flex items-center gap-2'>
                    <span className='flex size-8 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs'>
                      LD
                    </span>
                    <span className='flex flex-col gap-0.5'>
                      <span className='font-medium text-fg text-xs'>Linh Đoàn</span>
                      <span className='text-[11px] text-muted'>Head of Eng · Sophie Farm</span>
                    </span>
                  </div>
                  <dl className='m-0 grid grid-cols-3 gap-2 border-line border-t pt-3'>
                    {customerStats.map(stat => (
                      <div className='flex flex-col gap-0.5' key={stat.label}>
                        <dt className='text-[10px] text-muted uppercase tracking-wider'>{stat.label}</dt>
                        <dd className='m-0 font-semibold text-primary text-sm'>{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <ul className='m-0 flex list-none flex-col gap-1 p-0'>
                  {customerLinks.map(item => (
                    <li key={item.href}>
                      <NavigationMenu.Link className='flex items-start gap-3' href={item.href} variant='soft'>
                        <item.icon className='mt-0.5 shrink-0 text-primary' size={18} />
                        <span className='flex min-w-0 flex-col gap-0.5'>
                          <span className='font-medium text-sm'>{item.title}</span>
                          <span className='text-muted text-xs'>{item.description}</span>
                        </span>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value='resources'>
            <NavigationMenu.Trigger>
              Resources
              <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div className='flex w-72 flex-col gap-0.5'>
                <ul className='m-0 flex list-none flex-col gap-0.5 p-0'>
                  {resources.map(item => (
                    <li key={item.href}>
                      <NavigationMenu.Link className='flex items-start gap-3' href={item.href}>
                        <item.icon className='mt-0.5 shrink-0 text-primary' size={16} />
                        <span className='flex min-w-0 flex-col gap-0.5'>
                          <span className='font-medium text-sm'>{item.title}</span>
                          <span className='text-muted text-xs'>{item.description}</span>
                        </span>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
                <NavigationMenu.Separator />
                <NavigationMenu.Link
                  className='flex items-center gap-2'
                  href='#revoke-access'
                  variant='danger'
                >
                  <ShieldStar size={16} />
                  Revoke access
                </NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value='blog'>
            <NavigationMenu.Trigger>
              Blog
              <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className='w-2xl'>
              <span className='relative flex items-center gap-3 py-2 ps-4'>
                <SectionIcon icon={Document2} />
                <span className='font-semibold text-base text-primary'>Blogs</span>
              </span>

              <ul className='m-0 grid list-none grid-cols-2 items-stretch gap-3 p-2'>
                {blogEntries.map(item => (
                  <li key={item.href}>
                    <NavigationMenu.Link
                      className='group grid h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2'
                      href={item.href}
                      variant='soft'
                    >
                      <item.icon className='text-primary' size={18} />
                      <span className='font-semibold text-sm'>{item.title}</span>
                      <span className='col-span-2 text-muted text-xs leading-snug'>{item.description}</span>
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              Pricing
              <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className='p-0'>
              <NavigationMenu.Link
                className='group/panel flex w-80 gap-4 rounded-xl p-5 outline-none'
                href='#pricing'
              >
                {/* Icon column */}
                <div className='relative shrink-0 overflow-hidden rounded-xl bg-primary-700/8 p-3 ring-1 ring-primary-700/15'>
                  <Leaf className='relative z-10 text-primary' size={28} />
                  <span
                    aria-hidden
                    className='pointer-events-none absolute -inset-e-2 -bottom-4 text-primary-700/15'
                  >
                    <Leaf size={52} />
                  </span>
                </div>

                {/* Text column */}
                <div className='flex min-w-0 flex-col gap-2'>
                  <p className='font-extrabold text-base text-primary leading-tight'>Pricing</p>
                  <p className='line-clamp-3 text-muted text-xs leading-relaxed'>
                    Choose the plan that fits your team — start free, scale with usage-based add-ons, and
                    unlock SSO, audit logs, and priority support as you grow.
                  </p>
                  <span className='mt-auto inline-flex items-center gap-1 font-semibold text-primary text-xs'>
                    Explore more
                    <ArrowRight
                      className='transition-transform duration-200 group-hover/panel:translate-x-0.5'
                      size={12}
                    />
                  </span>
                </div>
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className='inline-flex items-center gap-1.5' href='#login' variant='trigger'>
              <Login3 size={14} />
              Login
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu>
    </div>
  )
}

function SectionIcon({ icon: IconComponent }: { icon: ComponentType<IconProps> }) {
  return (
    <span className={clsx('relative inline-flex h-9 w-9 shrink-0 items-center justify-center')}>
      <span
        aria-hidden
        className='pointer-events-none absolute -right-1 h-full w-44 rounded-e-full bg-primary-700/10 ring-1 ring-primary-700/15'
      />
      <IconComponent className='relative z-10 text-primary-700' size={25} />
    </span>
  )
}
