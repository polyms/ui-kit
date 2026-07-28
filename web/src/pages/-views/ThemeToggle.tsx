import { Moon, Sun } from '@polyms/icons/bold-duotone'
import { Button } from '@polyms/ui-kit'

import { useAppStore } from '../../stores/app.store'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function ThemeToggle() {
  const theme = useAppStore(state => state.theme)
  const toggleTheme = useAppStore(state => state.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <Button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      icon
      onClick={toggleTheme}
      outlined
      rounded
      size='lg'
      variant='light'
    >
      {isDark ? <Sun className='size-4' /> : <Moon className='size-4' />}
    </Button>
  )
}
