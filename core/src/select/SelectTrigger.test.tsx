import { Select } from '@base-ui/react/select'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SelectTrigger } from './SelectTrigger'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('SelectTrigger', () => {
  it('applies size class', () => {
    render(
      <Select.Root>
        <SelectTrigger placeholder='Choose' size='lg' />
      </Select.Root>
    )

    expect(screen.getByRole('combobox')).toHaveClass('select-lg')
  })

  it('accepts all size variants', () => {
    const sizes = ['sm', 'lg', 'xl', '2xl', '3xl'] as const
    sizes.forEach(size => {
      const { unmount } = render(
        <Select.Root>
          <SelectTrigger placeholder='Choose' size={size} />
        </Select.Root>
      )

      expect(screen.getByRole('combobox')).toHaveClass(`select-${size}`)
      unmount()
    })
  })
})
