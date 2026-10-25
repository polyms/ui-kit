import { Button } from '@polyms/ui-kit'
import { Moon, Sun } from '@solar-icons/react-perf/BoldDuotone'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function DarkModeDefault() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const isDark = theme === 'dark'

	return (
		<div className='mx-auto max-w-md px-4'>
			<div className='mb-4 flex items-center justify-between gap-3'>
				<p className='text-sm text-muted'>
					Preview scoped to this panel — toggle does not affect the docs chrome.
				</p>
				<Button
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					icon
					onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
					outlined
					rounded
					variant='light'
				>
					{isDark ? <Sun className='size-4' /> : <Moon className='size-4' />}
				</Button>
			</div>

			<div className={`overflow-hidden rounded-xl border border-line ${theme === 'dark' ? 'dark' : ''}`}>
				<div className='bg-body p-5'>
					<h3 className='font-semibold text-fg'>Account overview</h3>
					<p className='mt-1 text-sm text-muted'>Balance and recent activity on your primary account.</p>

					<div className='mt-4 rounded-lg border border-line bg-surface p-4'>
						<span className='text-caption tracking-wider text-muted uppercase'>Available balance</span>
						<p className='mt-1 text-xl font-semibold text-fg tabular-nums'>$12,485.62</p>
						<p className='mt-2 text-xs text-muted'>Updated just now · Everyday checking •••• 4521</p>
					</div>

					<div className='mt-4 flex gap-2'>
						<Button rounded size='sm' variant='primary'>
							Transfer
						</Button>
						<Button outlined rounded size='sm' variant='light'>
							History
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
