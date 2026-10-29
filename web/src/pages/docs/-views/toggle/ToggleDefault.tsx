import { MoonIcon, Notification03Icon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Toggle } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToggleDefault() {
	return (
		<div className='m-auto flex items-center gap-4 p-6'>
			<Toggle aria-label='Toggle favorite' defaultPressed>
				<HugeiconsIcon icon={StarIcon} size={16} strokeWidth={2} />
			</Toggle>
			<Toggle aria-label='Toggle dark mode'>
				<HugeiconsIcon icon={MoonIcon} size={16} strokeWidth={2} />
				Dark mode
			</Toggle>
			<Toggle aria-label='Toggle notifications' disabled>
				<HugeiconsIcon icon={Notification03Icon} size={16} strokeWidth={2} />
			</Toggle>
		</div>
	)
}
