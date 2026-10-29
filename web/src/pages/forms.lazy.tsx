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
	Chip,
	ChipInput,
	Field,
	NumberField,
	Radio,
	RadioGroup,
	Select,
	Toggle,
	ToggleGroup,
} from '@polyms/ui-kit'
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

const skillSuggestions = ['Design', 'Accessibility', 'Testing']

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
				'rounded-2xl border border-neutral-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-neutral-100/80',
				'md:p-8 dark:border-line dark:bg-surface/80 dark:ring-line/40',
				className
			)}
			data-testid={`forms-example-${title
				.toLowerCase()
				.replace(/^\d+\.\s*/, '')
				.replace(/[^a-z0-9]+/g, '-')}`}
		>
			<h2 className='text-lg font-semibold tracking-tight text-fg'>{title}</h2>
			<p className='mt-1 max-w-2xl text-sm leading-relaxed text-pretty text-muted'>{description}</p>
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
			data-testid='forms-sign-in-form'
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<Field required>
				<Field.Label>Email</Field.Label>
				<HugeiconsIcon className='icon-start' icon={MailAtSign02Icon} strokeWidth={2} />
				<Field.Control
					autoComplete='email'
					data-testid='forms-sign-in-email'
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
					data-testid='forms-sign-in-password'
					onChange={e => setPassword(e.target.value)}
					placeholder='••••••••'
					rounded
					type='password'
					value={password}
				/>
				<Field.Description>At least 8 characters, with uppercase and a number.</Field.Description>
			</Field>
			<div className='flex items-center justify-between gap-3'>
				<Checkbox checked={remember} data-testid='forms-sign-in-remember' onCheckedChange={setRemember}>
					Remember me
				</Checkbox>
				<a className='link link-primary text-xs' href='#forgot'>
					Forgot password?
				</a>
			</div>
			<Button
				className='w-full'
				data-testid='forms-sign-in-submit'
				disabled={!email || !password}
				rounded
				type='submit'
				variant='primary'
			>
				Sign in
			</Button>
		</form>
	)
}

