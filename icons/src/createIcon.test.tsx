import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { createIcon } from './createIcon'
import { resetIconDefaults, setIconDefaults } from './icon-store'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

const Fixture = createIcon('Fixture', [
  ['path', { d: 'M12 2L2 12', fill: 'currentColor' }],
  [
    'path',
    {
      d: 'M3 3',
      fill: 'var(--icon-secondary-color, currentColor)',
      opacity: 'var(--icon-secondary-opacity, 0.5)',
    },
  ],
])

describe('createIcon', () => {
  beforeEach(() => {
    resetIconDefaults()
  })

  it('renders an svg from the serialised node data', () => {
    const { container } = render(<Fixture />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg?.querySelector('path')).toHaveAttribute('d', 'M12 2L2 12')
  })

  it('keeps secondary layers bound to the icon CSS variables', () => {
    const { container } = render(<Fixture />)
    const secondary = container.querySelectorAll('path')[1]

    expect(secondary).toHaveAttribute('fill', 'var(--icon-secondary-color, currentColor)')
    expect(secondary).toHaveAttribute('opacity', 'var(--icon-secondary-opacity, 0.5)')
  })

  it('defaults to size 24, inheritable currentColor, strokeWidth 1.5, and secondary CSS vars', () => {
    const { container } = render(<Fixture />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('stroke-width', '1.5')
    expect(svg?.style.color).toBe('')
    expect(svg?.style.getPropertyValue('--icon-secondary-color')).toBe('currentColor')
    expect(svg?.style.getPropertyValue('--icon-secondary-opacity')).toBe('0.5')
  })

  it('does not let the currentColor default override a class color', () => {
    const { container } = render(
      <>
        <style>{'.text-primary-400 { color: rgb(1, 2, 3); }'}</style>
        <Fixture className='text-primary-400' />
      </>
    )
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('text-primary-400')
    expect(svg?.style.color).toBe('')
    expect(svg).toHaveStyle({ color: 'rgb(1, 2, 3)' })
  })

  it('lets an explicit size/color prop win over the default', () => {
    const { container } = render(<Fixture color='#ff0000' size={48} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
    expect(svg).toHaveStyle({ color: '#ff0000' })
  })

  it('lets strokeWidth / secondaryColor / secondaryOpacity props win over store defaults', () => {
    const { container } = render(<Fixture secondaryColor='#abcdef' secondaryOpacity={0.25} strokeWidth={2} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('stroke-width', '2')
    expect(svg?.style.getPropertyValue('--icon-secondary-color')).toBe('#abcdef')
    expect(svg?.style.getPropertyValue('--icon-secondary-opacity')).toBe('0.25')
  })

  it('is decorative by default: aria-hidden + focusable="false", no alt/title API', () => {
    const { container } = render(<Fixture />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('focusable', 'false')
    expect((Fixture as unknown as { propTypes?: unknown }).propTypes).toBeUndefined()
  })

  it('escape hatch: spreading svg props can override aria-hidden/focusable', () => {
    const { container } = render(<Fixture aria-hidden={false} focusable='true' />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'false')
    expect(svg).toHaveAttribute('focusable', 'true')
  })

  it('reads size/color/stroke/secondary from the Zustand store when the setter changes global defaults', () => {
    setIconDefaults({
      color: '#00ff00',
      secondaryColor: '#112233',
      secondaryOpacity: 0.3,
      size: 32,
      strokeWidth: 2.5,
    })

    const { container } = render(<Fixture />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('stroke-width', '2.5')
    expect(svg).toHaveStyle({ color: '#00ff00' })
    expect(svg?.style.getPropertyValue('--icon-secondary-color')).toBe('#112233')
    expect(svg?.style.getPropertyValue('--icon-secondary-opacity')).toBe('0.3')
  })

  it('prop still wins even when store defaults are overridden', () => {
    setIconDefaults({
      color: '#00ff00',
      size: 32,
      strokeWidth: 3,
      secondaryOpacity: 0.8,
    })

    const { container } = render(<Fixture color='#0000ff' secondaryOpacity={0.1} size={16} strokeWidth={1} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('stroke-width', '1')
    expect(svg).toHaveStyle({ color: '#0000ff' })
    expect(svg?.style.getPropertyValue('--icon-secondary-opacity')).toBe('0.1')
  })

  it('forwards a ref to the underlying svg element', () => {
    let refValue: SVGSVGElement | null = null
    render(
      <Fixture
        ref={el => {
          refValue = el
        }}
      />
    )

    expect(refValue).toBeInstanceOf(SVGSVGElement)
  })
})
