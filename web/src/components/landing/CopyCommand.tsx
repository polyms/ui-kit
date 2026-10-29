import { Copy01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@polyms/ui-kit'
import { useState } from 'react'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function CopyCommand() {
	const [feedback, setFeedback] = useState('')
	const command = 'pnpm add @polyms/ui-kit'
	return (
		<div className='home-install-command'>
			<div className='home-command-line'>
				<span aria-hidden='true'>$</span>
				<code>{command}</code>
				<Button
					aria-label='Copy install command'
					icon
					onClick={async () => {
						try {
							await navigator.clipboard.writeText(command)
							setFeedback('Copied to clipboard.')
						} catch {
							setFeedback('Select the command and copy it manually.')
						}
					}}
					size='lg'
				>
					<HugeiconsIcon icon={Copy01Icon} size={19} />
				</Button>
			</div>
			<p aria-live='polite' className='home-copy-feedback' role='status'>
				{feedback}
			</p>
		</div>
	)
}
