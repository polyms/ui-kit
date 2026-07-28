import { Home, resetIconDefaults, Sun, setIconDefaults } from '@polyms/icons/bold-duotone'
import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('@polyms/icons/bold-duotone (public entry)', () => {
  beforeEach(() => {
    resetIconDefaults()
  })

  it('exports named icons without a style suffix (Home, not HomeBoldDuotone)', () => {
    expect(Home).toBeTypeOf('function')
    expect(Sun).toBeTypeOf('function')
  })

  it('renders a real generated icon as a decorative svg', () => {
    const { container } = render(<Home />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('focusable', 'false')
    expect(svg?.querySelector('path')).toBeInTheDocument()
  })

  it('supports size + color props on a real generated icon', () => {
    const { container } = render(<Sun color='#123456' size={32} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
    expect(svg?.style.color).toBe('rgb(18, 52, 86)')
  })

  it('applies Zustand store defaults across real icons when props are omitted', () => {
    setIconDefaults({ size: 40 })
    const { container } = render(<Home />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '40')
  })
})
