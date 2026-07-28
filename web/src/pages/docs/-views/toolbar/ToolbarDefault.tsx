import {
  AlignHorizontalCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalSpacing,
  TextBold,
  TextCross,
  TextItalic,
  TextUnderline,
} from '@polyms/icons/bold-duotone'
import { Toggle, ToggleGroup, Toolbar } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToolbarDefault() {
  return (
    <div className='m-auto flex max-w-3xl flex-col items-center gap-6 p-6'>
      <Toolbar aria-label='Text formatting toolbar'>
        <ToggleGroup aria-label='Alignment' className='toolbar-group'>
          <Toolbar.Button aria-label='Align left' render={<Toggle />} value='align-left'>
            <AlignLeft size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Align center' render={<Toggle />} value='align-center'>
            <AlignHorizontalCenter size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Align right' render={<Toggle />} value='align-right'>
            <AlignRight size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Justify' render={<Toggle />} value='align-justify'>
            <AlignVerticalSpacing size={16} />
          </Toolbar.Button>
        </ToggleGroup>

        <Toolbar.Separator orientation='vertical' />

        <Toolbar.Group aria-label='Text formatting'>
          <Toolbar.Button aria-label='Bold' render={<Toggle />} value='bold'>
            <TextBold size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Italic' render={<Toggle />} value='italic'>
            <TextItalic size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Underline' render={<Toggle />} value='underline'>
            <TextUnderline size={16} />
          </Toolbar.Button>
          <Toolbar.Button aria-label='Strikethrough' disabled render={<Toggle />} value='strikethrough'>
            <TextCross size={16} />
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
