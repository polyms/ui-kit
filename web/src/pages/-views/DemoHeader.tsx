import {
	Add01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	ChartIncreaseIcon,
	CreditCardIcon,
	Exchange02Icon,
	HeadphonesIcon,
	Invoice01Icon,
	PercentSquareIcon,
	PiggyBankIcon,
	ReceiptTextIcon,
	SavingsIcon,
	SearchList02Icon,
	SearchRemoveIcon,
	Sent02Icon,
	ShieldEnergyIcon,
	Wallet01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Field, NavigationMenu } from '@polyms/ui-kit'
import React from 'react'
import { FaviconFit } from '../../assets/FaviconFit'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type AccountRow = {
	label: string
	type: string
	balance: string
	hint: string
	icon: typeof Wallet01Icon
	tone: 'primary' | 'success' | 'warning' | 'neutral'
	href: string
}

type ActionTile = {
	label: string
	description: string
	icon: typeof Sent02Icon
	href: string
}

type Recipient = {
	initials: string
	name: string
	tone: string
}

type Transfer = {
	who: string
	detail: string
	amount: string
	positive?: boolean
}

type Allocation = {
	label: string
	weight: number
	bar: string
	value: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

const accountRows: AccountRow[] = [
	{
		label: 'Everyday checking',
		type: 'Primary · •••• 4521',
		balance: '$12,485.62',
		hint: 'Available now',
		icon: Wallet01Icon,
		tone: 'primary',
		href: '#checking',
	},
	{
		label: 'High-yield savings',
		type: 'APY 4.5% · •••• 8814',
		balance: '$34,219.10',
		hint: 'Earning $128.32 / mo',
		icon: PiggyBankIcon,
		tone: 'success',
		href: '#savings',
	},
	{
		label: 'Visa Signature',
		type: 'Credit · •••• 7702',
		balance: '−$1,205.40',
		hint: 'Due in 12 days',
		icon: CreditCardIcon,
		tone: 'warning',
		href: '#credit',
	},
]

const quickActions: ActionTile[] = [
	{
		label: 'Send',
		description: 'Pay anyone, instantly.',
		icon: Sent02Icon,
		href: '#send',
	},
	{
		label: 'Request',
		description: 'Split a bill or get paid.',
		icon: Exchange02Icon,
		href: '#request',
	},
	{
		label: 'Bill pay',
		description: 'Schedule recurring bills.',
		icon: Invoice01Icon,
		href: '#billpay',
	},
]

const recentRecipients: Recipient[] = [
	{ initials: 'NH', name: 'Ngọc Hà', tone: 'bg-primary-700/15 text-primary-700' },
	{ initials: 'TM', name: 'Tuấn Minh', tone: 'bg-warning-500/15 text-warning-500' },
	{ initials: 'AT', name: 'Anh Thư', tone: 'bg-success-500/15 text-success-500' },
	{ initials: 'KD', name: 'Khánh Duy', tone: 'bg-info-500/15 text-info-500' },
	{ initials: 'LP', name: 'Linh Phương', tone: 'bg-danger-500/15 text-danger-500' },
]

const recentTransfers: Transfer[] = [
	{ who: 'Spotify · Family', detail: 'Sub · today, 09:12', amount: '−$16.99' },
	{ who: 'From Ngọc Hà', detail: 'Sent · Yesterday', amount: '+$45.00', positive: true },
	{ who: 'Trader Joe’s', detail: 'Card · Thu, 4:48 PM', amount: '−$62.18' },
]

const portfolioBars = [42, 56, 49, 64, 58, 72, 68, 81]

const allocations: Allocation[] = [
	{ label: 'Stocks', weight: 60, bar: 'bg-primary-700', value: '$29,035.32' },
	{ label: 'Bonds', weight: 25, bar: 'bg-success-500', value: '$12,098.05' },
	{ label: 'Cash', weight: 15, bar: 'bg-neutral-400', value: '$7,258.83' },
]

export const Header = () => {
	const [user, setUser] = React.useState<{ name: string }>()
	const onLogin = () => setUser({ name: 'Tifa Lockhart' })
	const onLogout = () => setUser(undefined)
	const [search, setSearch] = React.useState('')

	return (
		<header
			className='sticky top-0 z-30 flex w-full max-w-full min-w-0 flex-nowrap items-center gap-3 border-b border-neutral-200/80 bg-white/80 px-5 py-2.5 backdrop-blur-md backdrop-saturate-150 md:gap-4 md:px-8 dark:border-line/60 dark:bg-surface/70'
			id='demo-app-header'
		>
			<FaviconFit className='size-8 shrink-0 rounded-lg shadow-sm ring-1 ring-neutral-200/80 dark:ring-line/60' />

			<NavigationMenu className='min-w-0 shrink-0' closeDelay={120} delay={100}>
				<NavigationMenu.List className='mb-0 list-none' variant='bare'>
					<NavigationMenu.Item value='accounts'>
						<NavigationMenu.Trigger>
							Accounts
							<NavigationMenu.Icon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div className='flex w-md flex-col gap-3'>
								<div className='flex items-end justify-between rounded-xl bg-neutral-900 px-4 py-3 text-white'>
									<div className='flex flex-col gap-0.5'>
										<span className='text-caption tracking-wider text-white/60 uppercase'>Total balance</span>
										<span className='text-xl font-semibold text-white'>$45,499.32</span>
									</div>
									<span className='bg-success-500/20 text-success-300 text-caption inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium'>
										<HugeiconsIcon icon={ArrowUp01Icon} size={10} strokeWidth={2.5} />
										+1.24% today
									</span>
								</div>

								<ul className='m-0 flex list-none flex-col gap-0.5 p-0'>
									{accountRows.map(row => (
										<li key={row.href}>
											<NavigationMenu.Link className='flex items-center gap-3' href={row.href}>
												<span
													className={`flex size-9 items-center justify-center rounded-lg ${
														row.tone === 'primary'
															? 'bg-primary-700/10 text-primary-700'
															: row.tone === 'success'
																? 'bg-success-500/10 text-success-500'
																: row.tone === 'warning'
																	? 'bg-warning-500/10 text-warning-500'
																	: 'bg-neutral-100 text-neutral-700 dark:bg-surface dark:text-fg'
													}`}
												>
													<HugeiconsIcon icon={row.icon} size={18} strokeWidth={2} />
												</span>
												<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
													<span className='flex items-center justify-between gap-2 text-sm font-medium'>
														<span className='truncate'>{row.label}</span>
														<span className='shrink-0 tabular-nums'>{row.balance}</span>
													</span>
													<span className='flex items-center justify-between gap-2 text-xs text-muted'>
														<span className='truncate'>{row.type}</span>
														<span className='shrink-0'>{row.hint}</span>
													</span>
												</span>
											</NavigationMenu.Link>
										</li>
									))}
								</ul>

								<a className='link link-primary inline-flex items-center gap-1 text-xs' href='#all-accounts'>
									View all accounts
									<HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2.25} />
								</a>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item value='cards'>
						<NavigationMenu.Trigger>
							Cards
							<NavigationMenu.Icon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div className='demo-cards-grid grid w-lg gap-3'>
								<div
									className='demo-card-face relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-white'
									style={{
										backgroundImage:
											'linear-gradient(135deg, oklch(28% 0.05 260), oklch(40% 0.08 280) 55%, oklch(22% 0.04 250))',
									}}
								>
									<span
										aria-hidden='true'
										className='pointer-events-none absolute -top-4 -right-4 size-24 rounded-full opacity-25 blur-xl'
										style={{
											background:
												'radial-gradient(circle, color-mix(in oklab, white 70%, transparent), transparent 70%)',
										}}
									/>
									<span className='flex items-center justify-between'>
										<span className='text-sm font-semibold tracking-wide'>polyms·bank</span>
										<span className='text-2xs inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 font-medium tracking-wider uppercase'>
											<HugeiconsIcon icon={ShieldEnergyIcon} size={10} strokeWidth={2.5} />
											Signature
										</span>
									</span>
									<span
										aria-hidden='true'
										className='size-9 rounded-md'
										style={{
											backgroundImage: 'linear-gradient(135deg, oklch(85% 0.12 90), oklch(70% 0.13 65))',
										}}
									/>
									<span className='flex flex-col gap-1.5'>
										<span className='demo-card-pan font-mono text-white/90'>•••• 7702</span>
										<span className='flex items-baseline justify-between gap-2'>
											<span className='text-sm font-medium tracking-wider uppercase'>Linh Đoàn</span>
											<span className='text-caption text-white/70 tabular-nums'>12/29</span>
										</span>
									</span>
								</div>

								<ul className='m-0 flex list-none flex-col gap-0.5 p-0'>
									<li>
										<NavigationMenu.Link className='flex items-center gap-2.5' href='#manage'>
											<span className='flex size-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 dark:bg-surface dark:text-fg'>
												<HugeiconsIcon icon={CreditCardIcon} size={15} strokeWidth={2} />
											</span>
											<span className='text-sm font-medium'>Manage cards</span>
										</NavigationMenu.Link>
									</li>
									<li>
										<NavigationMenu.Link className='flex items-center gap-2.5' href='#add'>
											<span className='bg-primary-700/10 text-primary-700 flex size-8 items-center justify-center rounded-md'>
												<HugeiconsIcon icon={Add01Icon} size={15} strokeWidth={2.25} />
											</span>
											<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
												<span className='text-sm font-medium'>Add a new card</span>
												<span className='text-xs text-muted'>Virtual or physical</span>
											</span>
										</NavigationMenu.Link>
									</li>
									<li>
										<NavigationMenu.Link className='flex items-center gap-2.5' href='#limits'>
											<span className='bg-warning-500/10 text-warning-500 flex size-8 items-center justify-center rounded-md'>
												<HugeiconsIcon icon={PercentSquareIcon} size={15} strokeWidth={2} />
											</span>
											<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
												<span className='text-sm font-medium'>Spending limits</span>
												<span className='text-xs text-muted'>Set daily caps</span>
											</span>
										</NavigationMenu.Link>
									</li>
									<li>
										<NavigationMenu.Link className='flex items-center gap-2.5' href='#freeze'>
											<span className='flex size-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 dark:bg-surface dark:text-fg'>
												<HugeiconsIcon icon={ReceiptTextIcon} size={15} strokeWidth={2} />
											</span>
											<span className='flex min-w-0 flex-1 items-center justify-between gap-2'>
												<span className='text-sm font-medium'>Recent statements</span>
												<span className='badge badge-light text-2xs rounded-full'>3 new</span>
											</span>
										</NavigationMenu.Link>
									</li>
								</ul>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item value='transfers'>
						<NavigationMenu.Trigger>
							Transfers
							<NavigationMenu.Icon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div className='flex w-xl flex-col gap-3'>
								<div className='grid grid-cols-3 gap-2'>
									{quickActions.map(action => (
										<NavigationMenu.Link
											className='flex flex-col items-start gap-2'
											href={action.href}
											key={action.href}
											variant='soft'
										>
											<span className='bg-primary-700/10 text-primary-700 flex size-9 items-center justify-center rounded-lg'>
												<HugeiconsIcon icon={action.icon} size={16} strokeWidth={2} />
											</span>
											<span className='flex flex-col gap-0.5'>
												<span className='text-sm font-semibold'>{action.label}</span>
												<span className='text-xs leading-snug text-muted'>{action.description}</span>
											</span>
										</NavigationMenu.Link>
									))}
								</div>

								<div className='flex flex-col gap-2 rounded-xl border border-neutral-200 px-3 py-2.5 dark:border-line'>
									<span className='text-caption flex items-center justify-between tracking-wider text-muted uppercase'>
										Recent recipients
										<a
											className='link link-primary text-caption tracking-normal normal-case'
											href='#contacts'
										>
											Manage
										</a>
									</span>
									<div className='flex items-center gap-1.5'>
										{recentRecipients.map(person => (
											<span
												className={`inline-flex size-9 items-center justify-center rounded-full text-xs font-semibold ${person.tone}`}
												key={person.initials}
												title={person.name}
											>
												{person.initials}
											</span>
										))}
										<span className='inline-flex size-9 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 dark:bg-surface dark:text-fg'>
											+12
										</span>
									</div>
								</div>

								<ul className='m-0 flex list-none flex-col gap-0.5 p-0'>
									{recentTransfers.map(t => (
										<li key={t.who}>
											<NavigationMenu.Link className='flex items-center gap-3' href='#tx'>
												<span className='flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 dark:bg-surface dark:text-fg'>
													<HugeiconsIcon icon={Exchange02Icon} size={14} strokeWidth={2} />
												</span>
												<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
													<span className='flex items-center justify-between gap-2 text-sm font-medium'>
														<span className='truncate'>{t.who}</span>
														<span
															className={`shrink-0 tabular-nums ${t.positive ? 'text-success-500' : 'text-neutral-900 dark:text-fg'}`}
														>
															{t.amount}
														</span>
													</span>
													<span className='truncate text-xs text-muted'>{t.detail}</span>
												</span>
											</NavigationMenu.Link>
										</li>
									))}
								</ul>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item value='investments'>
						<NavigationMenu.Trigger>
							Investments
							<NavigationMenu.Icon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div className='flex w-md flex-col gap-3'>
								<div className='flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-line dark:bg-surface'>
									<div className='flex items-end justify-between gap-2'>
										<div className='flex flex-col gap-0.5'>
											<span className='text-caption tracking-wider text-muted uppercase'>
												Portfolio value
											</span>
											<span className='text-xl font-semibold text-neutral-900 tabular-nums dark:text-fg'>
												$48,392.20
											</span>
										</div>
										<span className='bg-success-500/15 text-success-700 text-caption inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold tabular-nums'>
											<HugeiconsIcon icon={ArrowUp01Icon} size={10} strokeWidth={2.5} />
											+2.34%
										</span>
									</div>

									<div className='flex h-12 items-end gap-1'>
										{portfolioBars.map((h, i) => (
											<span
												className='bg-primary-700/30 flex-1 rounded-sm'
												// biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
												key={i}
												style={{ height: `${h}%` }}
											/>
										))}
									</div>
									<div className='text-caption flex items-center justify-between text-muted'>
										<span>7 days</span>
										<span className='inline-flex items-center gap-1'>
											<HugeiconsIcon icon={ChartIncreaseIcon} size={10} strokeWidth={2.5} />
											+$1,103.55 today
										</span>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<span className='text-caption px-1 tracking-wider text-muted uppercase'>
										Asset allocation
									</span>
									<ul className='m-0 flex list-none flex-col gap-2 p-0'>
										{allocations.map(a => (
											<li className='flex flex-col gap-1' key={a.label}>
												<span className='flex items-center justify-between gap-2 text-xs'>
													<span className='font-medium text-neutral-700 dark:text-fg'>{a.label}</span>
													<span className='text-muted tabular-nums'>
														{a.weight}% · {a.value}
													</span>
												</span>
												<span className='h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-line'>
													<span
														className={`block h-full rounded-full ${a.bar}`}
														style={{ width: `${a.weight}%` }}
													/>
												</span>
											</li>
										))}
									</ul>
								</div>

								<NavigationMenu.Link
									className='flex items-center justify-between'
									href='#invest'
									variant='soft'
								>
									<span className='flex items-center gap-2'>
										<HugeiconsIcon
											className='text-primary-700'
											icon={SavingsIcon}
											size={16}
											strokeWidth={2}
										/>
										<span className='text-sm font-medium'>Open a new portfolio</span>
									</span>
									<HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.25} />
								</NavigationMenu.Link>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<span aria-hidden='true' className='mx-1 h-5 w-px bg-neutral-200 dark:bg-line' />

					<NavigationMenu.Item>
						<NavigationMenu.Link
							className='inline-flex items-center gap-1.5'
							href='#support'
							variant='trigger'
						>
							<HugeiconsIcon icon={HeadphonesIcon} size={14} strokeWidth={2} />
							Support
						</NavigationMenu.Link>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Link href='#pricing' variant='trigger'>
							Pricing
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				</NavigationMenu.List>

				<NavigationMenu.Viewport />
			</NavigationMenu>

			<Field className='ml-auto max-w-full min-w-0' size='lg'>
				<HugeiconsIcon
					className='icon-start'
					icon={search ? SearchRemoveIcon : SearchList02Icon}
					onClick={() => setSearch('')}
					strokeWidth={2}
				/>
				<Field.Control
					className='w-full max-w-full min-w-0 sm:max-w-xs md:max-w-sm'
					data-testid='demo-header-search'
					onChange={e => setSearch(e.target.value)}
					placeholder='Search...'
					rounded
					value={search}
				/>
			</Field>

			<div className='flex min-w-0 shrink-0 items-center gap-2'>
				{user ? (
					<>
						<span className='welcome min-w-0 truncate text-sm'>
							Welcome, <b>{user.name}</b>!
						</span>
						<Button
							data-testid='demo-header-logout'
							onClick={onLogout}
							outlined
							rounded
							size='lg'
							variant='light'
						>
							Log out
						</Button>
					</>
				) : (
					<Button data-testid='demo-header-login' onClick={onLogin} rounded size='lg' variant='primary'>
						Log in
					</Button>
				)}
			</div>
		</header>
	)
}
