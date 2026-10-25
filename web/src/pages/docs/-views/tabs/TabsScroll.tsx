import { Tabs } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function TabsScroll() {
	return (
		<div className='mx-auto w-full max-w-sm p-6'>
			<p className='mb-3 text-sm text-muted'>
				Many tab labels scroll inside a wrapper — the page does not overflow.
			</p>
			<Tabs defaultValue='all'>
				<div className='-mx-6 scrollbar-none overflow-x-auto px-6'>
					<Tabs.List className='w-max min-w-full'>
						<Tabs.Tab value='all'>All</Tabs.Tab>
						<Tabs.Tab value='open'>Open</Tabs.Tab>
						<Tabs.Tab value='pending'>Pending review</Tabs.Tab>
						<Tabs.Tab value='archived'>Archived</Tabs.Tab>
						<Tabs.Tab value='drafts'>Drafts</Tabs.Tab>
					</Tabs.List>
				</div>
				<Tabs.Panel value='all'>
					<p className='text-sm text-muted'>47 orders across every status.</p>
				</Tabs.Panel>
				<Tabs.Panel value='open'>
					<p className='text-sm text-muted'>12 orders awaiting fulfillment.</p>
				</Tabs.Panel>
				<Tabs.Panel value='pending'>
					<p className='text-sm text-muted'>3 orders need manual review.</p>
				</Tabs.Panel>
				<Tabs.Panel value='archived'>
					<p className='text-sm text-muted'>Historical orders from closed workspaces.</p>
				</Tabs.Panel>
				<Tabs.Panel value='drafts'>
					<p className='text-sm text-muted'>Saved carts that were never submitted.</p>
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}
