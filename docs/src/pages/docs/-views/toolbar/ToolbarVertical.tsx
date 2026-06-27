import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Toggle, ToggleGroup, Toolbar } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToolbarVertical() {
  return (
    <div className='m-auto flex justify-center p-6'>
      <Toolbar aria-label='Vertical toolbar' orientation='vertical'>
        <ToggleGroup aria-label='Alignment' className='toolbar-group'>
          <Toolbar.Button aria-label='Align left' render={<Toggle />} value='align-left'>
            <HugeiconsIcon icon={TextAlignLeftIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Align center' render={<Toggle />} value='align-center'>
            <HugeiconsIcon icon={TextAlignCenterIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Align right' render={<Toggle />} value='align-right'>
            <HugeiconsIcon icon={TextAlignRightIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
        </ToggleGroup>

        <Toolbar.Separator orientation='horizontal' />

        <Toolbar.Group aria-label='Text formatting'>
          <Toolbar.Button aria-label='Bold' render={<Toggle />} value='bold'>
            <HugeiconsIcon icon={TextBoldIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Italic' render={<Toggle />} value='italic'>
            <HugeiconsIcon icon={TextItalicIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Underline' render={<Toggle />} value='underline'>
            <HugeiconsIcon icon={TextUnderlineIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
        </Toolbar.Group>
      </Toolbar>
    </div>
  )
}