function FilterBarCase() {
	const [query, setQuery] = useState('')
	const [role, setRole] = useState<string | null>('all')
	const [status, setStatus] = useState<string | null>('any')
	const [layout, setLayout] = useState<string[]>(['list'])
	const [mine, setMine] = useState(false)

	return (
		<div className='flex flex-wrap items-end gap-3'>
			<Field className='min-w-56 flex-1'>
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
					data-testid='forms-filter-query'
					onChange={e => setQuery(e.target.value)}
					placeholder='Name, email, or ID…'
					rounded
					value={query}
				/>
			</Field>
			<Field className='w-full lg:w-44'>
				<Field.Label>Role</Field.Label>
				<Select items={roleItems} onValueChange={setRole} value={role}>
					<Select.Trigger className='w-full rounded-full' data-testid='forms-filter-role' placeholder='Role'>
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
					<Select.Trigger
						className='w-full rounded-full'
						data-testid='forms-filter-status'
						placeholder='Status'
					>
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
			<Field className='w-full shrink-0 lg:w-auto'>
				<Field.Label>View</Field.Label>
				<ToggleGroup
					aria-label='Layout'
					data-testid='forms-filter-layout'
					onValueChange={setLayout}
					rounded
					value={layout}
				>
					<Toggle value='grid'>Grid</Toggle>
					<Toggle value='list'>List</Toggle>
				</ToggleGroup>
			</Field>
			<Field className='w-full shrink-0 lg:w-auto'>
				<Field.Label>Scope</Field.Label>
				<Toggle data-testid='forms-filter-mine' onPressedChange={setMine} pressed={mine} rounded>
					Mine
				</Toggle>
			</Field>
			<div className='flex shrink-0 gap-2'>
				<Button
					data-testid='forms-filter-clear'
					onClick={() => {
						setQuery('')
						setRole('all')
						setStatus('any')
						setLayout(['list'])
						setMine(false)
					}}
					outlined
					rounded
					variant='light'
				>
					Clear filters
				</Button>
				<Button data-testid='forms-filter-apply' rounded variant='primary'>
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
	const [visibility, setVisibility] = useState('team')

	return (
		<form
			className='flex flex-col gap-6'
			data-testid='forms-create-workspace-form'
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field required>
					<Field.Label>Workspace name</Field.Label>
					<Field.Control
						data-testid='forms-workspace-name'
						onChange={e => setName(e.target.value)}
						placeholder='Acme Corp'
						rounded
						value={name}
					/>
				</Field>
				<Field>
					<Field.Label>Slug URL</Field.Label>
					<Field.Control
						data-testid='forms-workspace-slug'
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
						<Select.Trigger
							className='w-full rounded-full'
							data-testid='forms-workspace-plan'
							placeholder='Select plan'
						>
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
				<Field className='sm:col-span-2'>
					<Field.Label>Visibility</Field.Label>
					<ToggleGroup
						aria-label='Visibility'
						className='w-full'
						data-testid='forms-workspace-visibility'
						onValueChange={next => {
							const value = next[0]
							if (value) setVisibility(value)
						}}
						rounded
						value={[visibility]}
					>
						<Toggle value='private'>Private</Toggle>
						<Toggle value='team'>Team</Toggle>
						<Toggle value='public'>Public</Toggle>
					</ToggleGroup>
					<Field.Description>Who can open this workspace.</Field.Description>
				</Field>
			</div>
			<div className='flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200/80 pt-4 dark:border-line'>
				<Button rounded>Cancel</Button>
				<Button data-testid='forms-workspace-submit' rounded type='submit' variant='primary'>
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
					data-testid='forms-profile-display-name'
					onChange={e => setDisplayName(e.target.value)}
					placeholder='Your name'
					rounded
					value={displayName}
				/>
			</Field>
			<Button data-testid='forms-profile-save' rounded size='lg' variant='primary'>
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
					data-testid='forms-invite-email'
					onChange={e => setInvite(e.target.value)}
					placeholder='colleague@company.com'
					rounded
					type='email'
					value={invite}
				/>
			</Field>
			<Button
				className='sm:self-end'
				data-testid='forms-invite-submit'
				disabled={!invite}
				rounded
				variant='primary'
			>
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

function AlignedControlRow({
	buttonSize,
	fieldSize,
	rounded,
}: {
	buttonSize?: SizeRowButtonSize
	fieldSize?: Field.Props['size']
	rounded?: boolean
}) {
	return (
		<div className='flex w-max items-center gap-2'>
			<Field className='w-40' size={fieldSize}>
				<Field.Control placeholder='Search' rounded={rounded} />
			</Field>
			<Select defaultValue='all' items={roleItems}>
				<Select.Trigger
					className={clsx('w-36', rounded && 'rounded-full')}
					placeholder='Role'
					size={fieldSize}
				>
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
			<ToggleGroup
				aria-label={`Layout ${fieldSize ?? 'default'} ${rounded ? 'pill' : 'square'}`}
				defaultValue={['list']}
				rounded={rounded}
				size={fieldSize}
			>
				<Toggle value='grid'>Grid</Toggle>
				<Toggle value='list'>List</Toggle>
			</ToggleGroup>
			<Toggle defaultPressed rounded={rounded} size={fieldSize}>
				Mine
			</Toggle>
			<Button rounded={rounded} size={buttonSize} variant='primary'>
				Apply
			</Button>
		</div>
	)
}

function SizeAlignmentCase() {
	return (
		<div className='overflow-x-auto'>
			<table className='table-borderless table w-full min-w-xl text-left align-middle text-sm'>
				<thead>
					<tr className='text-muted'>
						<th className='w-24 pb-3 font-medium'>Size</th>
						<th className='pb-3 font-medium'>Pill</th>
						<th className='pb-3 font-medium'>Default corners</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-neutral-100 dark:divide-line'>
					{sizeRows.map(({ label, fieldSize, buttonSize }) => (
						<tr key={label}>
							<td className='py-4 font-mono text-xs text-muted'>{label}</td>
							<td className='py-4 pe-4'>
								<AlignedControlRow buttonSize={buttonSize} fieldSize={fieldSize} rounded />
							</td>
							<td className='py-4'>
								<AlignedControlRow buttonSize={buttonSize} fieldSize={fieldSize} />
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
		<div className='mx-auto flex w-full max-w-lg flex-col gap-3 rounded-2xl border border-line bg-body p-5'>
			<Checkbox
				checked={allChecked}
				className='border-b border-neutral-100 pb-3'
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
							<span className='text-xs font-normal text-muted'>{i.desc}</span>
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
							'radio cursor-pointer rounded-xl border bg-body p-4 transition',
							'hover:border-primary-600/60',
							'data-checked:border-primary-600 data-checked:bg-primary-50/40 dark:data-checked:bg-primary-300/10 dark:data-checked:border-primary-300',
							'data-checked:ring-primary-600/15 data-checked:ring-3',
							selected === plan.id ? 'border-primary-600 dark:border-primary-300' : 'border-line'
						)}
						key={plan.id}
						value={plan.id}
					>
						<span className='flex min-w-0 flex-1 flex-col gap-1'>
							<span className='flex items-baseline justify-between gap-2'>
								<span className='font-semibold'>{plan.name}</span>
								<span className='font-semibold tabular-nums'>{plan.price}</span>
							</span>
							<span
								className={clsx(
									'text-xs leading-snug font-normal text-muted',
									selected === plan.id && 'dark:text-fg'
								)}
							>
								{plan.desc}
							</span>
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
				<span className='text-xs font-medium tracking-wider text-muted uppercase'>Sizes</span>
				<div className='flex flex-wrap items-end gap-x-6 gap-y-3'>
					{checkSizes.map(({ size, label }) => (
						<Checkbox defaultChecked key={`cb-${label}`} size={size || undefined}>
							{label}
						</Checkbox>
					))}
					<span aria-hidden className='h-6 w-px self-center bg-neutral-200' />
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
				<span className='text-xs font-medium tracking-wider text-muted uppercase'>Variants</span>
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
				<span className='text-xs font-medium tracking-wider text-muted uppercase'>States</span>
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
		<div className='mx-auto w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg ring-1 ring-neutral-100 dark:border-line dark:bg-surface dark:ring-line/40'>
			<h3 className='text-base font-semibold text-fg'>Schedule publish</h3>
			<p className='mt-1 text-sm text-muted'>Modal footer: field and buttons on one row, bottom-aligned.</p>
			<Field className='mt-5'>
				<Field.Label>Date & time</Field.Label>
				<HugeiconsIcon className='icon-start' icon={Calendar03Icon} strokeWidth={2} />
				<Field.Control
					data-testid='forms-schedule-datetime'
					onChange={e => setDate(e.target.value)}
					placeholder='Pick a date…'
					rounded
					type='datetime-local'
					value={date}
				/>
			</Field>
			<div className='mt-6 flex flex-wrap justify-end gap-2'>
				<Button rounded>Cancel</Button>
				<Button data-testid='forms-schedule-confirm' disabled={!date} rounded variant='primary'>
					Confirm
				</Button>
			</div>
		</div>
	)
}

function FloatingLabelCase() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<form
			className='mx-auto flex w-full max-w-sm flex-col gap-4'
			data-testid='forms-floating-label-form'
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<Field.Floating
				autoComplete='email'
				data-testid='forms-floating-email'
				label='Email'
				onChange={e => setEmail(e.target.value)}
				placeholder='Used to sign you in.'
				required
				type='email'
				value={email}
			/>
			<Field.Floating
				autoComplete='current-password'
				data-testid='forms-floating-password'
				label='Password'
				onChange={e => setPassword(e.target.value)}
				placeholder='At least 8 characters, with a number.'
				required
				type='password'
				value={password}
			/>
			<Button
				className='w-full'
				data-testid='forms-floating-submit'
				disabled={!email || !password}
				rounded
				type='submit'
				variant='primary'
			>
				Continue
			</Button>
		</form>
	)
}

function ProfileSkillsCase() {
	const [name, setName] = useState('Tifa Lockhart')
	const [role, setRole] = useState<string | null>('editor')
	const [notify, setNotify] = useState(true)
	const [skills, setSkills] = useState(['React', 'TypeScript'])
	const profileRoles = roleItems.filter(item => item.value !== 'all')

	return (
		<form
			className='flex flex-col gap-6'
			data-testid='forms-skills-form'
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field required>
					<Field.Label>Display name</Field.Label>
					<HugeiconsIcon className='icon-start' icon={UserIcon} strokeWidth={2} />
					<Field.Control
						data-testid='forms-skills-name'
						onChange={e => setName(e.target.value)}
						placeholder='Your name'
						rounded
						value={name}
					/>
				</Field>
				<Field>
					<Field.Label>Role</Field.Label>
					<Select items={profileRoles} onValueChange={setRole} value={role}>
						<Select.Trigger
							className='w-full rounded-full'
							data-testid='forms-skills-role'
							placeholder='Role'
						>
							{item => item?.label ?? 'Role'}
						</Select.Trigger>
						<Select.Content>
							{profileRoles.map(item => (
								<Select.Item key={item.value} value={item.value}>
									{item.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</Field>
			</div>
			<div className='flex flex-col gap-1' data-testid='forms-skills-field'>
				<label className='field-label' htmlFor='forms-skills-input'>
					Skills
				</label>
				<ChipInput
					id='forms-skills-input'
					label='Skills'
					onValueChange={setSkills}
					placeholder='Add a skill'
					rounded
					value={skills}
					variant='primary'
				/>
			</div>
			<div className='flex flex-wrap items-center gap-2'>
				<span className='text-xs font-medium text-muted'>Suggestions</span>
				{skillSuggestions.map(skill => (
					<Chip
						active={skills.includes(skill)}
						key={skill}
						onClick={() => {
							setSkills(current =>
								current.includes(skill) ? current.filter(item => item !== skill) : [...current, skill]
							)
						}}
						variant='neutral'
					>
						{skill}
					</Chip>
				))}
			</div>
			<div className='flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/80 pt-4 dark:border-line'>
				<Toggle data-testid='forms-skills-notify' onPressedChange={setNotify} pressed={notify} rounded>
					Email me when someone joins
				</Toggle>
				<Button data-testid='forms-skills-submit' rounded type='submit' variant='primary'>
					Save profile
				</Button>
			</div>
		</form>
	)
}

function FormsPage() {
	return (
		<div className='playground-page flex min-h-0 min-w-0 flex-1 flex-col' data-testid='forms-playground'>
			<Header />

			<div className='docs-demo-shell relative isolate flex-1 overflow-x-clip bg-body text-fg'>
				<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
					<div className='playground-grid absolute inset-x-0 top-0 h-144' />
					<div className='bg-primary-700/10 absolute -top-20 left-1/3 h-96 w-96 rounded-full blur-3xl' />
					<div className='absolute top-64 right-0 h-72 w-72 rounded-full bg-neutral-300/30 blur-3xl dark:bg-neutral-700/30' />
				</div>

				<main className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
					<section className='mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20'>
						<div className='inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-100/80 backdrop-blur-sm dark:border-line dark:bg-surface/80 dark:text-muted dark:ring-line/40'>
							<span className='bg-primary-500 flex size-1.5 rounded-full' />
							Forms playground
						</div>
						<h1 className='mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl'>
							Controls on one row
						</h1>
						<p className='mt-4 max-w-3xl text-base leading-relaxed text-pretty text-muted md:text-lg'>
							Preview common form layouts — sign-in, filters, record creation, settings, floating labels,
							skill chips, and a size matrix — to compare height, corner radius, and color across Field,
							Select, Toggle, Chip, and Button.
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
							description='Search, selects, ToggleGroup, Toggle, and actions on one row — same height and control color. Fields, the toggle group, the single toggle, and actions use a pill radius.'
							title='2. List filter bar'
						>
							<FilterBarCase />
						</PreviewSection>

						<PreviewSection
							description='Two-column grid: text, select, NumberField, and a visibility ToggleGroup — Cancel / Submit footer.'
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
							description='Field, Select, ToggleGroup, Toggle, and Button at each size — pill and default corners.'
							title='6. Size matrix (alignment)'
						>
							<SizeAlignmentCase />
						</PreviewSection>

						<PreviewSection
							className='bg-neutral-100/50 dark:bg-surface/50'
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

						<PreviewSection
							description='Email and password — the label sits inside the control and floats on focus or when the field has a value.'
							title='11. Floating labels'
						>
							<FloatingLabelCase />
						</PreviewSection>

						<PreviewSection
							description='Display name and role stay pill-shaped with the save button. Skills use the textarea corner radius. Add a skill with Enter or a suggestion chip, then remove it from the field.'
							title='12. Profile skills'
						>
							<ProfileSkillsCase />
						</PreviewSection>
					</section>
				</main>
			</div>
		</div>
	)
}
