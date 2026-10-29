import {
	TextAlignCenterIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
	TextBoldIcon,
	TextItalicIcon,
	TextUnderlineIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Toggle, ToggleGroup } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToggleGroupStory() {
	return (
		<div className='m-auto flex flex-col items-center gap-6 p-6'>
			<ToggleGroup aria-label='Text alignment' defaultValue={['align-left']}>
				<Toggle aria-label='Align left' value='align-left'>
					<HugeiconsIcon icon={TextAlignLeftIcon} size={16} strokeWidth={2} />
				</Toggle>
				<Toggle aria-label='Align center' value='align-center'>
					<HugeiconsIcon icon={TextAlignCenterIcon} size={16} strokeWidth={2} />
				</Toggle>
				<Toggle aria-label='Align right' value='align-right'>
					<HugeiconsIcon icon={TextAlignRightIcon} size={16} strokeWidth={2} />
				</Toggle>
			</ToggleGroup>

			<ToggleGroup aria-label='Text formatting' defaultValue={['bold']} multiple rounded>
				<Toggle aria-label='Bold' value='bold'>
					<HugeiconsIcon icon={TextBoldIcon} size={16} strokeWidth={2} />
				</Toggle>
				<Toggle aria-label='Italic' value='italic'>
					<HugeiconsIcon icon={TextItalicIcon} size={16} strokeWidth={2} />
				</Toggle>
				<Toggle aria-label='Underline' value='underline'>
					<HugeiconsIcon icon={TextUnderlineIcon} size={16} strokeWidth={2} />
				</Toggle>
			</ToggleGroup>
		</div>
	)
}
