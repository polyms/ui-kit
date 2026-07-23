import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toc } from './index'

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

describe('Toc', () => {
  it('renders nav with default aria-label', () => {
    render(
      <Toc>
        <Toc.List>
          <Toc.Item href='#intro'>Intro</Toc.Item>
        </Toc.List>
      </Toc>
    )
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument()
  })

  it('applies toc class on root', () => {
    const { container } = render(<Toc />)
    expect(container.querySelector('nav')).toHaveClass('toc')
  })

  it('allows overriding aria-label', () => {
    render(<Toc aria-label='On this page' />)
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
  })
})

describe('Toc.List', () => {
  it('renders ul with toc-list class', () => {
    const { container } = render(
      <Toc>
        <Toc.List />
      </Toc>
    )
    expect(container.querySelector('ul')).toHaveClass('toc-list')
  })
})

describe('Toc.Item', () => {
  it('renders link with href', () => {
    render(
      <Toc>
        <Toc.List>
          <Toc.Item href='#usage'>Usage</Toc.Item>
        </Toc.List>
      </Toc>
    )
    expect(screen.getByRole('link', { name: 'Usage' })).toHaveAttribute('href', '#usage')
  })

  it('applies depth and state classes from overrides', () => {
    render(
      <Toc>
        <Toc.List>
          <Toc.Item depth={3} href='#nested' primary visible>
            Nested
          </Toc.Item>
        </Toc.List>
      </Toc>
    )
    const link = screen.getByRole('link', { name: 'Nested' })
    expect(link).toHaveClass('toc-item', 'toc-item-depth-3', 'is-visible', 'is-primary')
  })

  it('derives visible and primary from scroll spy context', () => {
    const heading = document.createElement('h2')
    heading.id = 'spy-section'
    heading.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 140,
        height: 40,
        width: 100,
        left: 0,
        right: 100,
        x: 0,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect
    document.body.append(heading)
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })

    render(
      <Toc>
        <Toc.List>
          <Toc.Item href='#spy-section'>Spy section</Toc.Item>
        </Toc.List>
      </Toc>
    )

    expect(screen.getByRole('link', { name: 'Spy section' })).toHaveClass('is-visible', 'is-primary')
    heading.remove()
  })

  it('applies depth-4 class', () => {
    render(
      <Toc>
        <Toc.List>
          <Toc.Item depth={4} href='#deep'>
            Deep
          </Toc.Item>
        </Toc.List>
      </Toc>
    )
    expect(screen.getByRole('link', { name: 'Deep' })).toHaveClass('toc-item-depth-4')
  })

  it('renders button when href is omitted', () => {
    render(
      <Toc>
        <Toc.List>
          <Toc.Item>(Top)</Toc.Item>
        </Toc.List>
      </Toc>
    )
    expect(screen.getByRole('button', { name: '(Top)' })).toBeInTheDocument()
  })
})

describe('Toc.Indicator', () => {
  it('renders indicator element and hides when nothing is visible', () => {
    const { container } = render(
      <Toc>
        <Toc.List>
          <Toc.Item href='#a'>A</Toc.Item>
          <Toc.Indicator />
        </Toc.List>
      </Toc>
    )
    const indicator = container.querySelector('.toc-indicator') as HTMLElement
    expect(indicator).toBeInTheDocument()
    expect(indicator.style.opacity).toBe('0')
  })
})
