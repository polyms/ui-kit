import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../button'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant class', () => {
    render(<Button variant='primary'>Primary</Button>)
    const button = screen.getByRole('button', { name: /primary/i })
    expect(button).toHaveClass('btn-primary')
  })

  it('applies icon class when icon prop is true', () => {
    render(<Button icon>Icon Button</Button>)
    const button = screen.getByRole('button', { name: /icon button/i })
    expect(button).toHaveClass('btn-icon')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByRole('button', { name: /click/i }).click()
    expect(handleClick).toHaveBeenCalled()
  })

  it('applies default button type', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button', { name: /default/i })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('applies rounded class when rounded prop is true', () => {
    render(<Button rounded>Rounded</Button>)
    const button = screen.getByRole('button', { name: /rounded/i })
    expect(button).toHaveClass('rounded-full')
  })

  it('applies active class when active prop is true', () => {
    render(<Button active>Active</Button>)
    const button = screen.getByRole('button', { name: /active/i })
    expect(button).toHaveClass('active')
  })

  it('applies outlined class when outlined prop is true', () => {
    render(<Button outlined>Outlined</Button>)
    const button = screen.getByRole('button', { name: /outlined/i })
    expect(button).toHaveClass('outlined')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>)
    const button = screen.getByRole('button', { name: /custom/i })
    expect(button).toHaveClass('custom-class')
  })

  it('renders multiple variant and size classes together', () => {
    render(
      <Button size='xl' variant='success'>
        Success XL
      </Button>
    )
    const button = screen.getByRole('button', { name: /success xl/i })
    expect(button).toHaveClass('btn-success')
    expect(button).toHaveClass('btn-xl')
  })

  it('disables button when disabled attribute is set', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('applies all variant types correctly', () => {
    const variants = ['primary', 'success', 'light', 'dark', 'danger'] as const
    variants.forEach(variant => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      const button = screen.getByRole('button', { name: new RegExp(variant, 'i') })
      expect(button).toHaveClass(`btn-${variant}`)
      unmount()
    })
  })

  it('applies all size variants correctly', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl', '2xl', '3xl'] as const
    sizes.forEach(size => {
      const { unmount } = render(<Button size={size}>{size}</Button>)
      const button = screen.getByRole('button', { name: new RegExp(size, 'i') })
      expect(button).toHaveClass(`btn-${size}`)
      unmount()
    })
  })

  it('applies link variant without btn- prefix when variant is link', () => {
    render(<Button variant='primary'>Link Button</Button>)
    const button = screen.getByRole('button', { name: /link button/i })
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn-primary')
  })

  it('can be used as a ref', () => {
    const ref = { current: null }
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
