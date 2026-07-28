import { Bell, Moon, Star } from '@polyms/icons/bold-duotone'
import { Toggle } from '@polyms/ui-kit'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function ToggleDefault() {
  return (
    <div className='m-auto flex items-center gap-4 p-6'>
      <Toggle aria-label='Toggle favorite' className='toggle' defaultPressed>
        <Star size={16} />
      </Toggle>
      <Toggle aria-label='Toggle dark mode' className='toggle'>
        <Moon size={16} />
        Dark mode
      </Toggle>
      <Toggle aria-label='Toggle notifications' className='toggle' disabled>
        <Bell size={16} />
      </Toggle>
    </div>
  )
}
