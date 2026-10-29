import { ArrowRight01Icon, CheckmarkCircle02Icon, CodeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Switch } from '@polyms/ui-kit'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function HeroShelf() {
	const [rounded, setRounded] = useState(true)
	const [clicked, setClicked] = useState(false)
	return (
		<div className='home-shelf' data-complete={clicked}>
			<div className='home-shelf-header'>
				<HugeiconsIcon icon={CodeIcon} size={22} />
				<span>The component shelf</span>
				<span aria-hidden='true'>↗</span>
			</div>
			<div className='home-shelf-specimen'>
				<span className='home-label'>A SMALL DETAIL. A GOOD FEELING.</span>
				<Button onClick={() => setClicked(value => !value)} rounded={rounded} size='xl' variant='primary'>
					{clicked ? 'One more time?' : 'Give it a click'}
					<HugeiconsIcon icon={clicked ? CheckmarkCircle02Icon : ArrowRight01Icon} size={18} />
				</Button>
				<p aria-live='polite' role='status'>
					{clicked ? 'That’s the feeling.' : 'A real button. Right here.'}
				</p>
			</div>
			<div className='home-shelf-setting'>
				<Switch
					checked={rounded}
					label='Round the corners'
					labelPos='start'
					onChange={event => setRounded(event.target.checked)}
				/>
			</div>
			<div className='home-shelf-footer'>
				<code>{rounded ? '<Button rounded />' : '<Button />'}</code>
				<Button
					aria-label='View Button documentation'
					icon
					render={<Link to='/docs/button' />}
					rounded
					size='lg'
				>
					<HugeiconsIcon icon={ArrowRight01Icon} size={18} />
				</Button>
			</div>
		</div>
	)
}
