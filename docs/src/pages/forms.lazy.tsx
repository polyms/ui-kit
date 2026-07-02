import {
  Calendar03Icon,
  Eraser01Icon,
  MailAtSign02Icon,
  SearchList02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Button,
  Checkbox,
  Field,
  NumberField,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  ToggleGroup,
  Toolbar,
} from '@polyms/core-ui'
import { createLazyFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { Header } from './-views/DemoHeader'

export const Route = createLazyFileRoute('/forms')({
  component: FormsPage,
})

// ── Data ───────────────────────────────────────────────────────────────────────────────────────────────────

const planItems = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]

const roleItems = [
  { label: 'All', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const statusItems = [
  { label: 'Any status', value: 'any' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
]

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

function PreviewSection({
  children,
  className,
  description,
  title,
}: {
  children: React.ReactNode
  className?: string
  description: string
  title: string
}) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100/80',
        'md:p-8 dark:border-line dark:bg-surface/80 dark:ring-line/40',
        className
      )}
    >
      <h2 className='font-semibold text-fg text-lg tracking-tight'>{title}</h2>
      <p className='mt-1 max-w-2xl text-pretty text-muted text-sm leading-relaxed'>{description}</p>
      <div className='mt-6'>{children}</div>
    </section>
  )
}

function LoginFormCase() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  return (
    <form
      className='mx-auto flex w-full max-w-sm flex-col gap-4'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <Field required>
        <Field.Label>Email</Field.Label>
        <HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
        <Field.Control
          autoComplete='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='you@company.com'
          rounded
          type='email'
          value={email}
        />
      </Field>
      <Field required>
        <Field.Label>Password</Field.Label>
        <Field.Control
          autoComplete='current-password'
          onChange={e => setPassword(e.target.value)}
          placeholder='••••••••'
          rounded
          type='password'
          value={password}
        />
        <Field.Description>At least 8 characters, with uppercase and a number.</Field.Description>
      </Field>
      <div className='flex items-center justify-between gap-3'>
        <Checkbox checked={remember} onCheckedChange={setRemember}>
          Remember me
        </Checkbox>
        <a className='link link-primary text-xs' href='#forgot'>
          Forgot password?
        </a>
      </div>
      <Button className='w-full' disabled={!email || !password} rounded type='submit' variant='primary'>
        Sign in
      </Button>
    </form>
  )
}

