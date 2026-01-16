import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BreadcrumbItem } from './BreadcrumbItem'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('BreadcrumbItem', () => {
  it('renders as li element', () => {
    const { container } = render(<BreadcrumbItem>Home</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<BreadcrumbItem>Home</BreadcrumbItem>)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('applies breadcrumb-item class', () => {
    const { container } = render(<BreadcrumbItem>Home</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).toHaveClass('breadcrumb-item')
  })

  it('applies active class when active prop is true', () => {
    const { container } = render(<BreadcrumbItem active>Current</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).toHaveClass('active')
  })

  it('does not apply active class when active prop is false', () => {
    const { container } = render(<BreadcrumbItem active={false}>Home</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).not.toHaveClass('active')
  })

  it('renders as link when href is provided', () => {
    render(<BreadcrumbItem href='/home'>Home</BreadcrumbItem>)
    const link = screen.getByRole('link', { name: /home/i })
    expect(link).toHaveAttribute('href', '/home')
  })

  it('applies link-dark class to link', () => {
    render(<BreadcrumbItem href='/home'>Home</BreadcrumbItem>)
    const link = screen.getByRole('link', { name: /home/i })
    expect(link).toHaveClass('link-dark')
  })

  it('renders as text when no href provided', () => {
    const { container } = render(<BreadcrumbItem>Current Page</BreadcrumbItem>)
    const link = container.querySelector('a')
    expect(link).not.toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('applies title attribute to link', () => {
    render(
      <BreadcrumbItem href='/home' title='Go to home'>
        Home
      </BreadcrumbItem>
    )
    const link = screen.getByRole('link', { name: /home/i })
    expect(link).toHaveAttribute('title', 'Go to home')
  })

  it('sets aria-current to page by default', () => {
    const { container } = render(<BreadcrumbItem>Home</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).toHaveAttribute('aria-current', 'page')
  })

  it('accepts custom className and merges with breadcrumb-item class', () => {
    const { container } = render(<BreadcrumbItem className='custom-item'>Home</BreadcrumbItem>)
    const li = container.querySelector('li')
    expect(li).toHaveClass('breadcrumb-item')
    expect(li).toHaveClass('custom-item')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<BreadcrumbItem ref={ref}>Home</BreadcrumbItem>)
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
  })

  it('supports all prop combinations', () => {
    render(
      <BreadcrumbItem active className='custom' href='/current' title='Current page'>
        Current
      </BreadcrumbItem>
    )
    const link = screen.getByRole('link', { name: /current/i })
    expect(link).toHaveAttribute('href', '/current')
    expect(link).toHaveAttribute('title', 'Current page')
    expect(link).toHaveClass('link-dark')
    const li = link.parentElement
    expect(li).toHaveClass('breadcrumb-item')
    expect(li).toHaveClass('active')
    expect(li).toHaveClass('custom')
  })

  it('renders multiple items in breadcrumb trail', () => {
    const { container } = render(
      <>
        <BreadcrumbItem href='/'>Home</BreadcrumbItem>
        <BreadcrumbItem href='/about'>About</BreadcrumbItem>
        <BreadcrumbItem active>Current</BreadcrumbItem>
      </>
    )
    const items = container.querySelectorAll('.breadcrumb-item')
    expect(items).toHaveLength(3)
  })
})
