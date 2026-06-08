import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Toggle, ToggleGroup } from '@polyms/core'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToggleGroupStory() {
  return (
    <div className='m-auto flex flex-col items-center gap-6 p-6'>
      <ToggleGroup aria-label='Text alignment' className='toggle-group' defaultValue={['align-left']}>
        <Toggle aria-label='Align left' className='toggle' value='align-left'>
          <HugeiconsIcon icon={TextAlignLeftIcon} size={16} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label='Align center' className='toggle' value='align-center'>
          <HugeiconsIcon icon={TextAlignCenterIcon} size={16} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label='Align right' className='toggle' value='align-right'>
          <HugeiconsIcon icon={TextAlignRightIcon} size={16} strokeWidth={2} />
        </Toggle>
      </ToggleGroup>

      <ToggleGroup aria-label='Text formatting' className='toggle-group' defaultValue={['bold']} multiple>
        <Toggle aria-label='Bold' className='toggle' value='bold'>
          <HugeiconsIcon icon={TextBoldIcon} size={16} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label='Italic' className='toggle' value='italic'>
          <HugeiconsIcon icon={TextItalicIcon} size={16} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label='Underline' className='toggle' value='underline'>
          <HugeiconsIcon icon={TextUnderlineIcon} size={16} strokeWidth={2} />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}
