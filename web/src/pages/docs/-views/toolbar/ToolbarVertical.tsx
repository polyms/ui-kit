import {
  AlignHorizontalCenter,
  AlignLeft,
  AlignRight,
  TextBold,
  TextItalic,
  TextUnderline,
} from '@polyms/icons/bold-duotone'
import { Toggle, ToggleGroup, Toolbar } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToolbarVertical() {
  return (
    <div className='m-auto flex justify-center p-6'>
      <Toolbar aria-label='Vertical toolbar' orientation='vertical'>
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
        </ToggleGroup>

        <Toolbar.Separator orientation='horizontal' />

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
        </Toolbar.Group>
      </Toolbar>
    </div>
  )
}
