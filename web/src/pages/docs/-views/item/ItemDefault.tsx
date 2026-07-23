import {
  Album02Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Settings02Icon,
  StarIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { Icon } from '../../../../components/Icons'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ItemVariant = {
  cls: string
  icon: typeof StarIcon
  label: string
  name: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const variants: ItemVariant[] = [
  { cls: 'item-primary', icon: StarIcon, label: 'Primary', name: 'item-primary' },
  { cls: 'item-success', icon: CheckmarkCircle02Icon, label: 'Success', name: 'item-success' },
  { cls: 'item-info', icon: InformationCircleIcon, label: 'Info', name: 'item-info' },
  { cls: 'item-warning', icon: Alert02Icon, label: 'Warning', name: 'item-warning' },
  { cls: 'item-danger', icon: Alert02Icon, label: 'Danger', name: 'item-danger' },
  { cls: 'item-light', icon: UserIcon, label: 'Light', name: 'item-light' },
  { cls: 'item-dark', icon: Settings02Icon, label: 'Dark', name: 'item-dark' },
]

export default function ItemDefault() {
  return (
    <div className='mx-auto w-full max-w-3xl px-4'>
      <p className='mb-4 text-muted text-sm'>
        Ghost interactive rows — transparent idle, tinted on <code className='text-fg'>:hover</code> /{' '}
        <code className='text-fg'>:active</code> / <code className='text-fg'>.active</code>. Hover the rows
        below; the last column shows the persisted <code className='text-fg'>.active</code> state.
      </p>

      <div className='grid gap-x-8 gap-y-1 rounded-xl border border-line bg-body p-3 sm:grid-cols-[1fr_1fr]'>
        <div className='hidden px-3 pb-1 font-semibold text-muted text-xs uppercase tracking-wide sm:block'>
          Idle / hover
        </div>
        <div className='hidden px-3 pb-1 font-semibold text-muted text-xs uppercase tracking-wide sm:block'>
          Active
        </div>

        {variants.map(v => (
          <div className='contents' key={v.name}>
            <button
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors ${v.cls}`}
              type='button'
            >
              <Icon className='size-4 shrink-0' icon={v.icon} />
              <span className='flex-1'>{v.label}</span>
              <code className='font-mono text-xs opacity-70'>.{v.name}</code>
            </button>

            <button
              className={`active flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors ${v.cls}`}
              type='button'
            >
              <Icon className='size-4 shrink-0' icon={v.icon} />
              <span className='flex-1'>{v.label}</span>
              <code className='font-mono text-xs opacity-70'>.active</code>
            </button>
          </div>
        ))}
      </div>

      <p className='mt-6 mb-2 font-semibold text-fg text-sm'>As a vertical nav list</p>
      <nav className='flex max-w-xs flex-col gap-px rounded-xl border border-line bg-body p-2'>
        <button
          className='active item-primary flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors'
          type='button'
        >
          <Icon className='size-4' icon={Album02Icon} />
          Dashboard
        </button>
        <button
          className='item-light flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors'
          type='button'
        >
          <Icon className='size-4' icon={UserIcon} />
          Profile
        </button>
        <button
          className='item-light flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors'
          type='button'
        >
          <Icon className='size-4' icon={Settings02Icon} />
          Settings
        </button>
        <button
          className='item-danger flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors'
          type='button'
        >
          <Icon className='size-4' icon={Alert02Icon} />
          Delete account
        </button>
      </nav>
    </div>
  )
}
