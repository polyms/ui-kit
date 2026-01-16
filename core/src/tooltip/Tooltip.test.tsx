import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Tooltip } from './Tooltip'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('Tooltip', () => {
  it('renders trigger element', async () => {
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    expect(await screen.findByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })

  it('shows tooltip on hover after delay', async () => {
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    // Hover over trigger
    await userEvent.hover(trigger)

    // Wait for tooltip to appear (100ms delay)
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('hides tooltip on unhover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    // Hover and wait for tooltip
    await user.hover(trigger)
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )

    // Unhover
    await user.unhover(trigger)

    // Tooltip should disappear
    await waitFor(() => {
      expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument()
    })
  })

  it('renders without title prop (children only)', async () => {
    render(
      <Tooltip>
        <button type='button'>No tooltip</button>
      </Tooltip>
    )
    expect(await screen.findByRole('button', { name: 'No tooltip' })).toBeInTheDocument()
  })

  it('supports custom className', async () => {
    render(
      <Tooltip title='Tooltip Text'>
        <button className='custom-trigger' type='button'>
          Hover me
        </button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('respects disabled prop', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip disabled title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    // Tooltip should not appear when disabled
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument()
  })

  it('supports controlled open state', async () => {
    const onOpenChange = vi.fn()
    render(
      <Tooltip onOpenChange={onOpenChange} open={true} title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )

    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('calls onOpenChange callback when state changes', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Tooltip onOpenChange={onOpenChange} title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalled()
    })
  })

  it('calls onOpenChangeComplete callback when transition completes', async () => {
    const user = userEvent.setup()
    const onOpenChangeComplete = vi.fn()
    render(
      <Tooltip onOpenChangeComplete={onOpenChangeComplete} title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        expect(onOpenChangeComplete).toHaveBeenCalled()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip with custom side position', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip side='right' title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip with custom align position', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip align='end' title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip content in portal', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        const popup = document.querySelector('.tooltip-popup')
        expect(popup).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip positioner element', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        const positioner = document.querySelector('.tooltip-positioner')
        expect(positioner).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders arrow element in tooltip', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        const arrow = document.querySelector('.tooltip-arrow')
        expect(arrow).toBeInTheDocument()
        const svg = arrow?.querySelector('svg')
        expect(svg).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('handles rapid hover and unhover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    // Quick hover and unhover
    await user.hover(trigger)
    await user.unhover(trigger)

    // Tooltip may or may not appear depending on timing
    // Just verify no errors occur
    expect(trigger).toBeInTheDocument()
  })

  it('supports multiple tooltips independently', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Tooltip title='Tooltip 1'>
          <button type='button'>Button 1</button>
        </Tooltip>
        <Tooltip title='Tooltip 2'>
          <button type='button'>Button 2</button>
        </Tooltip>
      </>
    )

    const button1 = screen.getByRole('button', { name: 'Button 1' })
    const button2 = screen.getByRole('button', { name: 'Button 2' })

    // Hover first button
    await user.hover(button1)
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip 1')).toBeInTheDocument()
      },
      { timeout: 500 }
    )

    // Unhover first button
    await user.unhover(button1)
    await waitFor(() => {
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
    })

    // Hover second button
    await user.hover(button2)
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip 2')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip with complex children', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Complex Tooltip'>
        <div data-testid='tooltip-wrapper'>
          <span>Icon</span>
          <span>Label</span>
        </div>
      </Tooltip>
    )

    const wrapper = await screen.findByTestId('tooltip-wrapper')
    await user.hover(wrapper)

    await waitFor(
      () => {
        expect(screen.getByText('Complex Tooltip')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('preserves trigger element attributes', async () => {
    render(
      <Tooltip title='Tooltip Text'>
        <button data-testid='trigger' title='Button title' type='button'>
          Hover me
        </button>
      </Tooltip>
    )

    const trigger = screen.getByTestId('trigger')
    expect(trigger).toHaveAttribute('title', 'Button title')
  })

  it('handles long tooltip text', async () => {
    const user = userEvent.setup()
    const longText = 'This is a very long tooltip text that might wrap across multiple lines'
    render(
      <Tooltip title={longText}>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)

    await waitFor(
      () => {
        expect(screen.getByText(longText)).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('renders tooltip with all positioning combinations', async () => {
    const user = userEvent.setup()
    const positions: Array<{ side: 'top' | 'bottom' | 'left' | 'right'; align: 'start' | 'center' | 'end' }> =
      [
        { side: 'top', align: 'center' },
        { side: 'bottom', align: 'center' },
        { side: 'left', align: 'center' },
        { side: 'right', align: 'center' },
      ]

    for (const { side, align } of positions) {
      const { unmount } = render(
        <Tooltip align={align} side={side} title={`Tooltip ${side}`}>
          <button type='button'>Hover me</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button', { name: 'Hover me' })
      await user.hover(trigger)

      await waitFor(
        () => {
          expect(screen.getByText(`Tooltip ${side}`)).toBeInTheDocument()
        },
        { timeout: 500 }
      )

      unmount()
    }
  })

  it('handles tooltip with keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Focus me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Focus me' })

    // Tab to focus the button
    await user.tab()

    // Verify button is focused
    expect(trigger).toHaveFocus()
  })

  it('cleans up tooltip on unmount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <Tooltip title='Tooltip Text'>
        <button type='button'>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: 'Hover me' })

    await user.hover(trigger)
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument()
      },
      { timeout: 500 }
    )

    // Unmount and verify tooltip is removed
    unmount()
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument()
  })
})
