import {
  AlignHorizontalCenter,
  AlignLeft,
  AlignRight,
  TextBold,
  TextItalic,
  TextUnderline,
} from '@polyms/icons/bold-duotone'
import { Toggle, ToggleGroup } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToggleGroupStory() {
  return (
    <div className='m-auto flex flex-col items-center gap-6 p-6'>
      <ToggleGroup aria-label='Text alignment' className='toggle-group' defaultValue={['align-left']}>
        <Toggle aria-label='Align left' className='toggle' value='align-left'>
          <AlignLeft size={16} />
        </Toggle>
        <Toggle aria-label='Align center' className='toggle' value='align-center'>
          <AlignHorizontalCenter size={16} />
        </Toggle>
        <Toggle aria-label='Align right' className='toggle' value='align-right'>
          <AlignRight size={16} />
        </Toggle>
      </ToggleGroup>

      <ToggleGroup aria-label='Text formatting' className='toggle-group' defaultValue={['bold']} multiple>
        <Toggle aria-label='Bold' className='toggle' value='bold'>
          <TextBold size={16} />
        </Toggle>
        <Toggle aria-label='Italic' className='toggle' value='italic'>
          <TextItalic size={16} />
        </Toggle>
        <Toggle aria-label='Underline' className='toggle' value='underline'>
          <TextUnderline size={16} />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}
