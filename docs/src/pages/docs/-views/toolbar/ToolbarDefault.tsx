import {
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Toggle, ToggleGroup, Toolbar } from '@polyms/core-ui'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToolbarDefault() {
  return (
    <div className='m-auto flex max-w-3xl flex-col items-center gap-6 p-6'>
      <Toolbar aria-label='Text formatting toolbar'>
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
          <Toolbar.Button aria-label='Justify' render={<Toggle />} value='align-justify'>
            <HugeiconsIcon icon={TextAlignJustifyCenterIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
        </ToggleGroup>

        <Toolbar.Separator orientation='vertical' />

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
          <Toolbar.Button aria-label='Strikethrough' disabled render={<Toggle />} value='strikethrough'>
            <HugeiconsIcon icon={TextStrikethroughIcon} size={16} strokeWidth={2} />
          </Toolbar.Button>
        </Toolbar.Group>

        <Toolbar.Separator orientation='vertical' />

        <Toolbar.Link className='ms-auto' href='#'>
          Edited 51m ago
        </Toolbar.Link>
      </Toolbar>
    </div>
  )
}