function FilterBarCase() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<string | null>('all')
  const [status, setStatus] = useState<string | null>('any')

  return (
    <div className='flex flex-col gap-3 lg:flex-row lg:items-end'>
      <Field className='min-w-0 flex-1'>
        <Field.Label>Search</Field.Label>
        <HugeiconsIcon className='icon-start' icon={SearchList02Icon} strokeWidth={2} />
        {query ? (
          <HugeiconsIcon
            className='icon-end origin-top rotate-180'
            icon={Eraser01Icon}
            onClick={() => setQuery('')}
            strokeWidth={2}
          />
        ) : null}
        <Field.Control
          onChange={e => setQuery(e.target.value)}
          placeholder='Name, email, or ID…'
          rounded
          value={query}
        />
      </Field>
      <Field className='w-full lg:w-44'>
        <Field.Label>Role</Field.Label>
        <Select items={roleItems} onValueChange={setRole} value={role}>
          <Select.Trigger className='w-full rounded-full' placeholder='Role'>
            {item => item?.label ?? 'Role'}
          </Select.Trigger>
          <Select.Content>
            {roleItems.map(item => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </Field>
      <Field className='w-full lg:w-48'>
        <Field.Label>Status</Field.Label>
        <Select items={statusItems} onValueChange={setStatus} value={status}>
          <Select.Trigger className='w-full rounded-full' placeholder='Status'>
            {item => item?.label ?? 'Status'}
          </Select.Trigger>
          <Select.Content>
            {statusItems.map(item => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </Field>
      <Toolbar aria-label='View mode' className='shrink-0' rounded variant='inline'>
        <ToggleGroup aria-label='Layout' className='toolbar-group' defaultValue={['list']}>
          <Toolbar.Button aria-label='Grid view' render={<Toggle />} value='grid'>
            Grid
          </Toolbar.Button>
          <Toolbar.Button aria-label='List view' render={<Toggle />} value='list'>
            List
          </Toolbar.Button>
        </ToggleGroup>
      </Toolbar>
      <div className='flex shrink-0 gap-2'>
        <Button
          onClick={() => {
            setQuery('')
            setRole('all')
            setStatus('any')
          }}
          outlined
          rounded
          type='button'
          variant='light'
        >
          Clear filters
        </Button>
        <Button rounded type='button' variant='primary'>
          Apply
        </Button>
      </div>
    </div>
  )
}

function CreateWorkspaceCase() {
  const [name, setName] = useState('Polyms Studio')
  const [slug, setSlug] = useState('polyms-studio')
  const [plan, setPlan] = useState<string | null>('pro')
  const [seats, setSeats] = useState(5)

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className='grid gap-4 sm:grid-cols-2'>
        <Field required>
          <Field.Label>Workspace name</Field.Label>
          <Field.Control
            onChange={e => setName(e.target.value)}
            placeholder='Acme Corp'
            rounded
            value={name}
          />
        </Field>
        <Field>
          <Field.Label>Slug URL</Field.Label>
          <Field.Control
            onChange={e => setSlug(e.target.value)}
            placeholder='acme-corp'
            rounded
            value={slug}
          />
          <Field.Description>Used in member invite links.</Field.Description>
        </Field>
        <Field>
          <Field.Label>Plan</Field.Label>
          <Select items={planItems} onValueChange={setPlan} value={plan}>
            <Select.Trigger className='w-full rounded-full' placeholder='Select plan'>
              {item => item?.label ?? 'Select plan'}
            </Select.Trigger>
            <Select.Content>
              {planItems.map(item => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <NumberField
          label='Seats'
          max={99}
          min={1}
          onValueChange={v => setSeats(v ?? 1)}
          rounded
          value={seats}
        />
      </div>
      <div className='flex flex-wrap items-center justify-end gap-2 border-slate-200/80 border-t pt-4 dark:border-line'>
        <Button rounded type='button'>
          Cancel
        </Button>
        <Button rounded type='submit' variant='primary'>
          Create workspace
        </Button>
      </div>
    </form>
  )
}

function ProfileSettingsCase() {
  const [displayName, setDisplayName] = useState('Tifa Lockhart')

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
      <Field className='min-w-0 flex-1' size='lg'>
        <Field.Label>Display name</Field.Label>
        <HugeiconsIcon className='icon-start' icon={UserIcon} strokeWidth={2} />
        <Field.Control
          onChange={e => setDisplayName(e.target.value)}
          placeholder='Your name'
          rounded
          value={displayName}
        />
      </Field>
      <Button rounded size='lg' type='button' variant='primary'>
        Save changes
      </Button>
    </div>
  )
}

function InlineFieldButtonCase() {
  const [invite, setInvite] = useState('')

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-stretch'>
      <Field className='min-w-0 flex-1'>
        <Field.Label>Invite by email</Field.Label>
        <HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
        <Field.Control
          onChange={e => setInvite(e.target.value)}
          placeholder='colleague@company.com'
          rounded
          type='email'
          value={invite}
        />
      </Field>
      <Button className='sm:self-end' disabled={!invite} rounded type='button' variant='primary'>
        Send invite
      </Button>
    </div>
  )
}

type SizeRowButtonSize = 'sm' | 'lg' | 'xl'

const sizeRows: { label: string; fieldSize?: Field.Props['size']; buttonSize?: SizeRowButtonSize }[] = [
  { label: 'default' },
  { label: 'sm', fieldSize: 'sm', buttonSize: 'sm' },
  { label: 'lg', fieldSize: 'lg', buttonSize: 'lg' },
  { label: 'xl', fieldSize: 'xl', buttonSize: 'xl' },
]

function SizeAlignmentCase() {
  return (
    <div className='overflow-x-auto'>
      <table className='table-borderless table w-full min-w-xl text-left align-middle text-sm'>
        <thead>
          <tr className='text-muted'>
            <th className='w-24 pb-3 font-medium'>Size</th>
            <th className='pb-3 font-medium'>Field + Button (pill)</th>
            <th className='pb-3 font-medium'>Field + Button (default corners)</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 dark:divide-line'>
          {sizeRows.map(({ label, fieldSize, buttonSize }) => (
            <tr key={label}>
              <td className='py-4 font-mono text-muted text-xs'>{label}</td>
              <td className='py-4 pe-4'>
                <div className='flex max-w-md flex-wrap items-center gap-2'>
                  <Field className='min-w-0 flex-1' size={fieldSize}>
                    <Field.Control placeholder={`field-${label}`} rounded />
                  </Field>
                  <Button rounded size={buttonSize} variant='primary'>
                    Action
                  </Button>
                </div>
              </td>
              <td className='py-4'>
                <div className='flex max-w-md flex-wrap items-center gap-2'>
                  <Field className='min-w-0 flex-1' size={fieldSize}>
                    <Field.Control placeholder={`field-${label}`} />
                  </Field>
                  <Button size={buttonSize} variant='primary'>
                    Action
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const notificationItems = [
  { id: 'product', label: 'Product updates', desc: 'New features, launches, and patches.' },
  { id: 'security', label: 'Security alerts', desc: 'Unusual sign-ins, password changes.' },
  { id: 'billing', label: 'Billing & payments', desc: 'Monthly statements, expiring cards.' },
] as const

function NotificationPreferencesCase() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    product: true,
    security: true,
    billing: false,
  })

  const allChecked = useMemo(() => notificationItems.every(i => checked[i.id]), [checked])
  const noneChecked = useMemo(() => notificationItems.every(i => !checked[i.id]), [checked])
  return (
    <div className='mx-auto flex w-full max-w-lg flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-5'>
      <Checkbox
        checked={allChecked}
        className='border-slate-100 border-b pb-3'
        indeterminate={!allChecked && !noneChecked}
        onCheckedChange={next => setChecked(Object.fromEntries(notificationItems.map(i => [i.id, next])))}
        size='lg'
      >
        <span className='font-semibold'>All notifications</span>
      </Checkbox>
      <div className='flex flex-col gap-2 ps-7'>
        {notificationItems.map(i => (
          <Checkbox
            checked={!!checked[i.id]}
            key={i.id}
            onCheckedChange={next => setChecked(prev => ({ ...prev, [i.id]: next }))}
          >
            <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
              <span>{i.label}</span>
              <span className='font-normal text-muted text-xs'>{i.desc}</span>
            </span>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}

const planCardOptions = [
  { id: 'free', name: 'Free', price: '$0', desc: '1 project · personal.' },
  { id: 'pro', name: 'Pro', price: '$19', desc: 'Small team · unlimited projects.' },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'SSO · audit log · SLA.' },
]

function PlanRadioCardsCase() {
  const [selected, setSelected] = useState('pro')

  return (
    <Field>
      <Field.Label>Choose billing plan</Field.Label>
      <RadioGroup className='mt-1 grid gap-3 sm:grid-cols-3' onValueChange={setSelected} value={selected}>
        {planCardOptions.map(plan => (
          <Radio
            className={clsx(
              'radio cursor-pointer rounded-xl border bg-white p-4 transition',
              'hover:border-primary-600/60',
              'data-checked:border-primary-600 data-checked:bg-primary-50/40',
              'data-checked:ring-3 data-checked:ring-primary-600/15',
              selected === plan.id ? 'border-primary-600' : 'border-slate-200'
            )}
            key={plan.id}
            value={plan.id}
          >
            <span className='flex min-w-0 flex-1 flex-col gap-1'>
              <span className='flex items-baseline justify-between gap-2'>
                <span className='font-semibold'>{plan.name}</span>
                <span className='font-semibold tabular-nums'>{plan.price}</span>
              </span>
              <span className='font-normal text-muted text-xs leading-snug'>{plan.desc}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
      <Field.Description>You can upgrade or change plans at any time.</Field.Description>
    </Field>
  )
}

const checkVariants: { variant: '' | 'success' | 'info' | 'warning' | 'danger'; label: string }[] = [
  { variant: '', label: 'primary' },
  { variant: 'success', label: 'success' },
  { variant: 'info', label: 'info' },
  { variant: 'warning', label: 'warning' },
  { variant: 'danger', label: 'danger' },
]

const checkSizes: { size: 'sm' | '' | 'lg' | 'xl'; label: string }[] = [
  { size: 'sm', label: 'sm' },
  { size: '', label: 'default' },
  { size: 'lg', label: 'lg' },
  { size: 'xl', label: 'xl' },
]

function CheckRadioGalleryCase() {
  const [variantChoice, setVariantChoice] = useState('primary')

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>Sizes</span>
        <div className='flex flex-wrap items-end gap-x-6 gap-y-3'>
          {checkSizes.map(({ size, label }) => (
            <Checkbox defaultChecked key={`cb-${label}`} size={size || undefined}>
              {label}
            </Checkbox>
          ))}
          <span aria-hidden className='h-6 w-px self-center bg-slate-200' />
          {checkSizes.map(({ size, label }) => (
            <RadioGroup defaultValue='default' key={`rd-group-${label}`} name={`gallery-size-${label}`}>
              <Radio size={size || undefined} value={label}>
                {label}
              </Radio>
            </RadioGroup>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>Variants</span>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
          {checkVariants.map(({ variant, label }) => (
            <Checkbox defaultChecked key={`vcb-${label}`} variant={variant || undefined}>
              {label}
            </Checkbox>
          ))}
        </div>
        <RadioGroup
          className='check-group check-group-inline'
          name='gallery-variant'
          onValueChange={setVariantChoice}
          orientation='horizontal'
          value={variantChoice}
        >
          {checkVariants.map(({ variant, label }) => (
            <Radio key={`vrd-${label}`} value={label} variant={variant || undefined}>
              {label}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='font-medium text-muted text-xs uppercase tracking-wider'>States</span>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox defaultChecked disabled>
            Disabled · checked
          </Checkbox>
          <Field className='inline-flex w-auto' invalid>
            <Checkbox>Field invalid</Checkbox>
          </Field>
        </div>
      </div>
    </div>
  )
}

function ModalFooterCase() {
  const [date, setDate] = useState('')

  return (
    <div className='mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-100 dark:border-line dark:bg-surface dark:ring-line/40'>
      <h3 className='font-semibold text-base text-fg'>Schedule publish</h3>
      <p className='mt-1 text-muted text-sm'>Modal footer: field and buttons on one row, bottom-aligned.</p>
      <Field className='mt-5'>
        <Field.Label>Date & time</Field.Label>
        <HugeiconsIcon className='icon-start' icon={Calendar03Icon} strokeWidth={2} />
        <Field.Control
          onChange={e => setDate(e.target.value)}
          placeholder='Pick a date…'
          rounded
          type='datetime-local'
          value={date}
        />
      </Field>
      <div className='mt-6 flex flex-wrap justify-end gap-2'>
        <Button rounded type='button'>
          Cancel
        </Button>
        <Button disabled={!date} rounded type='button' variant='primary'>
          Confirm
        </Button>
      </div>
    </div>
  )
}

function FormsPage() {
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
          <div className='absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute top-64 right-0 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-700/30' />
        </div>

        <main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
          <section className='mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20'>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 font-medium text-slate-600 text-xs shadow-sm ring-1 ring-slate-100/80 backdrop-blur-sm dark:border-line dark:bg-surface/80 dark:text-muted dark:ring-line/40'>
              <span className='flex size-1.5 rounded-full bg-primary-500' />
              Forms playground
            </div>
            <h1 className='mt-6 max-w-3xl font-semibold text-3xl text-fg tracking-tight md:text-4xl lg:text-5xl'>
              Field × Button on one page
            </h1>
            <p className='mt-4 max-w-3xl text-pretty text-base text-muted leading-relaxed md:text-lg'>
              Preview common form layouts in real apps — sign-in, list filters, record creation, settings, and
              a size matrix — to compare height, corner radius (
              <code className='text-xs'>--control-radius</code>) and row alignment between inputs and buttons.
            </p>
          </section>

          <section className='mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 pb-16 md:px-8 md:pb-20'>
            <PreviewSection
              description='Icon input, primary + ghost buttons at the same height with rounded-full.'
              title='1. Sign in'
            >
              <LoginFormCase />
            </PreviewSection>

            <PreviewSection
              description='Search + 2 selects + inline Toolbar (view toggle) + action buttons on one row — aligned with default Field/Button height.'
              title='2. List filter bar'
            >
              <FilterBarCase />
            </PreviewSection>

            <PreviewSection
              description='Two-column grid: text, select, NumberField at default size — Cancel / Submit footer.'
              title='3. Create workspace'
            >
              <CreateWorkspaceCase />
            </PreviewSection>

            <PreviewSection
              description='Field size lg and Button size lg on one row — Settings page pattern.'
              title='4. Profile settings (size lg)'
            >
              <ProfileSettingsCase />
            </PreviewSection>

            <PreviewSection
              description='Email + send button: check bottom alignment when only the field has a label.'
              title='5. Invite member (inline)'
            >
              <InlineFieldButtonCase />
            </PreviewSection>

            <PreviewSection
              description='Compare pill vs default corners per size — useful when reviewing radius after CSS refactors.'
              title='6. Size matrix (alignment)'
            >
              <SizeAlignmentCase />
            </PreviewSection>

            <PreviewSection
              className='bg-slate-100/50 dark:bg-surface/50'
              description='Modal mock: full-width field, action bar on the right.'
              title='7. Dialog footer'
            >
              <ModalFooterCase />
            </PreviewSection>

            <PreviewSection
              description='Checkbox group with indeterminate parent — useful for permissions and notification preferences.'
              title='8. Notification preferences (checkbox + indeterminate)'
            >
              <NotificationPreferencesCase />
            </PreviewSection>

            <PreviewSection
              description='Radio cards keep the .radio class for the input with custom layout — selected state uses primary border + light ring.'
              title='9. Choose plan (radio cards)'
            >
              <PlanRadioCardsCase />
            </PreviewSection>

            <PreviewSection
              description='Sizes (sm / default / lg / xl) · variants (primary / success / info / warning / danger) · disabled · invalid.'
              title='10. Gallery checkbox & radio'
            >
              <CheckRadioGalleryCase />
            </PreviewSection>
          </section>
        </main>
      </div>
    </div>
  )
}
